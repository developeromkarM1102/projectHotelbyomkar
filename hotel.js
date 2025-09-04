// ✅ Show welcome alert (only on Home page)
window.addEventListener("load", function () {
    if (document.body.id === "Home") {
        setTimeout(function () {
            alert("Welcome to the Hotel Restoff!");
        }, 1000);
    }
});

// ✅ Set min date (today onwards) for reservation form
window.addEventListener("load", function () {
    let today = new Date().toISOString().split("T")[0];
    const dateInput = document.getElementById("date");
    if (dateInput) {
        dateInput.setAttribute("min", today);
    }
});

// ✅ Time slots from 8:00 AM to 11:45 PM (15 min interval)
const select = document.getElementById("time");
if (select) {
    for (let hour = 8; hour <= 23; hour++) {
        for (let min = 0; min < 60; min += 15) {
            let h = hour.toString().padStart(2, "0");
            let m = min.toString().padStart(2, "0");
            let value = `${h}:${m}`;

            // Convert to AM/PM format
            let displayHour = (hour % 12) || 12;
            let ampm = hour < 12 ? "AM" : "PM";
            let label = `${displayHour}:${m} ${ampm}`;

            let option = document.createElement("option");
            option.value = value;
            option.textContent = label;
            select.appendChild(option);
        }
    }
}

// ✅ Search functionality with "no result" message
const searchInput = document.getElementById("searchInput");
const sections = document.querySelectorAll(".menu-container");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        const filter = searchInput.value.toLowerCase();

        sections.forEach(section => {
            const cards = section.querySelectorAll(".menu-card");
            let foundInSection = false;

            cards.forEach(card => {
                const dishName = card.querySelector("h3").textContent.toLowerCase();
                const dishDesc = card.querySelector("p").textContent.toLowerCase();

                if (dishName.includes(filter) || dishDesc.includes(filter)) {
                    card.style.display = "block";
                    foundInSection = true;
                } else {
                    card.style.display = "none";
                }
            });

            // Create "No result" message
            let noResultMsg = section.querySelector(".no-result");
            if (!noResultMsg) {
                noResultMsg = document.createElement("div");
                noResultMsg.classList.add("no-result");
                noResultMsg.textContent = "❌ Sorry! Dishes are not available right now.";
                noResultMsg.style.flexBasis = "100%";
                noResultMsg.style.textAlign = "center";
                noResultMsg.style.margin = "20px 0";
                noResultMsg.style.fontWeight = "bold";
                noResultMsg.style.color = "white";
                noResultMsg.style.display = "none";
                section.appendChild(noResultMsg);
            }

            // Show or hide message
            if (!foundInSection && filter !== "") {
                noResultMsg.style.display = "block";
            } else {
                noResultMsg.style.display = "none";
            }
        });
    });
}

// ✅ Order system
const addButtons = document.querySelectorAll(".add-btn");
const cancelButtons = document.querySelectorAll(".cancel-btn");
const orderText = document.getElementById("orderText");

let orders = [];

// Add to order
addButtons.forEach(button => {
    button.addEventListener("click", () => {
        const card = button.parentElement;
        const dishName = card.querySelector("h3").textContent;
        const qty = parseInt(card.querySelector(".qty-input").value) || 1;

        const existing = orders.find(o => o.name === dishName);
        if (existing) {
            existing.qty += qty;
        } else {
            orders.push({ name: dishName, qty: qty });
        }

        updateOrderText();
        showToast(` ${dishName} × ${qty} added to your order ✅`);
    });
});

// Cancel order
cancelButtons.forEach(button => {
    button.addEventListener("click", () => {
        const card = button.parentElement;
        const dishName = card.querySelector("h3").textContent;

        const index = orders.findIndex(o => o.name === dishName);
        if (index !== -1) {
            orders.splice(index, 1);
            updateOrderText();
            showToast(`${dishName} removed from your order ❌`);
        } else {
            showToast(`${dishName} is not in your order ❗`);
        }
    });
});

// Update order box
function updateOrderText() {
    if (orderText) {
        orderText.value = orders.map(o => `${o.qty} x ${o.name}`).join("\n");
    }
}

// Toast message
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "#5ff21bff";
    toast.style.color = "black";
    toast.style.padding = "10px 15px";
    toast.style.borderRadius = "8px";
    toast.style.fontSize = "14px";
    toast.style.zIndex = "9999";
    toast.style.opacity = "0.9";

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// Quantity increase/decrease
function increaseQty(btn) {
    let qtyInput = btn.parentElement.querySelector(".qty-input");
    qtyInput.value = parseInt(qtyInput.value) + 1;
}

function decreaseQty(btn) {
    let qtyInput = btn.parentElement.querySelector(".qty-input");
    let currentValue = parseInt(qtyInput.value);
    if (currentValue > 1) {
        qtyInput.value = currentValue - 1;
    }
}
