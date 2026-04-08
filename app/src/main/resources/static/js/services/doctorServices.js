// doctorServices.js - API communication for doctors
import { ENDPOINTS } from "../config/config.js";

export async function getDoctors(token) {
    try {
        const response = await fetch(ENDPOINTS.DOCTORS, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) return await response.json();
        return [];
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return [];
    }
}

export async function deleteDoctor(doctorId, token) {
    try {
        const response = await fetch(`${ENDPOINTS.DOCTORS}/${doctorId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.ok;
    } catch (error) {
        console.error("Error deleting doctor:", error);
        return false;
    }
}

export async function addDoctor(doctorData, token) {
    try {
        const response = await fetch(ENDPOINTS.DOCTORS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(doctorData)
        });
        return response.ok;
    } catch (error) {
        console.error("Error adding doctor:", error);
        return false;
    }
}
