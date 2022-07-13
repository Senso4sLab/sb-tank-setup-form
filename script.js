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

const dropdownValidation = (element, errorMessage) => {
  if (element.value == "" || element.value == undefined || element.value.length == 0) {
  isError(true, element);
  window.scroll(0, 0);
  return errorMessage;
   } else {
   isError(false, element);
   return "";
   }
};

const regularNumberValidation = (element, errorMessage) => {
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
   window.scroll(0, 0);
   return errorMessage;
  } else {
   isError(false, element);
   return "";
  }
};

const regularTextValidation = (element, errorMessage) => {
  if ((
    element.value == "" ||
    element.value == undefined
  ) && element.disabled === false) {
    isError(true, element);
    window.scroll(0, 0);
    return errorMessage;
  } else {
    isError(false, element);
    return "";
  }
};

const maxHeightValidation = (element, errorMessage) => {
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
      window.scroll(0, 0);
      return errorMessage;
     } else {
      isError(false, element);
      return "";
     }
  }
};

const maxVolumeValidation = (element, errorMessage) => {
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
      window.scroll(0, 0);
      return errorMessage;
     } else {
      isError(false, element);
      return "";
     }
  }
};

 const customHeightValidation = (element, errorMessage, customHeightsAndVolumesArray, customHeights, maxHeight) => {
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
    } else if (element.id === "custom-height2-input") {
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
    } else if (element.id != "custom-height2-input") {
      const idElements = element.id.split("-");
      const idNumber = Number.parseInt(idElements[1].split("height")[1]);
      const previousElement = document.querySelector(`#custom-height${idNumber - 1}-input`);
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

 const customVolumeValidation = (element, errorMessage, customHeightsAndVolumesArray, customVolumes, maxVolume) => {
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
    } else if (element.id === "custom-volume2-input") {
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
    } else if (element.id != "custom-volume2-input") {
      const idElements = element.id.split("-");
      const idNumber = Number.parseInt(idElements[1].split("volume")[1]);
      const previousElement = document.querySelector(`#custom-volume${idNumber - 1}-input`);
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

const enableButton = (heightElement, volumeElement) => {
  if (counter > 15) {
    return true;
  }
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

const maxFillingValidation = (element, errorMessage) => {
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

const errorMessageOutput = (element, errorMessages) => {
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

import { 
  modalContent,
  cancelAndExitModal,
  submitModalForm,
} from "./utils/modal.js";

let maxHeightCount = 0;
let currentCustomHeightInput;
let currentCustomVolumeInput;
let heightInputCount = 0;
let counter = 3;
let otherCustomMaxHeightsAndVolumes = [];
const heightsAndVolumes = [];
let errorMessages = [];
let customHeights = [];
let customVolumes = [];
let customTankShapeError = false;
let isUnitsOpen = false;
let isTankShapeOpen = false;
let isMediaOpen = false;

const error = document.querySelector("#error");
const form = document.querySelector(".tank-settings-form");
const unitsInput = document.querySelector("#units-input");
const unitsOption = document.querySelector("#units-options");
const unitsOptions = document.querySelectorAll(".units-option-element");
const mediaInput = document.querySelector("#media-input");
const mediaOption = document.querySelector("#media-options");
const mediaOptions = document.querySelectorAll(".media-option-element");
const customAdjustment = document.querySelector("#custom-density-div");
const mediumNameInput = document.querySelector("#medium-name-input");
const densityPickerInput = document.querySelector("#density-picker-input");
const maxHeightInput = document.querySelector("#max-height-input");
const maxVolumeInput = document.querySelector("#max-volume-input");
const tankShapeInput = document.querySelector("#tank-shape-input");
const tankShapeOption = document.querySelector("#tank-shape-options");
const tankShapeOptions = document.querySelectorAll(".shape-option-element");
const customTankShapeOption = document.querySelector("#custom-tank-shape");
const shapeAdjustment = document.querySelector("#custom-tank-shape-div");
const customHeightInputFields = document.querySelectorAll(".custom-height-input");
const customVolumeInputFields = document.querySelectorAll(".custom-volume-input");
const customHeight = document.querySelector("#custom-height1-input");
const customVolume = document.querySelector("#custom-volume1-input");
const customHeight2 = document.querySelector("#custom-height2-input");
const customVolume2 = document.querySelector("#custom-volume2-input");
const customMaxHeightInput = document.querySelector("#custom-max-height-input");
const customMaxVolumeInput = document.querySelector("#custom-max-volume-input");
const addAnotherButton = document.querySelector("#add-another-custom-button");
const deleteButton = document.querySelector("#delete-custom-button");
const maxFillingLimitInput = document.querySelector("#max-filling-input");
const proceedButton = document.querySelector("#proceed-button");
const modal = document.querySelector(".modal");
const modalXButton = document.querySelector("#x-button");
const modalOkButton = document.querySelector("#ok-button");
const modalCloseButton = document.querySelector("#close-button");
const modalCancelButton = document.querySelector("#cancel-button");
const settingsListDiv = document.querySelector(".inner-modal-settings-list");

class Heightinput {
  constructor(props) {
    this.inputElement = document.createElement("input");
    this.inputElement.type = "text";
    this.inputElement.inputMode = "decimal";
    this.inputElement.classList.add("input", "custom-field-input", "custom-height-input");
    this.inputElement.id = props.id;
    this.inputElement.name = props.id;
    this.inputElement.value="";
    this.inputElement.step="0.01";
    this.inputElement.placeholder="Insert value...";
  }

  addToParent() {
    const customHeightsDiv = document.querySelector("#custom-height-input-fields-div");
    customHeightsDiv.appendChild(this.inputElement);
  }
}

class Volumeinput {
  constructor(id) {
    this.inputElement = document.createElement("input");
    this.inputElement.type = "text";
    this.inputElement.inputMode = "decimal";
    this.inputElement.classList.add("input", "custom-field-input", "custom-volume-input");
    this.inputElement.id = id;
    this.inputElement.name = id;
    this.inputElement.value="";
    this.inputElement.step="1";
    this.inputElement.placeholder="Insert value...";
  }

  addToParent() {
    const customVolumesDiv = document.querySelector("#custom-volume-input-fields-div");
    customVolumesDiv.appendChild(this.inputElement);
  }
}

const unitsUserInputValidation = () => {
  errorMessages = errorMessages.filter(message => message != "Measuring unit is required.");
  errorMessages.push(dropdownValidation(unitsInput, "Measuring unit is required."));
  checkForErrorMessages();
};

const densityUserInputValidation = () => {
  errorMessages = errorMessages.filter(message => message != "Medium type is required.");
  errorMessages.push(dropdownValidation(mediaInput, "Medium type is required."));
  checkForErrorMessages();
};

const mediumNameUserInputValidation = () => {
  if (mediaInput.value != "Custom") {
    errorMessages = errorMessages.filter(message => message != "Medium name is required.");
    errorMessages = errorMessages.filter(message => message != "Invalid density.");
    checkForErrorMessages();
  }
  errorMessages = errorMessages.filter(message => message != "Medium name is required.");
  errorMessages.push(regularTextValidation(mediumNameInput, "Medium name is required."));
  checkForErrorMessages();
};

const mediumDensityUserInputValidation = () => {
  if (mediaInput.value != "Custom") {
    errorMessages = errorMessages.filter(message => message != "Medium name is required.");
    errorMessages = errorMessages.filter(message => message != "Invalid density.");
    checkForErrorMessages();
  }
  errorMessages = errorMessages.filter(message => message != "Invalid density.");
  errorMessages.push(regularNumberValidation(densityPickerInput, "Invalid density."));
  checkForErrorMessages();
};

const maxHeightUserInputValidation = () => {
  errorMessages = errorMessages.filter(message => message != "Invalid tank height.");
  errorMessages.push(maxHeightValidation (maxHeightInput, "Invalid tank height."));
  checkForErrorMessages();
};

const maxVolumeUserInputValidation = () => {
  errorMessages = errorMessages.filter(message => message != "Invalid tank volume.");
  errorMessages.push(maxVolumeValidation(maxVolumeInput, "Invalid tank volume."));
  checkForErrorMessages();
};

const tankShapeUserInputValidation = () => {
  errorMessages = errorMessages.filter(message => message != "Tank shape is required.");
  errorMessages.push(dropdownValidation(tankShapeInput, "Tank shape is required."));
  checkForErrorMessages();
};

const customAddedHeightUserInputValidation = (element) => {
  errorMessages = errorMessages.filter(message => message != "Invalid height-volume pair");
  const chvArray = customHeightValidation(element, "Invalid height-volume pair", otherCustomMaxHeightsAndVolumes, customHeights, maxHeightInput);
  otherCustomMaxHeightsAndVolumes = [...chvArray[0]];
  customHeights = [...chvArray[1]];
  errorMessages.push(chvArray[2]);
  checkForErrorMessages();
};

const customAddedVolumeUserInputValidation = (element) => {
  errorMessages = errorMessages.filter(message => message != "Invalid height-volume pair");
  const cvvArray = customVolumeValidation(element, "Invalid height-volume pair", otherCustomMaxHeightsAndVolumes, customVolumes, maxVolumeInput);
  otherCustomMaxHeightsAndVolumes = [...cvvArray[0]];
  customVolumes = [...cvvArray[1]];
  errorMessages.push(cvvArray[2]);
  checkForErrorMessages();
};

const maxFillingUserInputValidation = () => {
  errorMessages = errorMessages.filter(message => message != "Invalid filling limit.");
  errorMessages.push(maxFillingValidation(maxFillingLimitInput, "Invalid filling limit."));
  checkForErrorMessages();
};

const checkForErrorMessages = () => {
 errorMessages = errorMessageOutput(error, errorMessages);
 errorMessages = errorMessages.filter(message => message != "");
 errorMessages = errorMessages.filter(message => message != undefined);
 if (errorMessages.length == 0) {
  let anyEmptyHeightField = false;
  let anyEmptyVolumeField = false;
  customHeightInputFields.forEach(el => {
    if (el.disabled == false && (el.value == "" || el.value == undefined)) {
      anyEmptyHeightField = true;
      return;
    }
  });
  customVolumeInputFields.forEach(el => {
    if (el.disabled == false && (el.value == "" || el.value == undefined)) {
      anyEmptyVolumeField = true;
      return;
    }
  });
  if(anyEmptyHeightField === false || anyEmptyVolumeField === false) {
    proceedButton.disabled = false;
    proceedButton.style.backgroundColor = "#0162a6";
  }
 } else {
  proceedButton.disabled = true;
  proceedButton.style.backgroundColor = "gray";
 }
};

const isCustomTankShape = () => {
  shapeAdjustment.style.display = "flex";
  customHeight2.disabled = false;
  customHeight2.value = "";
  customVolume2.disabled = false;
  customVolume2.value = "";
  addAnotherButton.style.backgroundColor = "gray";
  addAnotherButton.disabled = true;
  deleteButton.style.backgroundColor = "gray";
  deleteButton.disabled = true;
  otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(
    (element) => element.id != customHeight2.id
  );
  otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(
    (element) => element.id != customVolume2.id
  );
  otherCustomMaxHeightsAndVolumes.push(
    { id: customHeight2.id, value: customHeight2.value },
    { id: customVolume2.id, value: customVolume2.value }
  );
};

const notCustomTankShape = () => {
  while (counter > 3) {
    document.querySelector(`#custom-height${counter - 1}-input`).style.display = "none";
    document.querySelector(`#custom-height${counter - 1}-input`).value = "";
    document.querySelector(`#custom-height${counter - 1}-input`).style.borderColor = "black";
    document.querySelector(`#custom-height${counter - 1}-input`).disabled = true;
    document.querySelector(`#custom-volume${counter - 1}-input`).style.display = "none";
    document.querySelector(`#custom-volume${counter - 1}-input`).value = "";
    document.querySelector(`#custom-volume${counter - 1}-input`).style.borderColor = "black";
    document.querySelector(`#custom-volume${counter - 1}-input`).disabled = true;
    counter--;
  }
  shapeAdjustment.style.display = "none";
  customHeight.disabled = true;
  customVolume.disabled = true;
  customHeight2.disabled = true;
  customHeight2.value = "";
  customVolume2.disabled = true;
  customVolume2.value = "";
  addAnotherButton.disabled = true;
  addAnotherButton.style.backgroundColor = "gray";
  deleteButton.disabled = true;
  deleteButton.style.backgroundColor = "gray";
  customHeight2.style.borderColor = "black";
    customVolume2.style.borderColor = "black";
      errorMessages = errorMessages.filter(message => message != "Invalid height-volume pair");
      otherCustomMaxHeightsAndVolumes.length = 0;
      customHeights.length = 0;
      customVolumes.length = 0;
};

const customTankShape = async (id) => {
  const trimmedId = id.trim();
  tankShapeInput.value = trimmedId;
  if (maxHeightInput.value == "" || maxHeightInput.value == undefined || maxHeightInput.value == "0") {
    notCustomTankShape();
    return;
  } else if (maxVolumeInput.value == "" || maxVolumeInput.value == undefined || maxVolumeInput.value == "0") {
   notCustomTankShape();
   return;
  }
  if (trimmedId == "Custom") {
    isCustomTankShape();
    proceedButton.disabled = true;
    proceedButton.style.backgroundColor = "gray";
    return;
  } else {
    notCustomTankShape();
    return;
  }
};

unitsOptions.forEach((option) => {
  option.addEventListener("click", () => {
    getUnitsIntoInput(option.textContent);
  });
  option.addEventListener("click", unitsUserInputValidation);
  option.addEventListener("click", () => {
    if (customHeights.length != customVolumes.length) {
      proceedButton.style.backgroundColor = "gray";
      proceedButton.disabled = true;
    }
  });
});

mediaOptions.forEach((option) => {
  option.addEventListener("click", () => {
    customDensity(option.textContent);
  });
  option.addEventListener("click", densityUserInputValidation);
  option.addEventListener("click", () => {
    if (customHeights.length != customVolumes.length) {
      proceedButton.style.backgroundColor = "gray";
      proceedButton.disabled = true;
    }
  });
});

tankShapeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    customTankShape(option.textContent);
  });
  option.addEventListener("click", tankShapeUserInputValidation);
  option.addEventListener("click", () => {
    if (customHeights.length != customVolumes.length) {
      proceedButton.style.backgroundColor = "gray";
      proceedButton.disabled = true;
    }
  });
});

const toggleUnitsInput = (e) => {
  if (!isUnitsOpen && e.target.id === "units-input") {
    unitsOption.style.display = "block";
    isUnitsOpen = true;
  } else {
    unitsOption.style.display = "none";
    isUnitsOpen = false;
  }
};

const toggleMediaInput = (e) => {
  if (!isMediaOpen && e.target.id === "media-input") {
    mediaOption.style.display = "block";
    isMediaOpen = true;
  } else {
    mediaOption.style.display = "none";
    isMediaOpen = false;
  }
};

const toggleTankShapeInput = (e) => {
  if (!isTankShapeOpen && e.target.id === "tank-shape-input" && e.target.disabled == false) {
    tankShapeOption.style.display = "block";
    isTankShapeOpen = true;
  } else {
    tankShapeOption.style.display = "none";
    isTankShapeOpen = false;
  }
};

customHeightInputFields.forEach(heightInput => {
  const id = heightInput.id;
  const volumeId = id.replace("height", "volume");
   if (heightInput.id === "custom-height1-input" || heightInput.id === "custom-max-height-input") {
    return;
   } else {
    const volumeInput = document.querySelector(`#${volumeId}`);

    heightInput.addEventListener("input", (event) => {
      heightInputCount = 0;
      if (heightInput.value.length > 2) {
        if (heightInput.value.includes(".") == false) {
          heightInputCount = 0;
        } else {
          heightInputCount = 1;
        }
      }
      let length = heightInput.value.length;
      if (event.data === "-" || event.data === " ") {
        heightInput.value = heightInput.value.replace(event.data, "");
      } else if (event.data === ",") {
        if (heightInput.value[0] === ",") {
          heightInput.value = heightInput.value.replace(heightInput.value[0], "0.");
          heightInputCount++;
          if (heightInputCount > 1) {
            heightInput.value = heightInput.value.slice(0, length - 1);
            heightInputCount--;
          }
          return;
        } else {
          heightInput.value = heightInput.value.replace(event.data, ".");
          heightInputCount++;
          if (heightInputCount > 1) {
            heightInput.value = heightInput.value.slice(0, length - 1);
            heightInputCount--;
            return;
          } else {
            for (let char of heightInput.value) {
              if (char === ".") {
                if (heightInputCount > 1) {
                  heightInput.value = heightInput.value.slice(0, length - 1);
                  heightInputCount--;
                }
              }
            }
          }
          return;
        }
    } else if (event.data === ".") {
        if (heightInput.value[0] === ".") {
          heightInput.value = `0${heightInput.value}`;
          heightInputCount++;
          if (heightInputCount > 1) {
            heightInput.value = heightInput.value.slice(0, length - 1);
            heightInputCount--;
          }
          return;
        } else {
          heightInputCount++;
          if (heightInputCount > 1) {
            heightInput.value = heightInput.value.slice(0, length - 1);
            heightInputCount--;
          } else {
            for (let char of heightInput.value) {
              if (char == ".") {
                if (heightInputCount > 1) {
                  heightInput.value = heightInput.value.slice(0, length - 1);
                  heightInputCount--;
                }
              }
            }
          }
          return;
        } 
      } else if (event.data == null) {
        if (heightInput.value.includes(".") === false && heightInput.value.includes(",") === false) {
          heightInputCount = 0;
          customAddedHeightUserInputValidation(heightInput);
        }
      } else if (isNaN(event.data)) {
        heightInput.value = heightInput.value.replace(event.data, "");
      } 
      });

      volumeInput.addEventListener("input", (event) => {
      if (event.data === "." || event.data === "-" || event.data === "," || event.data === " ") {
        volumeInput.value = volumeInput.value.replace(event.data, "");
      } else if (event.data == null) {
        customAddedVolumeUserInputValidation(volumeInput);
      } else if (isNaN(event.data)) {
        volumeInput.value = volumeInput.value.replace(event.data, "");
      } else if (event.data == "0") {
        if (volumeInput.value.length === 1) {
          volumeInput.value = volumeInput.value.replace(event.data, "");
        } else if (volumeInput.value[0] == event.data) {
          volumeInput.value = volumeInput.value.replace(event.data, "");
        }
      }
      });

      volumeInput.addEventListener("input", () => customAddedVolumeUserInputValidation(volumeInput));

      heightInput.addEventListener("input", (event) => {
        const stringNum = String(event.target.value);
    if (stringNum.includes(".")) {
      let numberOfDecimals = stringNum.split(".")[1].length;
      if (stringNum[0] === ".") {
        heightInput.value = `0${heightInput.value}`;
      }
      if (stringNum[0] == "0" && stringNum[1] != ".") {
        heightInput.value = heightInput.value.replace("0", "");
      }
      if (numberOfDecimals > 2) {
        heightInput.value = heightInput.value.slice(0, heightInput.value.length - 1);
      }
    }
    customAddedHeightUserInputValidation(heightInput);
    });

    heightInput.addEventListener("input", () => {
      if (heightInput.style.borderColor == "red") {
        errorMessages = errorMessages.filter(message => message != "Invalid height-volume pair");
        errorMessages.push("Invalid height-volume pair");
      checkForErrorMessages();
      } else {
        customAddedHeightUserInputValidation(heightInput);
      }
    });
    
    heightInput.addEventListener("input", () => {
      if (heightInput.style.borderColor == "red" || volumeInput.style.borderColor == "red") {
        errorMessages = errorMessages.filter(
          (message) => message != "Invalid height-volume pair"
        );
        errorMessages.push("Invalid height-volume pair");
      checkForErrorMessages();
      addAnotherButton.disabled = true;
        addAnotherButton.style.backgroundColor = "gray";
        proceedButton.disabled = true;
        proceedButton.style.backgroundColor = "gray";
      }
    });
    
    heightInput.addEventListener("input", () => {
      if (volumeInput.value == undefined || volumeInput.value == "") {
        proceedButton.style.backgroundColor = "gray";
        proceedButton.disabled = true;
      }
    });
    
    heightInput.addEventListener("input", () => {
      customAddedHeightUserInputValidation(heightInput);
      if (errorMessages.includes("Invalid height-volume pair")) {
        addAnotherButton.disabled = true;
        addAnotherButton.style.backgroundColor = "gray";
        proceedButton.disabled = true;
        proceedButton.style.backgroundColor = "gray";
      } else {
        addAnotherButton.disabled = enableButton(heightInput, volumeInput);
      if (!addAnotherButton.disabled) {
        addAnotherButton.style.backgroundColor = "#0162a6";
      } else {
        addAnotherButton.style.backgroundColor = "gray";
        if (counter > 15) {
        proceedButton.disabled = false;
        proceedButton.style.backgroundColor = "#0162a6";
        return;
        }
        proceedButton.disabled = true;
        proceedButton.style.backgroundColor = "gray";
      }
      }
    });
    
    heightInput.addEventListener("input", () => {
      if (heightInput.style.borderColor == "red" || volumeInput.style.borderColor == "red") {
        errorMessages = errorMessages.filter(
          (message) => message != "Invalid height-volume pair"
        );
        errorMessages.push("Invalid height-volume pair");
      checkForErrorMessages();
      addAnotherButton.disabled = true;
        addAnotherButton.style.backgroundColor = "gray";
        proceedButton.disabled = true;
        proceedButton.style.backgroundColor = "gray";
      }
    });

    heightInput.addEventListener("blur", () => {
      if (heightInput.style.borderColor === "red") {
        window.scroll(0, 0);
      }
    });

    heightInput.addEventListener("focus", () => {
      if (volumeInput.style.borderColor === "red") {
        heightInput.blur();
        window.scroll(0, 0);
      }
    });

    volumeInput.addEventListener("input", () => {
      if (heightInput.value == undefined || heightInput.value == "") {
        proceedButton.style.backgroundColor = "gray";
        proceedButton.disabled = true;
      }
    });
    
    volumeInput.addEventListener("input", () => {
      customAddedVolumeUserInputValidation(volumeInput);
      if (errorMessages.includes("Invalid height-volume pair")) {
        addAnotherButton.disabled = true;
        addAnotherButton.style.backgroundColor = "gray";
        proceedButton.disabled = true;
        proceedButton.style.backgroundColor = "gray";
      } else {
        addAnotherButton.disabled = enableButton(heightInput, volumeInput);
      if (!addAnotherButton.disabled) {
        addAnotherButton.style.backgroundColor = "#0162a6";
      } else {
        addAnotherButton.style.backgroundColor = "gray";
        if (counter > 15) {
          proceedButton.disabled = false;
          proceedButton.style.backgroundColor = "#0162a6";
          return;
          }
        proceedButton.disabled = true;
        proceedButton.style.backgroundColor = "gray";
      }
      }
    });
    
    volumeInput.addEventListener("input", () => {
      if (heightInput.style.borderColor == "red" || volumeInput.style.borderColor == "red") {
        errorMessages = errorMessages.filter(
          (message) => message != "Invalid height-volume pair"
        );
        errorMessages.push("Invalid height-volume pair");
        checkForErrorMessages();
        addAnotherButton.disabled = true;
        addAnotherButton.style.backgroundColor = "gray";
        proceedButton.disabled = true;
        proceedButton.style.backgroundColor = "gray";
      }
      });

      volumeInput.addEventListener("blur", () => {
        if (volumeInput.style.borderColor === "red") {
          window.scroll(0, 0);
        }
      });

      volumeInput.addEventListener("focus", () => {
        if (heightInput.style.borderColor === "red") {
          volumeInput.blur();
          window.scroll(0, 0);
        }
      });
    
      otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(
        (element) => element.id != heightInput.id
      );
      otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(
        (element) => element.id != volumeInput.id
      );
      otherCustomMaxHeightsAndVolumes.push(
        { id: heightInput.id, value: heightInput.value },
        { id: volumeInput.id, value: volumeInput.value }
      );
   }
});

const saveIntoCustomMaxHeight = (e) => {
  e.preventDefault();
  if (e.target.value.endsWith(".")) {
    customMaxHeightInput.value = e.target.value.slice(0, - 1);
  } else {
    customMaxHeightInput.value = e.target.value;
    const stringNum = String(e.target.value);
if (stringNum.includes(".")) {
let numberOfDecimals = stringNum.split(".")[1].length;
if (numberOfDecimals > 2) {
  customMaxHeightInput.value = customMaxHeightInput.value.slice(0, customMaxHeightInput.value.length - 1);
      }
    }
  } 
};

const saveIntoCustomMaxVolume = (e) => {
  e.preventDefault();
  customMaxVolumeInput.value = e.target.value;
};

const addReadonly = () => {
  tankShapeInput.setAttribute("readonly", "true");
  mediaInput.setAttribute("readonly", "true");
  unitsInput.setAttribute("readonly", "true");
};

const getUnitsIntoInput = (id) => {
  unitsInput.value = id.trim();
};

const customDensity = (id) => {
  if (id.trim() === "Custom") {
    proceedButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
    customAdjustment.style.display = "flex";
    customAdjustment.style.flexFlow = "row wrap";
    customAdjustment.style.justifyContent = "center";
    customAdjustment.style.alignItems = "center";
    mediumNameInput.style.display = "block";
    densityPickerInput.style.display = "block";
    mediumNameInput.disabled = false;
    densityPickerInput.disabled = false;
    mediumNameInput.value = "";
    densityPickerInput.value = "";
  } else {
    mediumNameInput.value = "";
    densityPickerInput.value = "";
    customAdjustment.style.display = "none";
    mediumNameInput.disabled = true;
    densityPickerInput.disabled = true;
    mediumNameInput.style.borderColor = "black";
    densityPickerInput.style.borderColor = "black";
    errorMessages = errorMessages.filter(message => message != "Medium name is required.");
    errorMessages = errorMessages.filter(message => message != "Invalid density.");
  }
  mediaInput.value = id.trim();
};



const addAnotherCustomTankShapeHeightVolumePair = () => {

    proceedButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;

    addAnotherButton.disabled = true;
    addAnotherButton.style.backgroundColor = "gray";

    deleteButton.disabled = false;
    deleteButton.style.backgroundColor = "#0162a6";

    const prevHeightInput = document.querySelector(`#custom-height${counter - 1}-input`);
    const prevVolumeInput = document.querySelector(`#custom-volume${counter - 1}-input`);

    const heightInput = document.querySelector(`#custom-height${counter}-input`);
    const volumeInput = document.querySelector(`#custom-volume${counter}-input`);

    currentCustomHeightInput = heightInput;
    currentCustomVolumeInput = volumeInput;

    prevHeightInput.disabled = true;
    prevVolumeInput.disabled = true;

    heightInput.style.display = "block";
    volumeInput.style.display = "block";

    heightInput.disabled = false;
    volumeInput.disabled = false;

    counter++;
};

const deleteCustomTankShapeHeightVolumePair = (heightInput, volumeInput) => {
  customHeights = customHeights.filter(height => height[0] != `custom-height${counter - 1}-input`);
  customVolumes = customVolumes.filter(volume => volume[0] != `custom-volume${counter - 1}-input`);
  const prevHeightInput = document.querySelector(`#custom-height${counter - 2}-input`);
  const prevVolumeInput = document.querySelector(`#custom-volume${counter - 2}-input`);
  addAnotherButton.disabled = false;
  addAnotherButton.style.backgroundColor = "#0162a6";

  if(heightInput.style.borderColor === "red") {
    heightInput.style.borderColor = "black";
    errorMessages = errorMessages.filter(message => message != "Invalid height-volume pair");
    customAddedHeightUserInputValidation(prevHeightInput);
  } else if(volumeInput.style.borderColor === "red") {
    volumeInput.style.borderColor = "black";
    errorMessages = errorMessages.filter(message => message != "Invalid height-volume pair");
    customAddedVolumeUserInputValidation(prevVolumeInput);
  }

  heightInput.value = "";
  heightInput.style.display = "none";
  heightInput.disabled = true;
  prevHeightInput.disabled = false;

  volumeInput.value = "";
  volumeInput.style.display = "none";
  volumeInput.disabled = true;
  prevVolumeInput.disabled = false;

  currentCustomHeightInput = prevHeightInput;
  currentCustomVolumeInput = prevVolumeInput;

  counter--;
  if (counter === 3) {
    deleteButton.disabled = true;
    deleteButton.style.backgroundColor = "gray";
  }
  proceedButton.disabled = false;
  proceedButton.style.backgroundColor = "#0162a6";
};

const submitSettingsForm = (e) => {
  e.preventDefault();
  if (maxHeightInput.value.endsWith(".")) {
    maxHeightInput.value = maxHeightInput.value.slice(0, - 1);
  }
  customHeights.forEach(element => {
    if (element[1].endsWith(".")) {
      element[1] = element[1].slice(0, - 1);
    }
  });
  errorMessages.length = 0;
  error.textContent = "";
  if (
    otherCustomMaxHeightsAndVolumes.length > 0 &&
    otherCustomMaxHeightsAndVolumes.length % 2 != 0
  ) {
    otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.slice(0, otherCustomMaxHeightsAndVolumes.length - 1);
  }

  errorMessages.push(dropdownValidation(unitsInput, "Measuring unit is required."));
  errorMessages.push(dropdownValidation(mediaInput, "Medium type is required."));
  errorMessages.push(regularTextValidation(mediumNameInput, "Medium name is required."));
  errorMessages.push(regularNumberValidation(densityPickerInput, "Invalid density."));
  errorMessages.push(maxHeightValidation (maxHeightInput, "Invalid tank height."));
  errorMessages.push(maxVolumeValidation (maxVolumeInput, "Invalid tank volume."));
  errorMessages.push(dropdownValidation(tankShapeInput, "Tank shape is required."));

  if (otherCustomMaxHeightsAndVolumes.length > 0) {
    errorMessages = errorMessages.filter(
      (message) => message != "Invalid height-volume pair"
    );
    customTankShapeError = false;
    otherCustomMaxHeightsAndVolumes.forEach((element) => {
      const inputField = document.querySelector(`#${element.id}`);
      if (inputField.disabled === true) {
        inputField.style.borderColor = "black";
        return;
      }
      if (element.id.includes("height")) {
        if (element.value == "" || element.value == undefined || element.value > 4.7 || element.value < 0) {
          customTankShapeError = true;
          inputField.style.borderColor = "red";
            error.style.display = "block";
            error.style.color = "red";
            error.style.fontWeight = "900";
        } else {
          customHeights = customHeights.filter(height => height[0] != inputField.id);
          customHeights.push([inputField.id, inputField.value]);
          inputField.style.borderColor = "black";
        }
      } else if (element.id.includes("volume")) {
        if (element.value == "" || element.value == undefined || element.value < 0) {
          customTankShapeError = true;
          inputField.style.borderColor = "red";
            error.style.display = "block";
            error.style.color = "red";
            error.style.fontWeight = "900";
        } else {
          customVolumes = customVolumes.filter((volume) => volume[0] != inputField.id);
          customVolumes.push([inputField.id, inputField.value]);
          inputField.style.borderColor = "black";
        }
      }
    });
    if (customTankShapeError) {
      errorMessages.push("Invalid height-volume pair");
      error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
    }
  }

  errorMessages.push(maxFillingValidation(maxFillingLimitInput, "Invalid filling limit."));
  errorMessages = errorMessages.filter(message => message != "");



  if (errorMessages.length > 0) {
    while (error.children.length > 0) {
      error.removeChild(error.lastElementChild);
      firstChild = error.firstChild;
    }
    window.scroll(0, 0);
    e.preventDefault();
    proceedButton.disabled = true;
    proceedButton.style.backgroundColor = "gray";
    error.style.display = "block";
    errorMessages.forEach((message) => {
      const errorParagraph = document.createElement("p");
      errorParagraph.textContent = message;
      error.appendChild(errorParagraph);
    });
    return;
  } else {
    proceedButton.disabled = false;
    proceedButton.style.backgroundColor = "#0162a6";
  }

  modalContent(
    modal,
    settingsListDiv,
    unitsInput, 
    mediaInput, 
    mediumNameInput, 
    densityPickerInput, 
    maxHeightInput, 
    maxVolumeInput, 
    tankShapeInput, 
    customHeights, 
    customVolumes, 
    heightsAndVolumes, 
    maxFillingLimitInput);
};

window.addEventListener("click", toggleUnitsInput);
window.addEventListener("click", toggleMediaInput);
window.addEventListener("click", toggleTankShapeInput);
mediumNameInput.addEventListener("input", mediumNameUserInputValidation);
mediumNameInput.addEventListener("input", () => {
  if(densityPickerInput.value == undefined || densityPickerInput.value == "") {
    proceedButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
  }
});

mediumNameInput.addEventListener("input", () => {
  if (customHeights.length != customVolumes.length) {
    proceedButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
  }
});

densityPickerInput.addEventListener("input", (event) => {
  if (event.data === "." || event.data === "-" || event.data === "," || event.data === " ") {
    densityPickerInput.value = densityPickerInput.value.replace(event.data, "");
  } else if (isNaN(event.data)) {
    densityPickerInput.value = densityPickerInput.value.replace(event.data, "");
  }
});
 densityPickerInput.addEventListener("input", mediumDensityUserInputValidation);
 densityPickerInput.addEventListener("input", () => {
  if(mediumNameInput.value == undefined || mediumNameInput.value == "") {
    proceedButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
  }
});

densityPickerInput.addEventListener("input", () => {
  if (customHeights.length != customVolumes.length) {
    proceedButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
  }
});

maxHeightInput.addEventListener("input", (event) => {
  let length = maxHeightInput.value.length;
  if (event.data === "-" || event.data === " ") {
    maxHeightInput.value = maxHeightInput.value.replace(event.data, "");
  } else if(event.data === ",") {
    if (maxHeightInput.value[0] === ",") {
      maxHeightInput.value = maxHeightInput.value.replace(maxHeightInput.value[0], "0.");
      maxHeightCount++;
      return;
    } else {
      maxHeightInput.value = maxHeightInput.value.replace(event.data, ".");
      maxHeightCount++;
      if (maxHeightCount > 1) {
        maxHeightInput.value = maxHeightInput.value.slice(0, length - 1);
        maxHeightCount--;
        return;
      } else {
        for (let char of maxHeightInput.value) {
          if (char === ".") {
            if (maxHeightCount > 1) {
              maxHeightInput.value = maxHeightInput.value.slice(0, length - 1);
              maxHeightCount--;
            }
          }
        }
      }
      return;
    }
} else if (event.data === ".") {
    if (maxHeightInput.value[0] === ".") {
      maxHeightInput.value = `0${maxHeightInput.value}`;
      maxHeightCount++;
      if (maxHeightCount > 1) {
        maxHeightInput.value = maxHeightInput.value.slice(0, length - 1);
        maxHeightCount--;
      }
      return;
    } else {
      maxHeightCount++;
      if (maxHeightCount > 1) {
        maxHeightInput.value = maxHeightInput.value.slice(0, length - 1);
        maxHeightCount--;
      } else {
        for (let char of maxHeightInput.value) {
          if (char == ".") {
            if (maxHeightCount > 1) {
              maxHeightInput.value = maxHeightInput.value.slice(0, length - 1);
              maxHeightCount--;
            }
          }
        }
      }
      return;
    } 
  } else if (event.data == null) {
    if (maxHeightInput.value.includes(".") == false && maxHeightInput.value.includes(",") == false) {
      maxHeightCount = 0;
      maxHeightUserInputValidation();
    }
  } else if (isNaN(event.data)) {
    maxHeightInput.value = maxHeightInput.value.replace(event.data, "");
  } 
});
maxHeightInput.addEventListener("input", saveIntoCustomMaxHeight);
maxHeightInput.addEventListener("input", (event) => {
  const stringNum = String(event.target.value);
if (stringNum.includes(".")) {
let numberOfDecimals = stringNum.split(".")[1].length;
if (stringNum[0] === ".") {
  maxHeightInput.value = `0${maxHeightInput.value}`;
}
 if (stringNum[0] == "0") {
  if (stringNum[1] != ".") {
    maxHeightInput.value = maxHeightInput.value.replace("0", "");
  }
}

if (numberOfDecimals > 2) {
  maxHeightInput.value = maxHeightInput.value.slice(0, maxHeightInput.value.length - 1);
}
}
});
maxHeightInput.addEventListener("input", maxHeightUserInputValidation);
maxHeightInput.addEventListener("input", () => {
  if(error.textContent.includes("Invalid tank height.") || error.textContent.includes("There can be only two decimals.")) {
    maxHeightInput.style.borderColor = "red";
    customMaxHeightInput.value = "";
    tankShapeInput.disabled = true;
  }
});

maxHeightInput.addEventListener("input", () => {
  if (customHeights.length != customVolumes.length) {
    proceedButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
  }
});

maxHeightInput.addEventListener("input", () => {
  if ((maxHeightInput.value == "" || maxHeightInput.value == undefined || maxHeightInput.value == "0" || maxHeightInput.style.borderColor == "red") || (maxVolumeInput.value == "" || maxVolumeInput.value == undefined || maxVolumeInput.value == "0") || (tankShapeInput.value == "" || tankShapeInput.value == undefined)) {
    notCustomTankShape();
    tankShapeInput.value = "";
    tankShapeInput.disabled = true;
    return;
  } 
  else {
    tankShapeInput.disabled = false;
    customTankShape(tankShapeInput.value);
    return;
  }
});

maxHeightInput.addEventListener("input", () => {
  const maxHeightNumber = parseFloat(maxHeightInput.value);
  const maxVolumeNumber = parseInt(maxVolumeInput.value);
  if((maxHeightNumber > 0) && maxHeightNumber <= 4.7) {
    if (maxVolumeNumber > 0) {
      tankShapeInput.disabled = false;
      tankShapeInput.value = "";
      notCustomTankShape();
    } else {
      tankShapeInput.disabled = true;
    }
  } 
});

maxVolumeInput.addEventListener("input", (event) => {
  if (event.data === "." || event.data === "-" || event.data === "," || event.data === " ") {
    maxVolumeInput.value = maxVolumeInput.value.replace(event.data, "");
  } else if (isNaN(event.data)) {
    maxVolumeInput.value = maxVolumeInput.value.replace(event.data, "");
  } else if (event.data == "0") {
    if (maxVolumeInput.value.length === 1) {
      maxVolumeInput.value = maxVolumeInput.value.replace(event.data, "");
    } else if (maxVolumeInput.value[0] == event.data) {
      maxVolumeInput.value = maxVolumeInput.value.replace(event.data, "");
    }
  } 
});
maxVolumeInput.addEventListener("input", maxVolumeUserInputValidation);
maxVolumeInput.addEventListener("input", saveIntoCustomMaxVolume);
maxVolumeInput.addEventListener("input", () => {
  if (customHeights.length != customVolumes.length) {
    proceedButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
  }
});
maxVolumeInput.addEventListener("input", () => {
  if ((maxVolumeInput.value == "" || maxVolumeInput.value == undefined || maxVolumeInput.value == "0" || maxVolumeInput.style.borderColor == "red") || (maxHeightInput.value == "" || maxHeightInput.value == undefined || maxHeightInput.value == "0" || maxHeightInput.style.borderColor == "red") || (tankShapeInput.value == "" || tankShapeInput.value == undefined)) {
    notCustomTankShape();
    tankShapeInput.disabled = true;
    return;
  } 
  else {
    tankShapeInput.disabled = false;
    customTankShape(tankShapeInput.value);
    return;
  }
});

maxVolumeInput.addEventListener("input", () => {
  const maxHeightNumber = parseFloat(maxHeightInput.value);
  const maxVolumeNumber = parseInt(maxVolumeInput.value);
  if((maxHeightNumber > 0) && maxHeightNumber <= 4.7) {
    if (maxVolumeNumber > 0) {
      tankShapeInput.disabled = false;
      tankShapeInput.value = "";
      notCustomTankShape();
    } else {
      tankShapeInput.disabled = true;
    }
  } 
});

unitsInput.addEventListener("focus", addReadonly);
mediaInput.addEventListener("focus", addReadonly);
tankShapeInput.addEventListener("focus", addReadonly);
customTankShapeOption.addEventListener("click", () => {
    proceedButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
});
addAnotherButton.addEventListener("click", addAnotherCustomTankShapeHeightVolumePair);
deleteButton.addEventListener("click", () => deleteCustomTankShapeHeightVolumePair(currentCustomHeightInput, currentCustomVolumeInput));
maxFillingLimitInput.addEventListener("input", (event) => {
  if (event.data === "." || event.data === "-" || event.data === "," || event.data === " ") {
    maxFillingLimitInput.value = maxFillingLimitInput.value.replace(event.data, "");
  } else if (isNaN(event.data)) {
    maxFillingLimitInput.value = maxFillingLimitInput.value.replace(event.data, "");
  } else if (maxFillingLimitInput.value.length > 2) {
    if (maxFillingLimitInput.value === "100") {
      return;
    } else {
      const index = maxFillingLimitInput.value.lastIndexOf(event.data);
      maxFillingLimitInput.value = maxFillingLimitInput.value.substring(0, index) + "" + maxFillingLimitInput.value.substring(index + 1);   
    }
  }
  if (maxFillingLimitInput.value[0] == "0") {
    maxFillingLimitInput.value = maxFillingLimitInput.value.replace(event.data, "");
  }
});

maxFillingLimitInput.addEventListener("input", () => {
  maxFillingUserInputValidation();
  if(maxFillingLimitInput.style.borderColor == "red" && errorMessages.includes("Invalid filling limit.")) {
    window.scroll(0, 0);
  }
});
form.addEventListener("submit", submitSettingsForm);
modalXButton.addEventListener("click", (e) => cancelAndExitModal(e, modal, settingsListDiv));
modalCancelButton.addEventListener("click", (e) => cancelAndExitModal(e, modal, settingsListDiv));
modalCloseButton.addEventListener("click", (e) => cancelAndExitModal(e, modal, settingsListDiv));
modalOkButton.addEventListener("click", (e) => submitModalForm(e));