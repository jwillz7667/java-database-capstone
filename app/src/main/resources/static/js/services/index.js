// index.js - Service for role selection and modal behavior on the index page
import { ENDPOINTS } from "../config/config.js";

// Handle login form submission
window.handleLogin = async function () {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const role = localStorage.getItem("userRole");

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        let endpoint;
        if (role === "admin") {
            endpoint = ENDPOINTS.ADMIN_LOGIN;
        } else if (role === "doctor") {
            endpoint = ENDPOINTS.DOCTOR_LOGIN;
        } else {
            endpoint = ENDPOINTS.PATIENT_LOGIN;
        }

        let body;
        if (role === "admin") {
            body = { username: email, password };
        } else if (role === "doctor") {
            body = { identifier: email, password };
        } else {
            body = { identifier: email, password };
        }

        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            if (role === "admin") {
                window.location.href = `/adminDashboard/${data.token}`;
            } else if (role === "doctor") {
                window.location.href = `/doctorDashboard/${data.token}`;
            } else {
                window.location.href = "/pages/patientDashboard.html";
            }
        } else {
            alert("Invalid credentials. Please try again.");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Unable to connect to server.");
    }
};

// Handle signup form submission
window.handleSignup = async function () {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const phone = document.getElementById("signupPhone").value;
    const address = document.getElementById("signupAddress").value;

    if (!name || !email || !password || !phone || !address) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch(ENDPOINTS.PATIENT_SIGNUP, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, phone, address })
        });

        if (response.ok) {
            alert("Account created successfully! Please log in.");
            openLoginModal();
        } else {
            alert("Signup failed. Please try again.");
        }
    } catch (error) {
        console.error("Signup error:", error);
        alert("Unable to connect to server.");
    }
};
