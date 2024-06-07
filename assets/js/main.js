const nextBtn = document.querySelector(".next");
const backBtn = document.querySelector(".back");
const steps = document.querySelectorAll(".form-content");
function getActiveForm() {
  let activeForm = null;
  steps.forEach((step) => {
    if (step.classList.contains("activeform")) {
      activeForm = step;
    }
  });

  return activeForm;
}
function updateButtonStates() {
  let currentForm = getActiveForm();
  let nextStep = currentForm.nextElementSibling;
  let prevStep = currentForm.previousElementSibling;

  nextBtn.disabled = !(nextStep && nextStep.classList.contains("form-content"));

  backBtn.disabled = !(prevStep && prevStep.classList.contains("form-content"));
  if (prevStep && prevStep.classList.contains("form-content")) {
    backBtn.style.display = "block";
  } else if (currentForm.classList.contains("form-1")) {
    backBtn.disabled = true;
    backBtn.style.display = "none";
  }
  if (currentForm.classList.contains("form-4")) {
    nextBtn.disabled = true;
  }
}
nextBtn.addEventListener("click", () => {
  let currentForm = getActiveForm();
  let nextStep = currentForm.nextElementSibling;
  let currentInputs = currentForm.querySelectorAll("input");

  if (nextStep && nextStep.classList.contains("form-content")) {
    currentForm.classList.remove("activeform");
    nextStep.classList.add("activeform");
  } else {
    nextBtn.disabled = true;
  }
  updateButtonStates();
});
backBtn.addEventListener("click", () => {
  let currentForm = getActiveForm();
  let prevStep = currentForm.previousElementSibling;

  currentForm.classList.remove("activeform");

  if (prevStep && prevStep.classList.contains("form-content")) {
    prevStep.classList.add("activeform");
  }
  updateButtonStates();
});
updateButtonStates();
