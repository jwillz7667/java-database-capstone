// footer.js - Reusable footer component

function renderFooter() {
    const footer = document.getElementById("footer");
    if (!footer) return;

    footer.innerHTML = `
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-column">
                    <h4>Smart Clinic</h4>
                    <p>&copy; Copyright ${new Date().getFullYear()} Smart Clinic. All rights reserved.</p>
                </div>
                <div class="footer-column">
                    <h4>Company</h4>
                    <a href="#">About</a>
                    <a href="#">Careers</a>
                    <a href="#">Press</a>
                </div>
                <div class="footer-column">
                    <h4>Support</h4>
                    <a href="#">Help Center</a>
                    <a href="#">Contact Us</a>
                    <a href="#">Privacy Policy</a>
                </div>
                <div class="footer-column">
                    <h4>Connect</h4>
                    <a href="#">Twitter</a>
                    <a href="#">LinkedIn</a>
                    <a href="#">GitHub</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>Built with care for better healthcare management.</p>
            </div>
        </footer>`;
}

// Auto-render when script loads
renderFooter();
