package com.project.back_end.controllers;

import com.project.back_end.DTO.Login;
import com.project.back_end.models.Patient;
import com.project.back_end.services.PatientService;
import com.project.back_end.services.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private Service service;

    @GetMapping("/{token}")
    public ResponseEntity<Map<String, Object>> getPatientDetails(@PathVariable String token) {
        ResponseEntity<Map<String, String>> validation = service.validateToken(token, "loggedPatient");
        if (validation != null) {
            Map<String, Object> errorResponse = new HashMap<>(validation.getBody());
            return ResponseEntity.status(validation.getStatusCode()).body(errorResponse);
        }

        return patientService.getPatientDetails(token);
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> createPatient(@RequestBody Patient patient) {
        Map<String, String> response = new HashMap<>();

        boolean isValid = service.validatePatient(patient);
        if (!isValid) {
            response.put("message", "Patient with email id or phone no already exist");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        int result = patientService.createPatient(patient);
        if (result == 1) {
            response.put("message", "Signup successful");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            response.put("message", "Internal server error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> patientLogin(@RequestBody Login login) {
        return service.validatePatientLogin(login);
    }

    @GetMapping("/{id}/{token}")
    public ResponseEntity<Map<String, Object>> getPatientAppointments(@PathVariable Long id,
                                                                       @PathVariable String token) {
        ResponseEntity<Map<String, String>> validation = service.validateToken(token, "loggedPatient");
        if (validation != null) {
            Map<String, Object> errorResponse = new HashMap<>(validation.getBody());
            return ResponseEntity.status(validation.getStatusCode()).body(errorResponse);
        }

        return patientService.getPatientAppointment(id, token);
    }

    @GetMapping("/filter/{condition}/{name}/{token}")
    public ResponseEntity<Map<String, Object>> filterPatientAppointments(@PathVariable String condition,
                                                                          @PathVariable String name,
                                                                          @PathVariable String token) {
        ResponseEntity<Map<String, String>> validation = service.validateToken(token, "loggedPatient");
        if (validation != null) {
            Map<String, Object> errorResponse = new HashMap<>(validation.getBody());
            return ResponseEntity.status(validation.getStatusCode()).body(errorResponse);
        }

        return service.filterPatient(condition, name, token);
    }
}
