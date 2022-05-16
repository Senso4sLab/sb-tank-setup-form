const backToFormButton = document.querySelector("#back-button");

const submitSuccessForm = (e) => {
    e.preventDefault();
  
    window.location.href = "index.html";
  };
  
  backToFormButton.addEventListener("click", submitSuccessForm);