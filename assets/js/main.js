const steps = document.querySelectorAll(".form-content");
const requiredText = document.querySelector(".requiredText");
const planOptions = document.querySelectorAll(".plan");
const toggleType = document.getElementById("toggle");
const adText = document.querySelectorAll(".adText");
const next1 = document.getElementById("next-1");
const next2 = document.getElementById("next-2");
const back2 = document.getElementById("back-2");
let currentStep = 0;
let chosenOption = "";
let paymentType = "month";
const formData = {};

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("activeform", i === index);
  });
}
function showStepNumber() {}
function collectData() {
  formData.name = document.getElementById("name").value;
  formData.email = document.getElementById("email").value;
  formData.phone = document.getElementById("phone").value;
  if (chosenOption === "arcade") {
    formData.plan = "Arcade";
    formData.price = 9;
  } else if (chosenOption === "advanced") {
    formData.plan = "Advanced";
    formData.price = 12;
  } else if (chosenOption === "pro") {
    formData.plan = "Pro";
    formData.price = 15;
  } else {
    formData.plan = "Arcade";
    formData.price = 9;
  }
  console.log(formData);
}
function showSummary() {
  collectData();
}
function validateStep(step) {
  const inputs = steps[step].querySelectorAll("input");
  let allValid = true;
  inputs.forEach((input) => {
    let reqText = input.closest("label").querySelector(".requiredText");
    if (!input.checkValidity()) {
      input.classList.add("required");
      reqText.classList.add("show");
      allValid = false;
    } else {
      input.classList.remove("required");
      reqText.classList.remove("show");
    }
  });
  return allValid;
}
function chooseOption() {
  planOptions.forEach((option) => {
    option.addEventListener("click", () => {
      planOptions.forEach((b) => b.classList.remove("activeplan"));
      option.classList.add("activeplan");
      chosenOption = option.dataset.value;
      console.log(chosenOption);
    });
  });
}
function choosePayment() {}
toggleType.addEventListener("click", () => {
  if (toggleType.checked == true) {
    paymentType = "year";
    alert("year");
    adText.forEach((text) => {
      text.classList.add("show");
    });
  } else {
    paymentType = "month";
  }
});

// choose plan

next1.addEventListener("click", () => {
  // if (validateStep(0)) showStep(1);
  showStep(1);
  chooseOption();
});
next2.addEventListener("click", () => {
  showStep(2);
});
back2.addEventListener("click", () => {
  showStep(0);
});
document.querySelector("#sum").addEventListener("click", () => {
  collectData();
});
console.log(adText);
