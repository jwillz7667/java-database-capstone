// prescriptionServices.js - API communication for prescriptions
import { ENDPOINTS } from "../config/config.js";

export async function getPrescriptions(appointmentId, token) {
    try {
        const response = await fetch(`${ENDPOINTS.PRESCRIPTIONS}/${appointmentId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) return await response.json();
        return [];
    } catch (error) {
        console.error("Error fetching prescriptions:", error);
        return [];
    }
}

export async function addPrescription(prescriptionData, token) {
    try {
        const response = await fetch(ENDPOINTS.PRESCRIPTIONS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(prescriptionData)
        });
        return response.ok;
    } catch (error) {
        console.error("Error adding prescription:", error);
        return false;
    }
}
