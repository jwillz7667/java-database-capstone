// appointmentRecordService.js - API communication for appointments
import { ENDPOINTS } from "../config/config.js";

export async function getAppointments(token, date, patientName) {
    try {
        let url;
        if (date) {
            const name = patientName || "null";
            url = `${ENDPOINTS.APPOINTMENTS}/${date}/${name}/${token}`;
        } else {
            url = `${ENDPOINTS.APPOINTMENTS}/all/${token}`;
        }
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.appointments || [];
        }
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
