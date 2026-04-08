// appointmentRecordService.js - API communication for appointments
import { ENDPOINTS } from "../config/config.js";

export async function getAppointments(token) {
    try {
        const response = await fetch(ENDPOINTS.APPOINTMENTS, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) return await response.json();
        return [];
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return [];
    }
}

export async function bookAppointment(appointmentData, token) {
    try {
        const response = await fetch(ENDPOINTS.APPOINTMENTS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(appointmentData)
        });
        return response.ok;
    } catch (error) {
        console.error("Error booking appointment:", error);
        return false;
    }
}
