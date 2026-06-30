// Navigation between modules
function showSection(sectionId) {
    document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(sectionId).classList.add("active");
}

// Booking Module
document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("bName").value;
    const email = document.getElementById("bEmail").value;
    const room = document.getElementById("bRoomType").value;
    const checkIn = document.getElementById("bCheckIn").value;
    const checkOut = document.getElementById("bCheckOut").value;

    if (new Date(checkOut) <= new Date(checkIn)) {
        document.getElementById("bookingMessage").textContent = "⚠️ Check-out date must be after check-in date!";
        return;
    }

    localStorage.setItem(email, JSON.stringify({ name, email, room, checkIn, checkOut, status: "Booked" }));
    document.getElementById("bookingMessage").textContent = `✅ Room reserved successfully for ${name}!`;
    this.reset();
});

// Check-In Module
document.getElementById("checkinForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("cEmail").value;
    const data = JSON.parse(localStorage.getItem(email));
    if (data) {
        data.status = "Checked-In";
        localStorage.setItem(email, JSON.stringify(data));
        document.getElementById("checkinMessage").textContent = `✅ Welcome ${data.name}, you are checked in!`;
    } else {
        document.getElementById("checkinMessage").textContent = "❌ No booking found for this email!";
    }
    this.reset();
});

// Check-Out Module
document.getElementById("checkoutForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("coEmail").value;
    const data = JSON.parse(localStorage.getItem(email));
    if (data && data.status === "Checked-In") {
        data.status = "Checked-Out";
        localStorage.setItem(email, JSON.stringify(data));
        document.getElementById("checkoutMessage").textContent = `✅ ${data.name} checked out successfully. Please proceed to payment.`;
    } else {
        document.getElementById("checkoutMessage").textContent = "❌ Check-in record not found!";
    }
    this.reset();
});

// Payment Module
document.getElementById("paymentForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("pEmail").value;
    const amount = document.getElementById("pAmount").value;
    const method = document.getElementById("pMethod").value;
    const data = JSON.parse(localStorage.getItem(email));

    if (data && data.status === "Checked-Out") {
        data.status = "Paid";
        data.payment = { amount, method, date: new Date().toLocaleDateString() };
        localStorage.setItem(email, JSON.stringify(data));
        document.getElementById("paymentMessage").textContent = `💰 Payment of $${amount} received successfully via ${method}.`;
    } else {
        document.getElementById("paymentMessage").textContent = "❌ No record found for payment.";
    }
    this.reset();
});
