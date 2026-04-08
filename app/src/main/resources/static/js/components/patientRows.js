// patientRows.js - Component for rendering patient table rows
// Used in the doctor dashboard

function createPatientRow(appointment) {
    const row = document.createElement("tr");
    const patient = appointment.patient || {};

    row.innerHTML = `
        <td>${patient.id || "N/A"}</td>
        <td>${patient.name || "N/A"}</td>
        <td>${patient.phone || "N/A"}</td>
        <td>${patient.email || "N/A"}</td>
        <td>
            <button class="prescription-btn" onclick="viewPrescription(${appointment.id})">
                View / Add
            </button>
        </td>
    `;

    return row;
}
