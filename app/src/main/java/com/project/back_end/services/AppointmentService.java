package com.project.back_end.services;

import com.project.back_end.models.Appointment;
import com.project.back_end.DTO.AppointmentDTO;
import com.project.back_end.repo.AppointmentRepository;
import com.project.back_end.repo.DoctorRepository;
import com.project.back_end.repo.PatientRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final TokenService tokenService;

    public AppointmentService(AppointmentRepository appointmentRepository, PatientRepository patientRepository,
                              DoctorRepository doctorRepository, TokenService tokenService) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.tokenService = tokenService;
    }

    public int bookAppointment(Appointment appointment) {
        try {
            appointmentRepository.save(appointment);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    public ResponseEntity<Map<String, String>> updateAppointment(Appointment appointment) {
        Map<String, String> response = new HashMap<>();
        try {
            Optional<Appointment> existingAppointment = appointmentRepository.findById(appointment.getId());
            if (existingAppointment.isPresent()) {
                appointmentRepository.save(appointment);
                response.put("message", "Appointment updated");
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "Appointment not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            response.put("message", "Some internal error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    public ResponseEntity<Map<String, String>> cancelAppointment(long id, String token) {
        Map<String, String> response = new HashMap<>();
        try {
            Optional<Appointment> appointment = appointmentRepository.findById(id);
            if (appointment.isPresent()) {
                String email = tokenService.extractIdentifier(token);
                if (appointment.get().getPatient().getEmail().equals(email)) {
                    appointmentRepository.delete(appointment.get());
                    response.put("message", "Appointment cancelled");
                    return ResponseEntity.ok(response);
                } else {
                    response.put("message", "Unauthorized");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
                }
            } else {
                response.put("message", "Appointment not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            response.put("message", "Some internal error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    public Map<String, Object> getAppointment(String pname, LocalDate date, String token) {
        Map<String, Object> response = new HashMap<>();
        try {
            String email = tokenService.extractIdentifier(token);
            var doctor = doctorRepository.findByEmail(email);
            if (doctor == null) {
                response.put("message", "Doctor not found");
                return response;
            }

            LocalDateTime start = date.atStartOfDay();
            LocalDateTime end = date.atTime(23, 59, 59);

            List<Appointment> appointments;
            if (pname == null || pname.isEmpty() || pname.equals("null")) {
                appointments = appointmentRepository.findByDoctorIdAndAppointmentTimeBetween(doctor.getId(), start, end);
            } else {
                appointments = appointmentRepository.findByDoctorIdAndPatient_NameContainingIgnoreCaseAndAppointmentTimeBetween(
                        doctor.getId(), pname, start, end);
            }

            List<AppointmentDTO> appointmentDTOs = appointments.stream()
                    .map(a -> new AppointmentDTO(
                            a.getId(),
                            a.getDoctor().getId(),
                            a.getDoctor().getName(),
                            a.getPatient().getId(),
                            a.getPatient().getName(),
                            a.getPatient().getEmail(),
                            a.getPatient().getPhone(),
                            a.getPatient().getAddress(),
                            a.getAppointmentTime(),
                            a.getStatus()))
                    .collect(Collectors.toList());

            response.put("appointments", appointmentDTOs);
            return response;
        } catch (Exception e) {
            response.put("message", "Some internal error occurred");
            return response;
        }
    }
}
