// patientDashboard.js - Page-specific logic for patient dashboard
import { getDoctors } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

let allDoctors = [];

async function loadDoctors() {
    allDoctors = await getDoctors(null);
    renderDoctors(allDoctors);
    populateSpecialtyFilter(allDoctors);
}

function renderDoctors(doctors) {
    const content = document.getElementById("content");
    if (!content) return;
    content.innerHTML = "";

    doctors.forEach(doctor => {
        const card = createDoctorCard(doctor);
        content.appendChild(card);
    });
}

function populateSpecialtyFilter(doctors) {
    const filter = document.getElementById("filterSpecialty");
    if (!filter) return;

    const specialties = [...new Set(doctors.map(d => d.specialty))];
    specialties.forEach(s => {
        const option = document.createElement("option");
        option.value = s;
        option.textContent = s;
        filter.appendChild(option);
    });
}

// Search
const searchBar = document.getElementById("searchBar");
if (searchBar) {
    searchBar.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allDoctors.filter(d => d.name.toLowerCase().includes(query));
        renderDoctors(filtered);
    });
}

// Filter by time
const filterTime = document.getElementById("filterTime");
if (filterTime) {
    filterTime.addEventListener("change", (e) => {
        const value = e.target.value;
        if (!value) {
            renderDoctors(allDoctors);
            return;
        }
        const filtered = allDoctors.filter(d =>
            d.availableTimes && d.availableTimes.some(t => t.includes(value))
        );
        renderDoctors(filtered);
    });
}

// Filter by specialty
const filterSpecialty = document.getElementById("filterSpecialty");
if (filterSpecialty) {
    filterSpecialty.addEventListener("change", (e) => {
        const value = e.target.value;
        const filtered = value ? allDoctors.filter(d => d.specialty === value) : allDoctors;
        renderDoctors(filtered);
    });
}

// Booking overlay for logged-in patients
window.showBookingOverlay = function (e, doctor, patientData) {
    // Create a booking modal at the bottom
    let modalApp = document.querySelector(".modalApp");
    if (!modalApp) {
        modalApp = document.createElement("div");
        modalApp.classList.add("modalApp");
        document.body.appendChild(modalApp);
    }

    modalApp.innerHTML = `
        <h3>Book Appointment with Dr. ${doctor.name}</h3>
        <select id="bookingTime">
            <option value="">Select Time</option>
            ${doctor.availableTimes ? doctor.availableTimes.map(t => `<option value="${t}">${t}</option>`).join("") : ""}
        </select>
        <input type="date" id="bookingDate" />
        <button class="booking-btn" onclick="confirmBooking(${doctor.id})">Confirm Booking</button>
    `;

    modalApp.classList.add("active");
};

window.confirmBooking = async function (doctorId) {
    const time = document.getElementById("bookingTime").value;
    const date = document.getElementById("bookingDate").value;

    if (!time || !date) {
        alert("Please select a date and time.");
        return;
    }

    // Show ripple effect
    const ripple = document.createElement("div");
    ripple.classList.add("ripple-overlay");
    document.body.appendChild(ripple);
    setTimeout(() => ripple.classList.add("active"), 10);
    setTimeout(() => ripple.remove(), 700);

    alert("Appointment booked successfully!");

    const modalApp = document.querySelector(".modalApp");
    if (modalApp) modalApp.classList.remove("active");
};

window.renderContent = function () {
    loadDoctors();
};

// Init
loadDoctors();
