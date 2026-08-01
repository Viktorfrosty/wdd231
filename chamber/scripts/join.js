const timestampInput = document.getElementById("timestamp");

if (timestampInput) {
  timestampInput.value = new Date().toISOString();
}

const triggerButtons = document.querySelectorAll(".modal-trigger");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".modal-close");

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("open");
    document.body.classList.add("modal-open");
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
  }
}

triggerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModal(button.dataset.modal);
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    if (modal) {
      modal.classList.remove("open");
      document.body.classList.remove("modal-open");
    }
  });
});

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("open");
      document.body.classList.remove("modal-open");
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modals.forEach((modal) => {
      modal.classList.remove("open");
    });
    document.body.classList.remove("modal-open");
  }
});

const summaryList = document.getElementById("summary-list");

if (summaryList) {
  const params = new URLSearchParams(window.location.search);
  const values = [
    { label: "First name", value: params.get("fname") },
    { label: "Last name", value: params.get("lname") },
    { label: "Email", value: params.get("email") },
    { label: "Phone", value: params.get("phone") },
    { label: "Organization", value: params.get("organization") },
    { label: "Timestamp", value: params.get("timestamp") }
  ];

  values.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${item.label}:</strong> ${item.value || "Not provided"}`;
    summaryList.appendChild(listItem);
  });
}
