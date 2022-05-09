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
  let userInput = (element.value != "") ? Number.parseFloat(element.value) : "";
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
  let userInput = (element.value != "") ? Number.parseFloat(element.value) : "";
    if (
      userInput < 0 ||
      userInput > 2.5 ||
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
  let userInput = (element.value != "") ? Number.parseFloat(element.value) : "";

    if (
      userInput < 0 ||
      userInput > 2500 ||
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

export const tankShapeValidation = (element, errorMessage) => {
  if (
    element.value == "Choose..." ||
    element.value == "" ||
    element.value == undefined
  ) {
    isError(true, element);
    return errorMessage;
  } else {
    isError(false, element);
    return "";
  }
};

export const customHeightValidation = (element, errorMessage, customHeightsAndVolumesArray = [], customHeights = []) => {
  let userInput = (element.value != "") ? Number.parseFloat(element.value) : "";
    if (
      userInput < 0 ||
      userInput > 2.5 ||
      userInput == undefined ||
      userInput == ""
    ) {  
      isError(true, element);
      customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter((el) => el.id != element.id);
        customHeightsAndVolumesArray.push({id: element.id, value: userInput,});
        return ([customHeightsAndVolumesArray, customHeights, errorMessage]);
    } else {
      isError(false, element);
      customHeights = customHeights.filter((height) => height.id != element.id);
      customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter((el) => el.id != element.id);
        customHeights.push([element.id, element.value]);
        return ([customHeightsAndVolumesArray, customHeights, ""]);
    }
};

export const customVolumeValidation = (element, errorMessage, customHeightsAndVolumesArray = [], customVolumes = []) => {
  let userInput = (element.value != "") ? Number.parseFloat(element.value) : "";
    if (
      userInput < 0 ||
      userInput > 2500 ||
      userInput == undefined ||
      userInput == ""
    ) {
      isError(true, element);
        customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter((el) => el.id != element.id);
        customHeightsAndVolumesArray.push({id: element.id, value: userInput,});
        return ([customHeightsAndVolumesArray, customVolumes, errorMessage]);
    } else {
      isError(false, element);
      customVolumes = customVolumes.filter((volume) => volume.id != element.id);
      customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter((el) => el.id != element.id);
          customVolumes.push([element.id, element.value]);
          return ([customHeightsAndVolumesArray, customVolumes, ""]);
    }
};

// dokončaj validacijo
// export const addedCustomFieldValidation = (errorMessage, customHeightsAndVolumesArray, customHeights, customVolumes) => {
  
//   // customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter(element => element.id != "custom-max-height2");
//   // customHeightsAndVolumesArray = customHeightsAndVolumesArray.filter(element => element.id != "custom-max-volume2");
//   console.log(customHeightsAndVolumesArray);
  
//   const newCustomHeightsAndVolumesArray = [];
//   if (customHeightsAndVolumesArray.length > 2) {
//     for (let i = 2; i < customHeightsAndVolumesArray.length; i++) {
//       let el = customHeightsAndVolumesArray[i];
//       if (customHeightsAndVolumesArray.indexOf(el) === 0 || customHeightsAndVolumesArray.indexOf(el) === 1 || customHeightsAndVolumesArray.indexOf(el) === 2) {
//         newCustomHeightsAndVolumesArray.push(el);
//       }
//     }
//   }

//   console.log(newCustomHeightsAndVolumesArray);
//   customHeightsAndVolumesArray.length = 0;
//   customHeightsAndVolumesArray.push(...newCustomHeightsAndVolumesArray);
//   console.log("New customHeightAndVolumeArray: " + customHeightsAndVolumesArray);

//   if (customHeightsAndVolumesArray.length > 2) {
//   for (let element of customHeightsAndVolumesArray) {  
//   const inputField = document.querySelector(`#${element.id}`);
//   console.log(inputField);
//   if (inputField.id.includes("height")) {
//   console.log("height");
//   } else if (inputField.id.includes("volume")) {
//     console.log("volume");
//   }
// }
//   }
//   return ([errorMessage, customHeightsAndVolumesArray, customHeights, customVolumes]);
// };

// dokončaj validacijo
export const maxFillingValidation = (element, errorMessage) => {
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

// dokončaj validacijo
export const errorMessageOutput = (element, errorMessages) => {
  if (errorMessages.length > 0) {
    let firstChild = element.firstChild;
    while (element.children.length > 0) {
      element.removeChild(firstChild);
      firstChild = element.firstChild;
    }
    element.style.display = "block";
    errorMessages.forEach((message) => {
      const errorParagraph = document.createElement("p");
      errorParagraph.textContent = message;
      console.log(errorParagraph);
      error.appendChild(errorParagraph);
    });
    return;
  } else {
    error.style.display = "none";
    error.textContent = "";
  }
};