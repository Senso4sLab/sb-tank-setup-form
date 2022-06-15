const backToFormButton = document.querySelector("#back-button");

const submitSuccessForm = (e) => {
    e.preventDefault();
  
    fetch("https://192.168.4.1/disable_ap")
    .then(() => window.close())
    .catch();
  };
  
  backToFormButton.addEventListener("click", submitSuccessForm);