const successForm = document.querySelector("#success-form");
const backToFormButton = document.querySelector("#back-button");

const submitSuccessForm = (e) => {
    e.preventDefault();
  
    window.location.href = "index.html";
  };
  
  successForm.addEventListener("submit", submitSuccessForm);
  backToFormButton.addEventListener("click", submitSuccessForm);