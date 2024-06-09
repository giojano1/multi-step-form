const steps = document.querySelectorAll(".form-content");
const stepsNav = document.querySelectorAll(".step-number");
const requiredText = document.querySelector(".requiredText");
const planOptions = document.querySelectorAll(".plan");
const toggleType = document.getElementById("toggle");
const adText = document.querySelectorAll(".monthFree");
const priceText = document.querySelectorAll(".priceText");
const planType = document.getElementById("planType");
const planMoney = document.getElementById("planMoney");
const addOn = document.querySelectorAll(".addon");
const sumadd1 = document.querySelector(".sumadd1");
const sumadd2 = document.querySelector(".sumadd2");
const sumadd3 = document.querySelector(".sumadd3");
const sumaddprice1 = document.querySelector(".sumaddprice1");
const sumaddprice2 = document.querySelector(".sumaddprice2");
const sumaddprice3 = document.querySelector(".sumaddprice3");
const changeBtn = document.getElementById("change");
const confirmBtn = document.getElementById("confirm");
const total = document.getElementById("total");
const next1 = document.getElementById("next-1");
const next2 = document.getElementById("next-2");
const back2 = document.getElementById("back-2");
const next3 = document.getElementById("next-3");
const back3 = document.getElementById("back-3");
const back4 = document.getElementById("back-4");
let currentStep = 0;
let chosenOption = "";
let paymentType = "Monthly";
const formData = {};
let checkedAddons = {};
let totalPrice = 0;
function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("activeform", i === index);
  });
}
function activeStep(index) {
  stepsNav.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });
}
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
  if (paymentType === "Yearly") {
    formData.price *= 10;
  }
  formData.payType = paymentType;
  formData.addon1 = checkedAddons.addOn1;
  formData.addon2 = checkedAddons.addOn2;
  formData.addon3 = checkedAddons.addOn3;
  console.log(formData);
}
function showSummary() {
  collectData();

  let subPrice = formData.price;
  let addon1Price = 0;
  let addon2Price = 0;
  let addon3Price = 0;

  planType.textContent = `${formData.plan} (${formData.payType})`;

  if (formData.addon1 == true) {
    sumadd1.style.display = "flex";
    addon1Price = 1;
  } else {
    sumadd1.style.display = "none";
  }
  if (formData.addon2 == true) {
    sumadd2.style.display = "flex";
    addon2Price = 1;
  } else {
    sumadd2.style.display = "none";
  }
  if (formData.addon3 == true) {
    sumadd3.style.display = "flex";
    addon3Price = 2;
  } else {
    sumadd3.style.display = "none";
  }

  if (paymentType === "Yearly") {
    addon1Price *= 10; // tu wliuria update price
    addon2Price *= 10;
    addon3Price *= 10;
    planMoney.textContent = `$${formData.price}/yr`;
    sumaddprice1.textContent = `+$${addon1Price}/yr`;
    sumaddprice2.textContent = `+$${addon2Price}/yr`;
    sumaddprice3.textContent = `+$${addon3Price}/yr`;
    totalPrice = subPrice + addon1Price + addon2Price + addon3Price;
    total.textContent = `$${totalPrice}/yr`;
  } else {
    planMoney.textContent = `$${formData.price}/mo`;
    sumaddprice1.textContent = `+$${addon1Price}/mo`;
    sumaddprice2.textContent = `+$${addon2Price}/mo`;
    sumaddprice3.textContent = `+$${addon3Price}/mo`;
    totalPrice = subPrice + addon1Price + addon2Price + addon3Price;
    total.textContent = `$${totalPrice}/mo`;
  }
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
      paymentType = "Yearly";
      adText.forEach((text) => {
        text.classList.add("show");
      });
      priceText[0].textContent = "$90/yr";
      priceText[1].textContent = "$120/yr";
      priceText[2].textContent = "$150/yr";
    } else {
      paymentType = "Monthly";
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
      let addonCheckbox = box.querySelector(".addonCheckbox");
      checkedAddons[box.id] = addonCheckbox.checked;
      if (addonCheckbox.checked == true) {
        box.classList.add("activeAddon");
      } else {
        box.classList.remove("activeAddon");
      }
    });
  });
}
next1.addEventListener("click", () => {
  if (!validateStep(0)) {
    showStep(1);
    activeStep(1);
    chooseOption();
    choosePayment();
  }
});
next2.addEventListener("click", () => {
  showStep(2);
  activeStep(2);
  chooseAddOn();
});
next3.addEventListener("click", () => {
  showStep(3);
  activeStep(3);
  showSummary();
});
back2.addEventListener("click", () => {
  showStep(0);
  activeStep(0);
});
back3.addEventListener("click", () => {
  showStep(1);
  activeStep(1);
});
back4.addEventListener("click", () => {
  showStep(2);
  activeStep(2);
});
changeBtn.addEventListener("click", () => {
  showStep(1);
});
confirmBtn.addEventListener("click", () => {
  showStep(4);
});
