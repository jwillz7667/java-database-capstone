// adminDashboard.js - Page-specific logic for admin dashboard
import { getDoctors, addDoctor } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

let allDoctors = [];

async function loadDoctors() {
    const token = localStorage.getItem("token");
    allDoctors = await getDoctors(token);
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

// Filter by specialty
const filterSpecialty = document.getElementById("filterSpecialty");
if (filterSpecialty) {
    filterSpecialty.addEventListener("change", (e) => {
        const value = e.target.value;
        const filtered = value ? allDoctors.filter(d => d.specialty === value) : allDoctors;
        renderDoctors(filtered);
    });
}

// Sort by time
const sortTime = document.getElementById("sortTime");
if (sortTime) {
    sortTime.addEventListener("change", (e) => {
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

// Modal for adding doctor
window.openModal = function () {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <h3>Add New Doctor</h3>
        <input type="text" id="docName" placeholder="Name" />
        <input type="text" id="docSpecialty" placeholder="Specialty" />
        <input type="email" id="docEmail" placeholder="Email" />
        <input type="password" id="docPassword" placeholder="Password" />
        <input type="text" id="docPhone" placeholder="Phone (10 digits)" />
        <div class="checkbox-group" id="availabilityCheckboxes">
            <label><input type="checkbox" value="9:00 AM" /> 9:00 AM</label>
            <label><input type="checkbox" value="10:00 AM" /> 10:00 AM</label>
            <label><input type="checkbox" value="11:00 AM" /> 11:00 AM</label>
            <label><input type="checkbox" value="1:00 PM" /> 1:00 PM</label>
            <label><input type="checkbox" value="2:00 PM" /> 2:00 PM</label>
            <label><input type="checkbox" value="3:00 PM" /> 3:00 PM</label>
            <label><input type="checkbox" value="4:00 PM" /> 4:00 PM</label>
        </div>
        <button onclick="handleAddDoctor()">Add Doctor</button>
    `;

    modal.classList.add("active");
};

window.handleAddDoctor = async function () {
    const name = document.getElementById("docName").value;
    const specialty = document.getElementById("docSpecialty").value;
    const email = document.getElementById("docEmail").value;
    const password = document.getElementById("docPassword").value;
    const phone = document.getElementById("docPhone").value;

    const checkboxes = document.querySelectorAll("#availabilityCheckboxes input:checked");
    const availableTimes = Array.from(checkboxes).map(cb => cb.value);

    const token = localStorage.getItem("token");
    const success = await addDoctor({ name, specialty, email, password, phone, availableTimes }, token);

    if (success) {
        alert("Doctor added successfully!");
        const modal = document.getElementById("modal");
        if (modal) modal.classList.remove("active");
        loadDoctors();
    } else {
        alert("Failed to add doctor.");
    }
};

// Init
loadDoctors();
