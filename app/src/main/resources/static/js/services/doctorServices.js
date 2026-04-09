// doctorServices.js - API communication for doctors
import { ENDPOINTS } from "../config/config.js";

export async function getDoctors(token) {
    try {
        const response = await fetch(ENDPOINTS.DOCTORS);
        if (response.ok) {
            const data = await response.json();
            return data.doctors || [];
        }
        return [];
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return [];
    }
}

export async function deleteDoctor(doctorId, token) {
    try {
        const response = await fetch(`${ENDPOINTS.DOCTORS}/${doctorId}/${token}`, {
            method: "DELETE"
        });
        return response.ok;
    } catch (error) {
        console.error("Error deleting doctor:", error);
        return false;
    }
}

export async function addDoctor(doctorData, token) {
    try {
        const response = await fetch(`${ENDPOINTS.DOCTORS}/${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(doctorData)
        });
        return response.ok;
    } catch (error) {
        console.error("Error adding doctor:", error);
        return false;
    }
}
