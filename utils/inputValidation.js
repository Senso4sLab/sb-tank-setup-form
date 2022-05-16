const isError = (boolean, element) => {
  if (boolean) {
    element.style.borderColor = "red";
    error.style.display = "block";
    error.style.color = "red";
    error.style.fontWeight = "900";
  } else {
    element.style.borderColor = "black";
  } 
};

export const limitDecimals = (element, number, errorMessage) => {
  const stringNum = String(number);
  if (stringNum.includes(".")) {
    let numberOfDecimals = stringNum.split(".")[1].length;
    if (numberOfDecimals > 2) {
      isError(true, element);
       return errorMessage;
    } else {
   isError(false, element);
       return "";
}
  }
  ;
};

export const dropdownValidation = (element, errorMessage) => {
  if (element.value == "" || element.value == undefined || element.value.length == 0) {
  isError(true, element);
  return errorMessage;
   } else {
   isError(false, element);
   return "";
   }
};

export const regularNumberValidation = (element, errorMessage) => {
  let userInput = (element.value != "") ? Number.parseFloat(element.value).toFixed(2) : "";
  if (
    (userInput < 0 ||
      userInput == undefined ||
      userInput == "" || userInput == '') 
      &&
    element.disabled == false
  ) {
   isError(true, element);
   return errorMessage;
  } else {
   isError(false, element);
   return "";
  }
};

export const maxHeightValidation = (element, errorMessage) => {
  let userInput = (element.value != "") ? Number.parseFloat(element.value).toFixed(2) : "";
    if (
      userInput < 0 ||
      userInput > 4.7 ||
      userInput == undefined ||
      userInput == ""
    ) {
      isError(true, element);
      return errorMessage;
     } else {
      isError(false, element);
      return "";
     }
};

export const maxVolumeValidation = (element, errorMessage) => {
  let userInput = (element.value != "") ? Number.parseFloat(element.value).toFixed(2) : "";
    if (
      userInput < 0 ||
      userInput == undefined ||
      userInput == ""
    ) {
      isError(true, element);
      return errorMessage;
     } else {
      isError(false, element);
      return "";
     }
};

export const regularTextValidation = (element, errorMessage) => {
  if ((
    element.value == "" ||
    element.value == undefined
  ) && element.disabled === false) {
    isError(true, element);
    return errorMessage;
  } else {
    isError(false, element);
    return "";
  }
};

export const customHeightValidation = (element, errorMessage, customHeightsAndVolumesArray = [], customHeights = []) => {
  let userInput = (element.value != "") ? Number.parseFloat(element.value).toFixed(2) : "";
    if (
      userInput < 0 ||
      userInput > 4.7 ||
      userInput == undefined ||
      userInput == ""
    ) {  
      isError(true, element);
      customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter((el) => el.id != element.id);
        customHeightsAndVolumesArray.push({id: element.id, value: userInput,});
        customHeights = customHeights.filter(el => el[0] != element.id);
        return ([customHeightsAndVolumesArray, customHeights, errorMessage]);
    } else {
      isError(false, element);
      customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter((el) => el.id != element.id);
      customHeights = customHeights.filter(el => el[0] != element.id);
        customHeights.push([element.id, element.value]);
        return ([customHeightsAndVolumesArray, customHeights, ""]);
    }
};

export const customVolumeValidation = (element, errorMessage, customHeightsAndVolumesArray = [], customVolumes = []) => {
  let userInput = (element.value != "") ? Number.parseFloat(element.value).toFixed(2) : "";
    if (
      userInput < 0 ||
      userInput == undefined ||
      userInput == ""
    ) {
      isError(true, element);
        customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter((el) => el.id != element.id);
        customHeightsAndVolumesArray.push({id: element.id, value: userInput,});
        customVolumes = customVolumes.filter((volume) => volume[0] != element.id);
        return ([customHeightsAndVolumesArray, customVolumes, errorMessage]);
    } else {
      isError(false, element);
      customVolumes = customVolumes.filter((volume) => volume[0] != element.id);
      customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter((el) => el.id != element.id);
          customVolumes.push([element.id, element.value]);
          return ([customHeightsAndVolumesArray, customVolumes, ""]);
    }
};

export const enableButton = (heightElement, volumeElement) => {
  if ((heightElement.value > 0 && heightElement.value <= 4.7) && (volumeElement.value > 0)) {
    return false;
  } else {
    return true;
  }
};

export const maxFillingValidation = (element, errorMessage) => {
  let userInput = (element.value != "") ? Number.parseFloat(element.value).toFixed(2) : "";
    if (
      userInput == "" ||
      userInput == undefined ||
      userInput < 0 ||
      userInput > 100
    ) {
      isError(true, element);
      return errorMessage;
    } else {
      isError(false, element);
      return "";
    }
};

export const errorMessageOutput = (element, errorMessages) => {
  const proceedButton = document.querySelector("#proceed-button");
  if (errorMessages.length > 0) {
    let firstChild = element.firstChild;
    while (element.children.length > 0) {
      element.removeChild(firstChild);
      firstChild = element.firstChild;
    }
    proceedButton.disabled = true;
    proceedButton.style.opacity = 0.7;
    element.style.display = "block";
    errorMessages.forEach((message) => {
      const errorParagraph = document.createElement("p");
      errorParagraph.textContent = message;
      error.appendChild(errorParagraph);
    });
    return errorMessages;
  } else if (errorMessages.length == 0) {
    proceedButton.disabled = false;
    proceedButton.style.opacity = 1;
    error.style.display = "none";
    error.textContent = "";
    return [];
  }
};