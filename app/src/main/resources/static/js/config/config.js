// config.js - Shared constants and settings

export const API_BASE_URL = "http://localhost:8080";

export const ENDPOINTS = {
    DOCTORS: `${API_BASE_URL}/doctor`,
    PATIENTS: `${API_BASE_URL}/patient`,
    APPOINTMENTS: `${API_BASE_URL}/appointments`,
    PRESCRIPTIONS: `${API_BASE_URL}/prescriptions`,
    ADMIN_LOGIN: `${API_BASE_URL}/admin`,
    DOCTOR_LOGIN: `${API_BASE_URL}/doctor/login`,
    PATIENT_LOGIN: `${API_BASE_URL}/patient/login`,
    PATIENT_SIGNUP: `${API_BASE_URL}/patient`
};
