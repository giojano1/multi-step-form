const steps = document.querySelectorAll(".form-content");
const requiredText = document.querySelector(".requiredText");
const planOptions = document.querySelectorAll(".plan");
const toggleType = document.getElementById("toggle");
const adText = document.querySelectorAll(".monthFree");
const priceText = document.querySelectorAll(".priceText");
const addOn = document.querySelectorAll(".addon");
const next1 = document.getElementById("next-1");
const next2 = document.getElementById("next-2");
const back2 = document.getElementById("back-2");
const next3 = document.getElementById("next-3");
const back3 = document.getElementById("back-3");
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
  if (paymentType === "year") {
    formData.price *= 10;
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
function choosePayment() {
  toggleType.addEventListener("click", () => {
    if (toggleType.checked == true) {
      paymentType = "year";
      adText.forEach((text) => {
        text.classList.add("show");
      });
      priceText[0].textContent = "$90/yr";
      priceText[1].textContent = "$120/yr";
      priceText[2].textContent = "$150/yr";
    } else {
      paymentType = "month";
      adText.forEach((text) => {
        text.classList.remove("show");
      });
      priceText[0].textContent = "$9/yr";
      priceText[1].textContent = "$12/yr";
      priceText[2].textContent = "$15/yr";
    }
  });
}
function chooseAddOn() {
  addOn.forEach((box) => {
    box.addEventListener("click", () => {
      box.classList.toggle("activeAddon");
    });
  });
}
// choose step

next1.addEventListener("click", () => {
  // if (validateStep(0)) showStep(1);
  showStep(1);
  chooseOption();
  choosePayment();
});
next2.addEventListener("click", () => {
  showStep(2);
});
next3.addEventListener("click", () => {
  showStep(3);
  chooseAddOn();
});
back2.addEventListener("click", () => {
  showStep(0);
});
back3.addEventListener("click", () => {
  showStep(1);
});
document.querySelector("#sum").addEventListener("click", () => {
  collectData();
});
