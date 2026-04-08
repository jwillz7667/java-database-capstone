// patientServices.js - API communication for patients
import { ENDPOINTS } from "../config/config.js";

export async function getPatientData(token) {
    try {
        const response = await fetch(ENDPOINTS.PATIENTS, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) return await response.json();
        return null;
    } catch (error) {
        console.error("Error fetching patient data:", error);
        return null;
    }
}

export async function loginPatient(email, password) {
    try {
        const response = await fetch(ENDPOINTS.PATIENT_LOGIN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) return await response.json();
        return null;
    } catch (error) {
        console.error("Error logging in patient:", error);
        return null;
    }
}
