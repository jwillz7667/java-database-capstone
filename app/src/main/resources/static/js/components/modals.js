// modals.js - Reusable modal component for patient dashboard

export function openModal() {
    const modal = document.getElementById("modal");
    if (modal) modal.classList.add("active");
}

export function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) modal.classList.remove("active");
}

// Close modal when clicking the X button
document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.getElementById("closeModal");
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // Close modal when clicking outside
    const modal = document.getElementById("modal");
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }
});
