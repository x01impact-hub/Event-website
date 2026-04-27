const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("show");
});

const filterButtons = document.querySelectorAll(".filter-btn");
const eventCards = document.querySelectorAll(".event-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedCategory = button.getAttribute("data-category");

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });
        button.classList.add("active");

        eventCards.forEach(function (card) {
            const cardCategory = card.getAttribute("data-category");

            if (selectedCategory === "all" || selectedCategory === cardCategory) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

const tabButtons = document.querySelectorAll(".tab-btn");
const scheduleLists = document.querySelectorAll(".schedule-list");

tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedDay = button.getAttribute("data-day");

        tabButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });
        button.classList.add("active");

        scheduleLists.forEach(function (list) {
            list.classList.remove("active");
        });
        document.getElementById(selectedDay).classList.add("active");
    });
});

const eventDate = new Date("May 20, 2026 09:30:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = eventDate - now;

    if (difference <= 0) {
        document.getElementById("countdown").innerHTML = "<span><strong>Live</strong>Event Started</span>";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const registerForm = document.getElementById("registerForm");
const formMessage = document.getElementById("formMessage");

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value;
    const selectedEvent = document.getElementById("event").value;

    if (name === "" || email === "" || department === "" || selectedEvent === "") {
        showMessage("Please fill all the fields.", "error");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        showMessage("Please enter a valid email address.", "error");
        return;
    }

    showMessage("Registration submitted successfully!", "success");
    registerForm.reset();
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = "form-message " + type;
}