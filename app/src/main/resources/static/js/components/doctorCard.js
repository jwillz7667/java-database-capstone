// doctorCard.js - Reusable doctor card component
import { deleteDoctor } from "../services/doctorServices.js";
import { getPatientData } from "../services/patientServices.js";

export function createDoctorCard(doctor) {
    const card = document.createElement("div");
    card.classList.add("doctor-card");

    const role = localStorage.getItem("userRole");

    // Doctor Info Section
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("doctor-info");

    const name = document.createElement("h3");
    name.textContent = doctor.name;

    const specialization = document.createElement("p");
    specialization.textContent = `Specialty: ${doctor.specialty}`;

    const email = document.createElement("p");
    email.textContent = `Email: ${doctor.email}`;

    const availability = document.createElement("p");
    availability.textContent = `Available: ${doctor.availableTimes ? doctor.availableTimes.join(", ") : "N/A"}`;

    infoDiv.appendChild(name);
    infoDiv.appendChild(specialization);
    infoDiv.appendChild(email);
    infoDiv.appendChild(availability);

    // Button Container
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("card-actions");

    if (role === "admin") {
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Delete";
        removeBtn.addEventListener("click", async () => {
            // 1. Confirm deletion
            if (!confirm(`Are you sure you want to delete Dr. ${doctor.name}?`)) return;
            // 2. Get token from localStorage
            const token = localStorage.getItem("token");
            // 3. Call API to delete
            const success = await deleteDoctor(doctor.id, token);
            // 4. On success: remove the card from the DOM
            if (success) {
                card.remove();
            }
        });
        actionsDiv.appendChild(removeBtn);
    } else if (role === "patient") {
        const bookNow = document.createElement("button");
        bookNow.textContent = "Book Now";
        bookNow.addEventListener("click", () => {
            alert("Patient needs to login first.");
        });
        actionsDiv.appendChild(bookNow);
    } else if (role === "loggedPatient") {
        const bookNow = document.createElement("button");
        bookNow.textContent = "Book Now";
        bookNow.addEventListener("click", async (e) => {
            const token = localStorage.getItem("token");
            const patientData = await getPatientData(token);
            if (typeof showBookingOverlay === "function") {
                showBookingOverlay(e, doctor, patientData);
            }
        });
        actionsDiv.appendChild(bookNow);
    }

    // Final Assembly
    card.appendChild(infoDiv);
    card.appendChild(actionsDiv);

    return card;
}
