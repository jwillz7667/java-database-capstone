// header.js - Reusable header component
// Dynamically renders header based on user role

function renderHeader() {
    // On homepage, clear role/token
    if (window.location.pathname.endsWith("/") || window.location.pathname.endsWith("/index.html")) {
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
    }

    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    // Validate login for roles that require it
    if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
        localStorage.removeItem("userRole");
        alert("Session expired or invalid login. Please log in again.");
        window.location.href = "/";
        return;
    }

    const headerDiv = document.getElementById("header");
    if (!headerDiv) return;

    let headerContent = `
        <header class="header">
            <div class="logo">
                <img src="/assets/images/logo/logo.png" alt="Smart Clinic Logo" />
                <h3>Smart Clinic</h3>
            </div>
            <nav>`;

    if (role === "admin") {
        headerContent += `
                <button id="addDocBtn" class="adminBtn" onclick="openModal()">Add Doctor</button>
                <a href="#" onclick="logout()">Logout</a>`;
    } else if (role === "doctor") {
        headerContent += `
                <a href="/">Home</a>
                <a href="#" onclick="logout()">Logout</a>`;
    } else if (role === "patient") {
        headerContent += `
                <a href="#" onclick="openLoginModal()">Login</a>
                <a href="#" onclick="openSignupModal()">Sign Up</a>`;
    } else if (role === "loggedPatient") {
        headerContent += `
                <a href="/">Home</a>
                <a href="/pages/patientAppointments.html">Appointments</a>
                <a href="#" onclick="logoutPatient()">Logout</a>`;
    } else {
        headerContent += `
                <a href="/">Home</a>`;
    }

    headerContent += `
            </nav>
        </header>`;

    headerDiv.innerHTML = headerContent;
    attachHeaderButtonListeners();
}

function attachHeaderButtonListeners() {
    const addDocBtn = document.getElementById("addDocBtn");
    if (addDocBtn) {
        addDocBtn.addEventListener("click", () => {
            if (typeof openModal === "function") openModal();
        });
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/";
}

function logoutPatient() {
    localStorage.removeItem("token");
    localStorage.setItem("userRole", "patient");
    window.location.href = "/pages/patientDashboard.html";
}

// Auto-render when script loads
renderHeader();
