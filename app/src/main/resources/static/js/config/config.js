// config.js - Shared constants and settings

export const API_BASE_URL = "http://localhost:8080";

export const ENDPOINTS = {
    DOCTORS: `${API_BASE_URL}/api/doctors`,
    PATIENTS: `${API_BASE_URL}/api/patients`,
    APPOINTMENTS: `${API_BASE_URL}/api/appointments`,
    PRESCRIPTIONS: `${API_BASE_URL}/api/prescriptions`,
    ADMIN_LOGIN: `${API_BASE_URL}/admin/login`,
    DOCTOR_LOGIN: `${API_BASE_URL}/doctor/login`,
    PATIENT_LOGIN: `${API_BASE_URL}/api/patients/login`,
    PATIENT_SIGNUP: `${API_BASE_URL}/api/patients/signup`
};
