const isError = (boolean, element) => {
  if (boolean) {
    element.style.borderColor = "red";
    error.style.display = "block";
    error.style.color = "red";
    error.style.fontWeight = "900";
    // window.scroll(0, 0);
  } else {
      element.style.borderColor = "black";  
  } 
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
  if (element.value.includes(".") || element.value.includes("-")) {
    isError(true, element);
      return errorMessage;
  }
  let userInput = (element.value != "") ? Number.parseFloat(element.value) : "";
 
  if (
    (userInput < 0 ||
      userInput == undefined ||
      userInput == "") 
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
  if (element.value.includes("-")) {
    isError(true, element);
      return errorMessage;
  } else {
    let userInput = (element.value != "") ? Number.parseFloat(element.value) : "";
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
  }
  
};

export const maxVolumeValidation = (element, errorMessage) => {
  if (element.value.includes(".") || element.value.includes("-")) {
    isError(true, element);
      return errorMessage;
  } else {
    let userInput = (element.value != "") ? Number.parseFloat(element.value) : "";
    if (
      userInput < 0 ||
      userInput == undefined ||
      userInput == "" ||
      userInput == Infinity
    ) {
      isError(true, element);
      return errorMessage;
     } else {
      isError(false, element);
      return "";
     }
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

export const customHeightValidation = (element, errorMessage, customHeightsAndVolumesArray, customHeights, maxHeight) => {
  if (element.value.includes("-") || element.value.includes(" ")) {
    isError(true, element);
      return errorMessage;
  }
  let userInput = (element.value != "") ? Number.parseFloat(element.value) : "";
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
    } else if (element.id === "custom-max-height2") {
      if (userInput <= 0 || userInput >= Number.parseFloat(maxHeight.value)) {
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
    } else if (element.id != "custom-max-height2") {
      const idNumber = Number.parseInt(element.id.split("height")[1]);
      const previousElement = document.querySelector(`#custom-max-height${idNumber - 1}`);
      if (userInput <= Number.parseFloat(previousElement.value) || userInput >= Number.parseFloat(maxHeight.value)) {
        isError(true, element);
        customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter((el) => el.id != element.id);
          customHeightsAndVolumesArray.push({id: element.id, value: userInput,});
          customHeights = customHeights.filter(el => el[0] != element.id);
          return ([customHeightsAndVolumesArray, customHeights, errorMessage]);
      } else {
        isError(false, element);
        customHeights = customHeights.filter((height) => height[0] != element.id);
      customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter((el) => el.id != element.id);
      customHeights.push([element.id, element.value]);
          return ([customHeightsAndVolumesArray, customHeights, ""]);
      }
    }  else {
      isError(false, element);
      customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter((el) => el.id != element.id);
      customHeights = customHeights.filter(el => el[0] != element.id);
        customHeights.push([element.id, element.value]);
        return ([customHeightsAndVolumesArray, customHeights, ""]);
    }
};

export const customVolumeValidation = (element, errorMessage, customHeightsAndVolumesArray, customVolumes, maxVolume) => {
  if (element.value.includes(".") || element.value.includes("-") || element.value.includes(",") || element.value.includes(" ")) {
    isError(true, element);
      return errorMessage;
  }
  let userInput = (element.value != "") ? Number.parseInt(element.value) : "";
    if (
      userInput < 0 ||
      userInput == undefined ||
      userInput == "" ||
      userInput == Infinity
    ) {
      isError(true, element);
        customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter((el) => el.id != element.id);
        customHeightsAndVolumesArray.push({id: element.id, value: userInput,});
        customVolumes = customVolumes.filter((volume) => volume[0] != element.id);
        return ([customHeightsAndVolumesArray, customVolumes, errorMessage]);
    } else if (element.id === "custom-max-volume2") {
      if (userInput <= 0 || userInput >= Number.parseInt(maxVolume.value)) {
        isError(true, element);
        customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter((el) => el.id != element.id);
          customHeightsAndVolumesArray.push({id: element.id, value: userInput,});
          customVolumes = customVolumes.filter(el => el[0] != element.id);
          return ([customHeightsAndVolumesArray, customVolumes, errorMessage]);
      } else {
        isError(false, element);
      customVolumes = customVolumes.filter((volume) => volume[0] != element.id);
      customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter((el) => el.id != element.id);
          customVolumes.push([element.id, element.value]);
          return ([customHeightsAndVolumesArray, customVolumes, ""]);
      }
    } else if (element.id != "custom-max-volume2") {
      const idNumber = Number.parseInt(element.id.split("volume")[1]);
      const previousElement = document.querySelector(`#custom-max-volume${idNumber - 1}`);
      if (userInput <= Number.parseInt(previousElement.value) || userInput >= Number.parseInt(maxVolume.value)) {
        isError(true, element);
        customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter((el) => el.id != element.id);
          customHeightsAndVolumesArray.push({id: element.id, value: userInput,});
          customVolumes = customVolumes.filter(el => el[0] != element.id);
          return ([customHeightsAndVolumesArray, customVolumes, errorMessage]);
      } else {
        isError(false, element);
      customVolumes = customVolumes.filter((volume) => volume[0] != element.id);
      customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter((el) => el.id != element.id);
          customVolumes.push([element.id, element.value]);
          return ([customHeightsAndVolumesArray, customVolumes, ""]);
      }
    } else {
      isError(false, element);
      customVolumes = customVolumes.filter((volume) => volume[0] != element.id);
      customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter((el) => el.id != element.id);
          customVolumes.push([element.id, element.value]);
          return ([customHeightsAndVolumesArray, customVolumes, ""]);
    }
};

export const enableButton = (heightElement, volumeElement) => {
  if (heightElement.value.includes(".")) {
      const numOfDecimals = heightElement.value.split(".")[1].length;
      if (numOfDecimals > 2) {
        return true;
      }  
  }
  const heightElementValue = Number.parseFloat(heightElement.value);
  const volumeElementValue = Number.parseInt(volumeElement.value); 
  if ((heightElementValue > 0 && heightElementValue <= 4.7) && (volumeElementValue > 0)) {
    return false;
  } else {
    return true;
  }
};

export const maxFillingValidation = (element, errorMessage) => {
  if (element.value.includes(".") || element.value.includes("-") || element.value.includes(",") || element.value.includes(" ")) {
    isError(true, element);
      return errorMessage;
  }
  let userInput = (element.value != "") ? Number.parseFloat(element.value) : "";
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

// Check if volume's value is less than 50000l and add an error to it if it is

// Check if volume's value is more than 50000l or equal to it and add an error to it if it is

export const errorMessageOutput = (element, errorMessages) => {
  const proceedButton = document.querySelector("#proceed-button");
  if (errorMessages.length > 0) {
    let firstChild = element.firstChild;
    while (element.children.length > 0) {
      element.removeChild(firstChild);
      firstChild = element.firstChild;
    }
    proceedButton.disabled = true;
    proceedButton.backgroundColor = "gray";
    element.style.display = "block";
    errorMessages.forEach((message) => {
      const errorParagraph = document.createElement("p");
      errorParagraph.textContent = message;
      error.appendChild(errorParagraph);
    });
    return errorMessages;
  } else if (errorMessages.length == 0) {
    proceedButton.disabled = false;
    proceedButton.backgroundColor = "#0162a6";
    error.style.display = "none";
    error.textContent = "";
    return [];
  }
};