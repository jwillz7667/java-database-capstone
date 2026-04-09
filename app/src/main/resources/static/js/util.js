// util.js - Shared utility functions

function selectRole(role) {
    localStorage.setItem("userRole", role);

    if (role === "patient") {
        openPatientLoginModal();
    } else {
        openLoginModal();
    }
}

function openPatientLoginModal() {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");

    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <h3>Patient Login</h3>
        <input type="email" id="loginEmail" placeholder="Email" />
        <input type="password" id="loginPassword" placeholder="Password" />
        <button onclick="handleLogin()">Login</button>
        <p style="margin-top: 10px; text-align: center;">
            Don't have an account? <a href="#" onclick="openSignupModal(); return false;">Sign Up</a>
        </p>
    `;

    modal.classList.add("active");
}

function openLoginModal() {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");

    if (!modal || !modalBody) return;

    const role = localStorage.getItem("userRole");
    const isAdmin = role === "admin";
    modalBody.innerHTML = `
        <h3>${isAdmin ? "Admin" : "Doctor"} Login</h3>
        <input type="${isAdmin ? "text" : "email"}" id="loginEmail" placeholder="${isAdmin ? "Username" : "Email"}" />
        <input type="password" id="loginPassword" placeholder="Password" />
        <button onclick="handleLogin()">Login</button>
    `;

    modal.classList.add("active");
}

function openSignupModal() {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");

    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <h3>Patient Sign Up</h3>
        <input type="text" id="signupName" placeholder="Full Name" />
        <input type="email" id="signupEmail" placeholder="Email" />
        <input type="password" id="signupPassword" placeholder="Password" />
        <input type="text" id="signupPhone" placeholder="Phone (10 digits)" />
        <input type="text" id="signupAddress" placeholder="Address" />
        <button onclick="handleSignup()">Sign Up</button>
    `;

    modal.classList.add("active");
}

function closeModalFunc() {
    const modal = document.getElementById("modal");
    if (modal) modal.classList.remove("active");
}

// Close modal on X click
document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.getElementById("closeModal");
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModalFunc);
    }
});

function getToken() {
    return localStorage.getItem("token");
}

function getUserRole() {
    return localStorage.getItem("userRole");
}
