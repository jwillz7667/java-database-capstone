// doctorDashboard.js - Page-specific logic for doctor dashboard
import { getAppointments } from "./services/appointmentRecordService.js";

let allAppointments = [];

async function loadAppointments() {
    const token = localStorage.getItem("token");
    allAppointments = await getAppointments(token);
    renderAppointments(allAppointments);
}

function renderAppointments(appointments) {
    const tbody = document.getElementById("patientTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (appointments.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="noPatientRecord">No patient records found.</td></tr>`;
        return;
    }

    appointments.forEach(apt => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${apt.patient ? apt.patient.id : "N/A"}</td>
            <td>${apt.patient ? apt.patient.name : "N/A"}</td>
            <td>${apt.patient ? apt.patient.phone : "N/A"}</td>
            <td>${apt.patient ? apt.patient.email : "N/A"}</td>
            <td>
                <button class="prescription-btn" onclick="viewPrescription(${apt.id})">
                    View / Add
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Search by patient name
const searchBar = document.getElementById("searchBar");
if (searchBar) {
    searchBar.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allAppointments.filter(a =>
            a.patient && a.patient.name.toLowerCase().includes(query)
        );
        renderAppointments(filtered);
    });
}

// Today's appointments
const todayBtn = document.getElementById("todayBtn");
if (todayBtn) {
    todayBtn.addEventListener("click", () => {
        const today = new Date().toISOString().split("T")[0];
        const filtered = allAppointments.filter(a =>
            a.appointmentTime && a.appointmentTime.startsWith(today)
        );
        renderAppointments(filtered);
    });
}

// Filter by date
const dateFilter = document.getElementById("dateFilter");
if (dateFilter) {
    dateFilter.addEventListener("change", (e) => {
        const date = e.target.value;
        if (!date) {
            renderAppointments(allAppointments);
            return;
        }
        const filtered = allAppointments.filter(a =>
            a.appointmentTime && a.appointmentTime.startsWith(date)
        );
        renderAppointments(filtered);
    });
}

window.viewPrescription = function (appointmentId) {
    window.location.href = `/pages/addPrescription.html?appointmentId=${appointmentId}`;
};

// Init
loadAppointments();
