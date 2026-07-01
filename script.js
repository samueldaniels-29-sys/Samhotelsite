// Sam's Hotel Website JavaScript

// Build mailto links from data attributes at runtime so the raw address
// never sits in the page's HTML source as plain, scrapable text.
document.querySelectorAll(".email-protect").forEach(function (el) {
  const user = el.getAttribute("data-user");
  const domain = el.getAttribute("data-domain");
  if (!user || !domain) return;
  const address = user + "@" + domain;
  el.textContent = address;
  el.setAttribute("href", "mailto:" + address);
});

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });
}

const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const roomType = document.getElementById("roomType").value;
    const formMessage = document.getElementById("formMessage");

    if (name === "" || email === "" || phone === "" || roomType === "") {
      formMessage.style.color = "red";
      formMessage.textContent = "Please fill all required fields.";
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      formMessage.style.color = "red";
      formMessage.textContent = "Please enter a valid email address.";
      return;
    }
    if (phone.length !== 10 || isNaN(phone)) {
      formMessage.style.color = "red";
      formMessage.textContent = "Please enter a valid 10-digit mobile number.";
      return;
    }
    formMessage.style.color = "green";
    formMessage.textContent = "Thank you! Your booking enquiry has been submitted.";
    bookingForm.reset();
  });
}

function calculateCost() {
  const roomSelect = document.getElementById("roomSelect");
  const nightsCount = document.getElementById("nightsCount");
  const costResult = document.getElementById("costResult");
  if (!roomSelect || !nightsCount || !costResult) return;

  const price = Number(roomSelect.value);
  const nights = Number(nightsCount.value);

  if (!price) {
    costResult.style.color = "red";
    costResult.textContent = "Please select a room type first.";
    return;
  }
  if (nights <= 0) {
    costResult.style.color = "red";
    costResult.textContent = "Please enter a valid number of nights.";
    return;
  }
  const total = price * nights;
  costResult.style.color = "green";
  costResult.textContent = "Estimated Total Cost: ₹" + total.toLocaleString("en-IN");
}

function filterGallery(category) {
  const items = document.querySelectorAll(".gallery-item");
  items.forEach(function (item) {
    if (category === "all" || item.classList.contains(category)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
