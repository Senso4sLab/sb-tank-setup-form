const isError = (boolean, element, errorMessage, errorMessages) => {
  if (boolean) {
    errorMessages = errorMessages.filter(
      (message) => message != errorMessage
    );
    element.style.borderColor = "red";
    errorMessages.push(errorMessage);
    error.style.display = "block";
    error.style.color = "red";
    error.style.fontWeight = "900";
  } else {
    element.style.borderColor = "black";
    errorMessages = errorMessages.filter(
      (message) => message != errorMessage
    );
  }
  
};

export const dropdownValidation = (event, subElement, cssIdentifier, errorMessage, errorMessages) => {
  if (event.target.className == cssIdentifier) {
    if (subElement.value == "" || subElement.value == undefined) {
     isError(true, event.target, errorMessage, errorMessages);
    } else {
      isError(false, event.target, errorMessage, errorMessages);
    }
  }
};

export const regularNumberValidation = (event, element, errorMessage, errorMessages) => {
    let userInput = (event.target.value != "") ? Number.parseFloat(event.target.value) : "";

    if (event.target == element) {
      if (
        (userInput < 0 ||
          userInput == undefined ||
          userInput == "") &&
        userInput.disabled == false
      ) {
        isError(true, element, errorMessage, errorMessages);
      } else {
        isError(false, element, errorMessage, errorMessages);
      }
    }
};

export const maxHeightValidation = (event, element, errorMessage, errorMessages) => {
  let userInput = (event.target.value != "") ? Number.parseFloat(event.target.value) : "";

  if (event.target == element) {
    if (
      userInput < 0 ||
      userInput > 2.5 ||
      userInput == undefined ||
      userInput == ""
    ) {
      isError(true, element, errorMessage, errorMessages);
    } else {
      isError(false, element, errorMessage, errorMessages);
    }
  }
};

export const maxVolumeValidation = (event, element, errorMessage, errorMessages) => {
  let userInput = (event.target.value != "") ? Number.parseFloat(event.target.value) : "";

  if (event.target == element) {
    if (
      userInput < 0 ||
      userInput > 2500 ||
      userInput == undefined ||
      userInput == ""
    ) {
      isError(true, element, errorMessage, errorMessages);
    } else {
      isError(false, element, errorMessage, errorMessages);
    }
  }
};

export const customHeightValidation = (event, element, errorMessage, customHeightsAndVolumesArray = [], customHeights = [], errorMessages) => {
  let userInput = (event.target.value != "") ? Number.parseFloat(event.target.value) : "";

  if (event.target == element) {
    if (
      userInput < 0 ||
      userInput > 2.5 ||
      userInput == undefined ||
      userInput == ""
    ) {
      
      isError(true, element, errorMessage, errorMessages);
      customHeightsAndVolumesArray =
        customHeightsAndVolumesArray.filter((el) => el.id != element.id);
        customHeightsAndVolumesArray.push({id: event.target.id, value: userInput,});
    } else {
      customHeights = customHeights.filter((height) => height[0] != event.target.id);
      isError(false, element, errorMessage, errorMessages);
      customHeightsAndVolumesArray =
          customHeightsAndVolumesArray.filter(
            (el) => el.id != element.id
          );
        customHeights.push([event.target.id, event.target.value]);
    }
  }
};

export const customVolumeValidation = (event, element, errorMessage, customHeightsAndVolumesArray = [], customVolumes = [], errorMessages) => {
  let userInput = (event.target.value != "") ? Number.parseFloat(event.target.value) : "";

  if (event.target == element) {
    if (
      userInput < 0 ||
      userInput > 2500 ||
      userInput == undefined ||
      userInput == ""
    ) {
      isError(true, element, errorMessage, errorMessages);
        customHeightsAndVolumesArray =
        customHeightsAndVolumesArray.filter((el) => el.id != element.id);
        customHeightsAndVolumesArray.push({id: event.target.id, value: userInput,});
        return ([customHeightsAndVolumesArray, customVolumes]);
    } else {
      customVolumes = customVolumes.filter((volume) => volume[0] != event.target.id);
      isError(false, element, errorMessage, errorMessages);
      customHeightsAndVolumesArray =
          customHeightsAndVolumesArray.filter(
            (el) => el.id != element.id
          );
          customVolumes.push([event.target.id, event.target.value]);
          return ([customHeightsAndVolumesArray, customVolumes]);
    }
  }
};

export const addedCustomFieldValidation = (event, errorMessage, customHeightsAndVolumesArray = [], customHeights = [], customVolumes = [], errorMessages) => {

  if (customHeightsAndVolumesArray.length > 0) {
    customHeightsAndVolumesArray.forEach((el) => {
      const inputField = document.querySelector(`#${el.id}`);
      
      if (inputField.id.includes("height")) {
        customHeightValidation(event, inputField, errorMessage, customHeightsAndVolumesArray, customHeights, errorMessages);
      } else if (inputField.id.includes("volume")) {
        customVolumeValidation(event, inputField, errorMessage, customHeightsAndVolumesArray, customVolumes, errorMessages);
      } else {
        errorMessages = errorMessages.filter(
          (message) => message != errorMessage
        );
      }
    });
    if (customHeightsAndVolumesArray.length == 0) {
      errorMessages = errorMessages.filter(
        (message) => message != errorMessage
      );
    }
  }
};

export const maxFillingValidation = (event, element, errorMessage, errorMessages) => {
  let userInput = (event.target.value != "") ? Number.parseFloat(event.target.value) : "";
     if (event.target == element) {
    if (
      userInput == "" ||
      userInput == undefined ||
      userInput < 0 ||
      userInput > 100
    ) {
      isError(true, element, errorMessage, errorMessages);
    } else {
      isError(false, element, errorMessage, errorMessages);
    }
  }
};

export const errorMessageOutput = (event, element, errorMessages) => {
  if (errorMessages.length > 0) {
    let firstChild = element.firstChild;
    while (element.children.length > 0) {
      element.removeChild(firstChild);
      firstChild = element.firstChild;
    }
    event.preventDefault();
    element.style.display = "block";
    errorMessages.forEach((message) => {
      const errorParagraph = document.createElement("p");
      errorParagraph.textContent = message;
      error.appendChild(errorParagraph);
    });
    return;
  } else {
    error.style.display = "none";
    error.textContent = "";
  }
};