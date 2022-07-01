import {
  //limitDecimals,
  dropdownValidation, 
  regularNumberValidation, 
  maxHeightValidation, 
  maxVolumeValidation, 
  regularTextValidation,
  customHeightValidation, 
  customVolumeValidation,
  enableButton, 
  maxFillingValidation,
  errorMessageOutput,
} from './utils/inputValidation.js';

import { 
  modalContent,
  cancelAndExitModal,
  submitModalForm,
} from "./utils/modal.js";

let maxHeightCount = 0;
let customMaxHeightCount = 0;
let customMaxHeight2Count = 0;
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

const pageTitle = document.querySelector(".h1-font");
const error = document.querySelector("#error");
const form = document.querySelector(".tank-settings-form");
const unitsOption = document.querySelector("#units-options");
const mediaOption = document.querySelector("#media-options");
const tankShapeOption = document.querySelector("#tank-shape-options");
const unitsOptions = document.querySelectorAll(".units-option-element");
const mediaOptions = document.querySelectorAll(".media-option-element");
const tankShapeOptions = document.querySelectorAll(".shape-option-element");
const shapeAdjustment = document.querySelector(".custom-tank-shape-adjustment");
const shapeAdjustmentInnerMax = document.querySelector(
  ".custom-tank-shape-adjustment-innerMax"
);
const customAdjustment = document.querySelector(".custom-density-adjustment");
const customMaxHeight = document.querySelector("#custom-max-height1");
const customMaxVolume = document.querySelector("#custom-max-volume1");
const customMaxHeight2 = document.querySelector("#custom-max-height2");
const customMaxVolume2 = document.querySelector("#custom-max-volume2");
const customHeightMax = document.querySelector("#custom-max-heightMax");
const customVolumeMax = document.querySelector("#custom-max-volumeMax");
const customButtons2 = document.querySelector("#custom-buttons2");
const addAnotherButton = document.querySelector("#add-another2");
const deleteButton = document.querySelector("#delete2");
const proceedButton = document.querySelector("#proceed-button");
const modal = document.querySelector(".modal");
const modalXButton = document.querySelector("#x-button");
const modalOkButton = document.querySelector("#ok-button");
const modalCloseButton = document.querySelector("#close-button");
const modalCancelButton = document.querySelector("#cancel-button");
const unitsInput = document.querySelector(".units-input");
const densityInput = document.querySelector(".density-input");
const mediumNameInput = document.querySelector("#medium-name-input");
const densityPicker = document.querySelector("#density-picker");
const maxHeight = document.querySelector("#max-height");
const maxVolume = document.querySelector("#max-volume");
const tankShape = document.querySelector(".tank-shape-input");
const maxFilling = document.querySelector("#max-fill");
const settingsListDiv = document.querySelector(".inner-modal-settings-list");

const unitsUserInputValidation = () => {
  errorMessages = errorMessages.filter(message => message != "Measuring unit is required.");
  errorMessages.push(dropdownValidation(unitsInput, "Measuring unit is required."));
  checkForErrorMessages();
};

const densityUserInputValidation = () => {
  errorMessages = errorMessages.filter(message => message != "Medium type is required.");
  errorMessages.push(dropdownValidation(densityInput, "Medium type is required."));
  checkForErrorMessages();
};

const mediumNameUserInputValidation = () => {
  if (densityInput.value != "Custom") {
    errorMessages = errorMessages.filter(message => message != "Medium name is required.");
    errorMessages = errorMessages.filter(message => message != "Invalid density.");
    checkForErrorMessages();
  }
  errorMessages = errorMessages.filter(message => message != "Medium name is required.");
  errorMessages.push(regularTextValidation(mediumNameInput, "Medium name is required."));
  checkForErrorMessages();
};

const mediumDensityUserInputValidation = () => {
  if (densityInput.value != "Custom") {
    errorMessages = errorMessages.filter(message => message != "Medium name is required.");
    errorMessages = errorMessages.filter(message => message != "Invalid density.");
    checkForErrorMessages();
  }
  errorMessages = errorMessages.filter(message => message != "Invalid density.");
  errorMessages.push(regularNumberValidation(densityPicker, "Invalid density."));
  checkForErrorMessages();
};

const maxHeightUserInputValidation = () => {
  errorMessages = errorMessages.filter(message => message != "Invalid tank height.");
  errorMessages.push(maxHeightValidation (maxHeight, "Invalid tank height."));
  
  checkForErrorMessages();
};

const maxVolumeUserInputValidation = () => {
  errorMessages = errorMessages.filter(message => message != "Invalid tank volume.");
  errorMessages.push(maxVolumeValidation(maxVolume, "Invalid tank volume."));
  checkForErrorMessages();
};

const tankShapeUserInputValidation = () => {
  errorMessages = errorMessages.filter(message => message != "Tank shape is required.");
  errorMessages.push(dropdownValidation(tankShape, "Tank shape is required."));
  checkForErrorMessages();
};

const customHeightUserInputValidation = () => {
  errorMessages = errorMessages.filter(message => message != "Invalid height-volume pair(s).");
  const chvArray = customHeightValidation(customMaxHeight2, "Invalid height-volume pair(s).", otherCustomMaxHeightsAndVolumes, customHeights, maxHeight);
  otherCustomMaxHeightsAndVolumes = [...chvArray[0]];
  customHeights = [...chvArray[1]];
  errorMessages.push(chvArray[2]);
  checkForErrorMessages();
};

const customVolumeUserInputValidation = () => {
  errorMessages = errorMessages.filter(message => message != "Invalid height-volume pair(s).");
  const cvvArray = customVolumeValidation(customMaxVolume2, "Invalid height-volume pair(s).", otherCustomMaxHeightsAndVolumes, customVolumes, maxVolume);
  otherCustomMaxHeightsAndVolumes = [...cvvArray[0]];
  customVolumes = [...cvvArray[1]];
  errorMessages.push(cvvArray[2]);
  checkForErrorMessages();
};

const customAddedHeightUserInputValidation = (element) => {
  errorMessages = errorMessages.filter(message => message != "Invalid height-volume pair(s).");
  const chvArray = customHeightValidation(element, "Invalid height-volume pair(s).", otherCustomMaxHeightsAndVolumes, customHeights, maxHeight);
  otherCustomMaxHeightsAndVolumes = [...chvArray[0]];
  customHeights = [...chvArray[1]];
  errorMessages.push(chvArray[2]);
  checkForErrorMessages();
};

const customAddedVolumeUserInputValidation = (element) => {
  errorMessages = errorMessages.filter(message => message != "Invalid height-volume pair(s).");
  const cvvArray = customVolumeValidation(element, "Invalid height-volume pair(s).", otherCustomMaxHeightsAndVolumes, customVolumes, maxVolume);
  otherCustomMaxHeightsAndVolumes = [...cvvArray[0]];
  customVolumes = [...cvvArray[1]];
  errorMessages.push(cvvArray[2]);
  checkForErrorMessages();
};

const maxFillingUserInputValidation = () => {
  errorMessages = errorMessages.filter(message => message != "Invalid filling limit.");
  errorMessages.push(maxFillingValidation(maxFilling, "Invalid filling limit."));
  checkForErrorMessages();
};

const checkForErrorMessages = () => {
 errorMessages = errorMessageOutput(error, errorMessages);
 errorMessages = errorMessages.filter(message => message != "");
 errorMessages = errorMessages.filter(message => message != undefined);
 if (errorMessages.length == 0) {
  proceedButton.disabled = false;
  proceedButton.style.backgroundColor = "#0162a6";
 } else {
  // pageTitle.scrollIntoView(true);
  proceedButton.disabled = true;
  proceedButton.style.backgroundColor = "gray";
 }
};

const isCustomTankShape = () => {
  proceedButton.disabled = true;
  proceedButton.style.backgroundColor = "gray";
  shapeAdjustment.style.display = "block";
  customMaxHeight2.disabled = false;
  customMaxHeight2.value = "";
  customMaxVolume2.disabled = false;
  customMaxVolume2.value = "";
  customHeightMax.disabled = true;
  customVolumeMax.disabled = true;
  customButtons2.style.display = "flex";
  addAnotherButton.style.backgroundColor = "gray";
  addAnotherButton.style.display = "block";
  deleteButton.style.display = "none";
  otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(
    (element) => element.id != customMaxHeight2.id
  );
  otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(
    (element) => element.id != customMaxVolume2.id
  );
  otherCustomMaxHeightsAndVolumes.push(
    { id: customMaxHeight2.id, value: customMaxHeight2.value },
    { id: customMaxVolume2.id, value: customMaxVolume2.value }
  );
};

const notCustomTankShape = () => {
  while (counter > 3) {
    document
      .querySelector(`#custom-tank-shape-adjustment-inner${counter - 1}`)
      .remove();
    counter--;
  }
  shapeAdjustment.style.display = "none";
  customMaxHeight.disabled = true;
  customMaxVolume.disabled = true;
  customMaxHeight2.disabled = true;
  customMaxVolume2.disabled = true;
  addAnotherButton.style.display = "none";
  deleteButton.style.display = "none";
  customMaxHeight2.style.borderColor = "black";
    customMaxVolume2.style.borderColor = "black";
      errorMessages = errorMessages.filter(message => message != "Invalid height-volume pair(s).");
      otherCustomMaxHeightsAndVolumes.length = 0;
      customHeights.length = 0;
      customVolumes.length = 0;
};

const customTankShape = (id) => {
  const trimmedId = id.trim();
  tankShape.value = trimmedId;
  customMaxHeight.value = 0;
  customMaxVolume.value = 0;
  if (maxHeight.value == "" || maxHeight.value == undefined || maxHeight.value == "0") {
    notCustomTankShape();
    return;
  } else if (maxVolume.value == "" || maxVolume.value == undefined || maxVolume.value == "0") {
   notCustomTankShape();
   return;
  }
  if (trimmedId == "Custom") {
    maxHeight.disabled = true;
    maxVolume.disabled = true;
    isCustomTankShape();
    return;
  } else {
    maxHeight.disabled = false;
    maxVolume.disabled = false;
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

const toggleTankShapeInput = (e) => {
  if (!isTankShapeOpen && e.target.classList[0] === "tank-shape-input") {
    tankShapeOption.style.display = "block";
    isTankShapeOpen = true;
  } else {
    tankShapeOption.style.display = "none";
    isTankShapeOpen = false;
  }
};

const toggleMediaInput = (e) => {
  if (!isMediaOpen && e.target.classList[0] === "density-input") {
    mediaOption.style.display = "block";
    isMediaOpen = true;
  } else {
    mediaOption.style.display = "none";
    isMediaOpen = false;
  }
};

const toggleUnitsInput = (e) => {
  if (!isUnitsOpen && e.target.classList[0] === "units-input") {
    unitsOption.style.display = "block";
    isUnitsOpen = true;
  } else {
    unitsOption.style.display = "none";
    isUnitsOpen = false;
  }
};

const saveIntoCustomMaxHeight = (e) => {
  e.preventDefault();
  if (e.target.value.endsWith(".")) {
    customHeightMax.value = e.target.value.slice(0, - 1);
  } else {
    customHeightMax.value = e.target.value;
    const stringNum = String(e.target.value);
if (stringNum.includes(".")) {
let numberOfDecimals = stringNum.split(".")[1].length;
if (numberOfDecimals > 2) {
  customHeightMax.value = customHeightMax.value.slice(0, customHeightMax.value.length - 1);
}
}
  } 
};

const saveIntoCustomMaxVolume = (e) => {
  e.preventDefault();
  customVolumeMax.value = e.target.value;
};

const addReadonly = () => {
  tankShape.setAttribute("readonly", "true");
  densityInput.setAttribute("readonly", "true");
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
    mediumNameInput.disabled = false;
    densityPicker.disabled = false;
    mediumNameInput.value = "";
    densityPicker.value = "";
  } else {
    mediumNameInput.value = "";
    densityPicker.value = "";
    customAdjustment.style.display = "none";
    mediumNameInput.disabled = true;
    densityPicker.disabled = true;
    mediumNameInput.style.borderColor = "black";
    densityPicker.style.borderColor = "black";
    errorMessages = errorMessages.filter(message => message != "Medium name is required.");
    errorMessages = errorMessages.filter(message => message != "Invalid density.");
  }
  densityInput.value = id.trim();
};

const addAnotherCustomTankShape = () => {
  proceedButton.style.display = "gray";
  proceedButton.disabled = true;


  heightInputCount = 0;

  document.querySelector("#custom-buttons" + (counter - 1)).style.display = "none";
  // document.querySelector("#add-another" + (counter - 1)).style.display = "none";
  // document.querySelector("#delete" + (counter - 1)).style.display = "none";
  document.querySelector("#custom-max-height" + (counter - 1)).disabled = true;
  document.querySelector("#custom-max-volume" + (counter - 1)).disabled = true;

  const innerDiv = document.createElement("div");
  const heightInput = document.createElement("input");
  const volumeInput = document.createElement("input");
  const buttonsDiv = document.createElement("div");
  const addButton = document.createElement("input");
  const deleteButton = document.createElement("input");

  innerDiv.className = "custom-tank-shape-adjustment-inner";
  innerDiv.id = "custom-tank-shape-adjustment-inner" + counter;

  heightInput.type = "text";
  heightInput.inputMode = "decimal";
  heightInput.id = `custom-max-height${counter}`;
  heightInput.className = "custom-fields";
  heightInput.name = `custom-max-height${counter}`;
  heightInput.placeholder = "Insert value...";
  heightInput.step = "0.01";
  heightInput.value = "";
  volumeInput.type = "text";
  volumeInput.inputMode = "decimal";
  volumeInput.id = `custom-max-volume${counter}`;
  volumeInput.className = "custom-fields";
  volumeInput.name = `custom-max-volume${counter}`;
  volumeInput.placeholder = "Insert value...";
  volumeInput.value = "";
  volumeInput.step = "1";
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
    errorMessages = errorMessages.filter(message => message != "Invalid height-volume pair(s).");
    errorMessages.push("Invalid height-volume pair(s).");
  checkForErrorMessages();
  } else {
    customAddedHeightUserInputValidation(heightInput);
  }
});

heightInput.addEventListener("input", () => {
  if (heightInput.style.borderColor == "red" || volumeInput.style.borderColor == "red") {
    errorMessages = errorMessages.filter(
      (message) => message != "Invalid height-volume pair(s)."
    );
    errorMessages.push("Invalid height-volume pair(s).");
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
  if (errorMessages.includes("Invalid height-volume pair(s).")) {
    addButton.disabled = true;
    addButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
    proceedButton.style.backgroundColor = "gray";
  } else {
    addButton.disabled = enableButton(heightInput, volumeInput);
  if (!addButton.disabled) {
    addButton.style.backgroundColor = "#0162a6";
  } else {
    addButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
    proceedButton.style.backgroundColor = "gray";
  }
  }
});

heightInput.addEventListener("input", () => {
  if (heightInput.style.borderColor == "red" || volumeInput.style.borderColor == "red") {
    errorMessages = errorMessages.filter(
      (message) => message != "Invalid height-volume pair(s)."
    );
    errorMessages.push("Invalid height-volume pair(s).");
  checkForErrorMessages();
  addButton.disabled = true;
    addButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
    proceedButton.style.backgroundColor = "gray";
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
  if (errorMessages.includes("Invalid height-volume pair(s).")) {
    addButton.disabled = true;
    addButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
    proceedButton.style.backgroundColor = "gray";
  } else {
    addButton.disabled = enableButton(heightInput, volumeInput);
  if (!addButton.disabled) {
    addButton.style.backgroundColor = "#0162a6";
  } else {
    addButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
    proceedButton.style.backgroundColor = "gray";
  }
  }
});
  
volumeInput.addEventListener("input", () => {
  if (heightInput.style.borderColor == "red" || volumeInput.style.borderColor == "red") {
    errorMessages = errorMessages.filter(
      (message) => message != "Invalid height-volume pair(s)."
    );
    errorMessages.push("Invalid height-volume pair(s).");
  checkForErrorMessages();
  addButton.disabled = true;
    addButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
    proceedButton.style.backgroundColor = "gray";
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

  buttonsDiv.className = "custom-buttons";
  buttonsDiv.id = `custom-buttons${counter}`;

  addButton.className = "custom-button";
  addButton.classList.add("custom-add-button");
  addButton.id = "add-another" + counter;
  addButton.type = "button";
  addButton.value = "+";
  addButton.addEventListener("click", addAnotherCustomTankShape);
  addButton.style.backgroundColor = "gray";
  addButton.disabled = true;
  proceedButton.disabled = true;
  proceedButton.style.backgroundColor = "gray";

  deleteButton.className = "custom-button";
  deleteButton.id = "delete" + counter;
  deleteButton.type = "button";
  deleteButton.value = "-";
  deleteButton.addEventListener("click", () => deleteCustomTankShape(innerDiv.id));

  innerDiv.appendChild(heightInput);
  innerDiv.appendChild(volumeInput);
  buttonsDiv.appendChild(addButton);
  buttonsDiv.appendChild(deleteButton);
  innerDiv.appendChild(buttonsDiv);

  document
    .querySelector(".custom-tank-shape-adjustment")
    .insertBefore(innerDiv, shapeAdjustmentInnerMax);
  counter++;
  if (counter > 16) {
    document.querySelector("#add-another" + (counter - 1)).style.display =
      "none";
    return;
  }
};

addAnotherButton.addEventListener("click", addAnotherCustomTankShape);

const deleteCustomTankShape = (id) => {
  counter--;
  document.querySelector("#custom-buttons" + (counter - 1)).style.display = "flex";
  // document.querySelector("#add-another" + (counter - 1)).style.display = "block";
  // document.querySelector("#delete" + (counter - 1)).style.display = "block";
  document.querySelector("#custom-max-height" + (counter - 1)).disabled = false;
  document.querySelector("#custom-max-volume" + (counter - 1)).disabled = false;
  if (id === "custom-tank-shape-adjustment-inner3") {
    addAnotherButton.disabled = false;
    addAnotherButton.style.backgroundColor = "#0162a6";
    deleteButton.style.display = "none";
  }
  customHeights = customHeights.filter(height => height[0] != document.querySelector("#" + id).children[0].id);
  customVolumes = customVolumes.filter(volume => volume[0] != document.querySelector("#" + id).children[1].id);  
  document
    .querySelector(".custom-tank-shape-adjustment")
    .removeChild(document.querySelector("#" + id));
    if (otherCustomMaxHeightsAndVolumes.length % 2 != 0) {
      otherCustomMaxHeightsAndVolumes.length = 0;
    }
    else if (otherCustomMaxHeightsAndVolumes.length >= 2) {
      otherCustomMaxHeightsAndVolumes = [...otherCustomMaxHeightsAndVolumes.slice(0, otherCustomMaxHeightsAndVolumes.length - 1)];
      otherCustomMaxHeightsAndVolumes = [...otherCustomMaxHeightsAndVolumes.slice(0, otherCustomMaxHeightsAndVolumes.length - 1)];
    } else if (otherCustomMaxHeightsAndVolumes.length < 2) {
      otherCustomMaxHeightsAndVolumes.length = 0;
    }
    
  errorMessages = errorMessages.filter(message => message != "Invalid height-volume pair(s).");
  if ((maxHeight.value.includes(".") == false) || (maxHeight.value.split(".")[1].length <= 2)) {
    let decimalError = false;
    if (customHeights.length > 0) {
      customHeights.forEach(height => {
        if (height[1].includes(".")) {
          if (height[1].split(".")[1].length > 2) {
            decimalError = true;
          }
        }
      }); 
    }
     
    if (decimalError == false) {
      errorMessages = errorMessages.filter(message => message != "There can be only two decimals.");
    }
  }

  checkForErrorMessages();
};

deleteButton.addEventListener("click", () => deleteCustomTankShape('custom-tank-shape-adjustment-inner'));

const submitSettingsForm = (e) => {
  e.preventDefault();
  if (maxHeight.value.endsWith(".")) {
    maxHeight.value = maxHeight.value.slice(0, - 1);
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
  errorMessages.push(dropdownValidation(densityInput, "Medium type is required."));
  errorMessages.push(regularTextValidation(mediumNameInput, "Medium name is required."));
  errorMessages.push(regularNumberValidation(densityPicker, "Invalid density."));
  errorMessages.push(maxHeightValidation (maxHeight, "Invalid tank height."));
  errorMessages.push(maxVolumeValidation (maxVolume, "Invalid tank volume."));
  errorMessages.push(dropdownValidation(tankShape, "Tank shape is required."));


  if (otherCustomMaxHeightsAndVolumes.length > 0) {
    errorMessages = errorMessages.filter(
      (message) => message != "Invalid height-volume pair(s)."
    );
    customTankShapeError = false;
    otherCustomMaxHeightsAndVolumes.forEach((element) => {
      const inputField = document.querySelector(`#${element.id}`);
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
      errorMessages.push("Invalid height-volume pair(s).");
      error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
    }
  }

  errorMessages.push(maxFillingValidation(maxFilling, "Invalid filling limit."));
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
    densityInput, 
    mediumNameInput, 
    densityPicker, 
    maxHeight, 
    maxVolume, 
    tankShape, 
    customHeights, 
    customVolumes, 
    heightsAndVolumes, 
    maxFilling);
};

window.addEventListener("click", toggleUnitsInput);
window.addEventListener("click", toggleMediaInput);
window.addEventListener("click", toggleTankShapeInput);
mediumNameInput.addEventListener("input", mediumNameUserInputValidation);
mediumNameInput.addEventListener("input", () => {
  if(densityPicker.value == undefined || densityPicker.value == "") {
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

densityPicker.addEventListener("input", (event) => {
  if (event.data === "." || event.data === "-" || event.data === "," || event.data === " ") {
    densityPicker.value = densityPicker.value.replace(event.data, "");
  } else if (isNaN(event.data)) {
    densityPicker.value = densityPicker.value.replace(event.data, "");
  }
});
 densityPicker.addEventListener("input", mediumDensityUserInputValidation);
 densityPicker.addEventListener("input", () => {
  if(mediumNameInput.value == undefined || mediumNameInput.value == "") {
    proceedButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
  }
});

densityPicker.addEventListener("input", () => {
  if (customHeights.length != customVolumes.length) {
    proceedButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
  }
});

maxHeight.addEventListener("input", (event) => {
  let length = maxHeight.value.length;
  if (event.data === "-" || event.data === " ") {
    maxHeight.value = maxHeight.value.replace(event.data, "");
  } else if(event.data === ",") {
    if (maxHeight.value[0] === ",") {
      maxHeight.value = maxHeight.value.replace(maxHeight.value[0], "0.");
      maxHeightCount++;
      return;
    } else {
      maxHeight.value = maxHeight.value.replace(event.data, ".");
      maxHeightCount++;
      if (maxHeightCount > 1) {
        maxHeight.value = maxHeight.value.slice(0, length - 1);
        maxHeightCount--;
        return;
      } else {
        for (let char of maxHeight.value) {
          if (char === ".") {
            if (maxHeightCount > 1) {
              maxHeight.value = maxHeight.value.slice(0, length - 1);
              maxHeightCount--;
            }
          }
        }
      }
      return;
    }
} else if (event.data === ".") {
    if (maxHeight.value[0] === ".") {
      maxHeight.value = `0${maxHeight.value}`;
      maxHeightCount++;
      if (maxHeightCount > 1) {
        maxHeight.value = maxHeight.value.slice(0, length - 1);
        maxHeightCount--;
      }
      return;
    } else {
      maxHeightCount++;
      if (maxHeightCount > 1) {
        maxHeight.value = maxHeight.value.slice(0, length - 1);
        maxHeightCount--;
      } else {
        for (let char of maxHeight.value) {
          if (char == ".") {
            if (maxHeightCount > 1) {
              maxHeight.value = maxHeight.value.slice(0, length - 1);
              maxHeightCount--;
            }
          }
        }
      }
      return;
    } 
  } else if (event.data == null) {
    if (maxHeight.value.includes(".") == false && maxHeight.value.includes(",") == false) {
      maxHeightCount = 0;
      maxHeightUserInputValidation();
    }
  } else if (isNaN(event.data)) {
    maxHeight.value = maxHeight.value.replace(event.data, "");
  } 
});
maxHeight.addEventListener("input", saveIntoCustomMaxHeight);
// maxHeight.addEventListener("input", maxTwoDecimalsValidation);
maxHeight.addEventListener("input", (event) => {
  const stringNum = String(event.target.value);
if (stringNum.includes(".")) {
let numberOfDecimals = stringNum.split(".")[1].length;
if (stringNum[0] === ".") {
  maxHeight.value = `0${maxHeight.value}`;
}
 if (stringNum[0] == "0") {
  if (stringNum[1] != ".") {
    maxHeight.value = maxHeight.value.replace("0", "");
  }
}

if (numberOfDecimals > 2) {
  maxHeight.value = maxHeight.value.slice(0, maxHeight.value.length - 1);
}
}
});
maxHeight.addEventListener("input", maxHeightUserInputValidation);
maxHeight.addEventListener("input", () => {
  if(error.textContent.includes("Invalid tank height.") || error.textContent.includes("There can be only two decimals.")) {
    maxHeight.style.borderColor = "red";
    customHeightMax.value = "";
  }
});

maxHeight.addEventListener("input", () => {
  if (customHeights.length != customVolumes.length) {
    proceedButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
  }
});

maxHeight.addEventListener("input", () => {
  if ((maxHeight.value == "" || maxHeight.value == undefined || maxHeight.value == "0" || maxHeight.style.borderColor == "red") || (maxVolume.value == "" || maxVolume.value == undefined || maxVolume.value == "0") || (tankShape.value == "" || tankShape.value == undefined)) {
    notCustomTankShape();
    return;
  } else if(shapeAdjustment.style.display == "none") {
    customTankShape(tankShape.value);
    return;
  }
});

maxVolume.addEventListener("input", (event) => {
  if (event.data === "." || event.data === "-" || event.data === "," || event.data === " ") {
    maxVolume.value = maxVolume.value.replace(event.data, "");
  } else if (isNaN(event.data)) {
    maxVolume.value = maxVolume.value.replace(event.data, "");
  } else if (event.data == "0") {
    if (maxVolume.value.length === 1) {
      maxVolume.value = maxVolume.value.replace(event.data, "");
    } else if (maxVolume.value[0] == event.data) {
      maxVolume.value = maxVolume.value.replace(event.data, "");
    }
  } 
});
maxVolume.addEventListener("input", maxVolumeUserInputValidation);
maxVolume.addEventListener("input", saveIntoCustomMaxVolume);
maxVolume.addEventListener("input", () => {
  if (customHeights.length != customVolumes.length) {
    proceedButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
  }
});
maxVolume.addEventListener("input", () => {
  if ((maxVolume.value == "" || maxVolume.value == undefined || maxVolume.value == "0" || maxVolume.style.borderColor == "red") || (maxHeight.value == "" || maxHeight.value == undefined || maxHeight.value == "0" || maxHeight.style.borderColor == "red") || (tankShape.value == "" || tankShape.value == undefined)) {
    notCustomTankShape();
    return;
  } else if(shapeAdjustment.style.display == "none") {
    customTankShape(tankShape.value);
    return;
  }
});

unitsInput.addEventListener("focus", addReadonly);
densityInput.addEventListener("focus", addReadonly);
tankShape.addEventListener("focus", addReadonly);
customMaxHeight.addEventListener("input", (event) => {
 let length = customMaxHeight.value.length;
  if (event.data === "-" || event.data === " ") {
    customMaxHeight.value = customMaxHeight.value.replace(event.data, "");
  } else if(event.data === ",") {
    if (customMaxHeight.value[0] === ",") {
      customMaxHeight.value = customMaxHeight.value.replace(customMaxHeight.value[0], "0.");
      customMaxHeightCount++;
      if (customMaxHeightCount > 1) {
        
        customMaxHeight.value = customMaxHeight.value.slice(0, length - 1);
        customMaxHeightCount--;
      }
      return;
    } else {
      customMaxHeight.value = customMaxHeight.value.replace(event.data, ".");
      customMaxHeightCount++;
      if (customMaxHeightCount > 1) {
        customMaxHeight.value = customMaxHeight.value.slice(0, length - 1);
        customMaxHeightCount--;
        return;
      } else {
        for (let char of customMaxHeight.value) {
          if (char === ".") {
            if (customMaxHeightCount > 1) {
              customMaxHeight.value = customMaxHeight.value.slice(0, length - 1);
              customMaxHeightCount--;
            }
          }
        }
      }
      return;
    }
} else if (event.data === ".") {
    if (customMaxHeight.value[0] === ".") {
      customMaxHeight.value = `0${customMaxHeight.value}`;
      customMaxHeightCount++;
      if (customMaxHeightCount > 1) {
        customMaxHeight.value = customMaxHeight.value.slice(0, length - 1);
        customMaxHeightCount--;
      }
      return;
    } else {
      customMaxHeightCount++;
      if (customMaxHeightCount > 1) {
        customMaxHeight.value = customMaxHeight.value.slice(0, length - 1);
        customMaxHeightCount--;
      } else {
        for (let char of customMaxHeight.value) {
          if (char == ".") {
            if (customMaxHeightCount > 1) {
              customMaxHeight.value = customMaxHeight.value.slice(0, length - 1);
              customMaxHeightCount--;
            }
          }
        }
      }
      return;
    } 
  } else if (event.data == null) {
    if (customMaxHeight.value.includes(".") == false && customMaxHeight.value.includes(",") == false) {
      customMaxHeightCount = 0;
      customHeightUserInputValidation();
    }
  } else if (isNaN(event.data)) {
    customMaxHeight.value = customMaxHeight.value.replace(event.data, "");
  } 
});
customMaxVolume.addEventListener("input", (event) => {
  if (event.data === "." || event.data === "-" || event.data === "," || event.data === " ") {
    customMaxVolume.value = customMaxVolume.value.replace(event.data, "");
  } else if (event.data == null) {
    if (customMaxVolume.value.includes(".") === false && customMaxVolume.value.includes(",") === false) {
      customVolumeUserInputValidation();
    }
  } else if (isNaN(event.data)) {
    customMaxVolume.value = customMaxVolume.value.replace(event.data, "");
  } 
});
customMaxHeight2.addEventListener("input", (event) => {
  let length = customMaxHeight2.value.length;
  if (event.data === "-" || event.data === " ") {
    customMaxHeight2.value = customMaxHeight2.value.replace(event.data, "");
    return;
  } else if (event.data === ",") {
    if (customMaxHeight2.value[0] === ",") {
      customMaxHeight2.value = customMaxHeight2.value.replace(customMaxHeight2.value[0], "0.");
      customMaxHeight2Count++;
      if (customMaxHeight2Count > 1) {
        customMaxHeight2.value = customMaxHeight2.value.slice(0, length - 1);
        customMaxHeight2Count--;
      }
      return;
    } else {
      customMaxHeight2.value = customMaxHeight2.value.replace(event.data, ".");
      customMaxHeight2Count++;
      if (customMaxHeight2Count > 1) {
        customMaxHeight2.value = customMaxHeight2.value.slice(0, length - 1);
        customMaxHeight2Count--;
        return;
      } else {
        for (let char of customMaxHeight2.value) {
          if (char === ".") {
            if (customMaxHeight2Count > 1) {
              customMaxHeight2.value = customMaxHeight2.value.slice(0, length - 1);
              customMaxHeight2Count--;
            }
          }
        }
      }
      return;
    }
} else if (event.data === ".") {
    if (customMaxHeight2.value[0] === ".") {
      customMaxHeight2.value = `0${customMaxHeight2.value}`;
      customMaxHeight2Count++;
      if (customMaxHeight2Count > 1) {
        customMaxHeight2.value = customMaxHeight2.value.slice(0, length - 1);
        customMaxHeight2Count--;
      }
      return;
    } else {
      customMaxHeight2Count++;
      if (customMaxHeight2Count > 1) {
        customMaxHeight2.value = customMaxHeight2.value.slice(0, length - 1);
        customMaxHeight2Count--;
      } else {
        for (let char of customMaxHeight2.value) {
          if (char == ".") {
            if (customMaxHeight2Count > 1) {
              customMaxHeight2.value = customMaxHeight2.value.slice(0, length - 1);
              customMaxHeight2Count--;
            }
          }
        }
      }
      return;
    } 
  } else if (customMaxHeight2.value[0] == "0") {
      if (customMaxHeight2.value[1] != ".") {
        customMaxHeight2.value = customMaxHeight2.value.replace("0", "");
      }  
  } else if (event.data == null) {
    if (customMaxHeight2.value.includes(".") == false && customMaxHeight2.value.includes(",") == false) {
      customMaxHeight2Count = 0;
      customHeightUserInputValidation();
    } else if (isNaN(event.data)) {
      customMaxHeight2.value = customMaxHeight2.value.replace(event.data, "");
    } 
  }
});
customMaxVolume2.addEventListener("input", (event) => {
  if (event.data === "." || event.data === "-" || event.data === "," || event.data === " ") {
    customMaxVolume2.value = customMaxVolume2.value.replace(event.data, "");
  } else if (event.data == null) {
      customVolumeUserInputValidation();
  } else if (isNaN(event.data)) {
    customMaxVolume2.value = customMaxVolume2.value.replace(event.data, "");
  } else if (event.data == "0") {
    if (customMaxVolume2.value.length === 1) {
      customMaxVolume2.value = customMaxVolume2.value.replace(event.data, "");
    } else if (customMaxVolume2.value[0] == event.data) {
      customMaxVolume2.value = customMaxVolume2.value.replace(event.data, "");
    }
  }
});
customMaxHeight2.addEventListener("input", () => {
  customHeightUserInputValidation();
  if (errorMessages.includes("Invalid height-volume pair(s).")) {
    addAnotherButton.disabled = true;
    addAnotherButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
    proceedButton.style.backgroundColor = "gray";
  } else {
    addAnotherButton.disabled = enableButton(customMaxHeight2, customMaxVolume2);
  if (!addAnotherButton.disabled) {
    addAnotherButton.style.backgroundColor = "#0162a6";
  } else {
    addAnotherButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
    proceedButton.style.backgroundColor = "gray";
  }
  }
});
customMaxVolume2.addEventListener("input", () => {
  customVolumeUserInputValidation();
  if (errorMessages.includes("Invalid height-volume pair(s).")) {
    addAnotherButton.disabled = true;
    addAnotherButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
    proceedButton.style.backgroundColor = "gray";
  } else {
    addAnotherButton.disabled = enableButton(customMaxHeight2, customMaxVolume2);
  if (!addAnotherButton.disabled) {
    addAnotherButton.style.backgroundColor = "#0162a6";
  } else {
    addAnotherButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
    proceedButton.style.backgroundColor = "gray";
  }
  }
});
customMaxHeight2.addEventListener("input", (event) => {
  const stringNum = String(event.target.value);
if (stringNum.includes(".")) {
let numberOfDecimals = stringNum.split(".")[1].length;
if (stringNum[0] === ".") {
  customMaxHeight2.value = `0${customMaxHeight2.value}`;
}
if (numberOfDecimals > 2) {
  customMaxHeight2.value = customMaxHeight2.value.slice(0, customMaxHeight2.value.length - 1);
  if (customMaxVolume2.value != undefined || customMaxVolume2.value != "") {
    addAnotherButton.disabled = false;
    addAnotherButton.style.backgroundColor = "#0162a6";
  }
}
}
customHeightUserInputValidation();
});
customMaxVolume2.addEventListener("input", customVolumeUserInputValidation);
customMaxHeight2.addEventListener("input", () => {
  if (customMaxVolume2.style.borderColor == "red" || customMaxHeight2.style.borderColor == "red") {
    errorMessages = errorMessages.filter(
      (message) => message != "Invalid height-volume pair(s)."
    );
    errorMessages.push("Invalid height-volume pair(s).");
  checkForErrorMessages();
  addAnotherButton.disabled = true;
    addAnotherButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
    proceedButton.style.backgroundColor = "gray";
  }
});

customMaxVolume2.addEventListener("input", () => {
if (customMaxHeight2.style.borderColor == "red" || customMaxVolume2.style.borderColor == "red") {
  errorMessages = errorMessages.filter(
    (message) => message != "Invalid height-volume pair(s)."
  );
  errorMessages.push("Invalid height-volume pair(s).");
checkForErrorMessages();
addAnotherButton.disabled = true;
    addAnotherButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
    proceedButton.style.backgroundColor = "gray";
}
});

customMaxHeight2.addEventListener("input", () => {
  if(customMaxVolume2.value == undefined || customMaxVolume2.value == "") {
    checkForErrorMessages();
    addAnotherButton.disabled = true;
    addAnotherButton.style.backgroundColor = "gray";
    proceedButton.disabled = true;
    proceedButton.style.backgroundColor = "gray";
  }
});

maxFilling.addEventListener("input", (event) => {
  if (event.data === "." || event.data === "-" || event.data === "," || event.data === " ") {
    maxFilling.value = maxFilling.value.replace(event.data, "");
  } else if (isNaN(event.data)) {
    maxFilling.value = maxFilling.value.replace(event.data, "");
  }  
});

maxFilling.addEventListener("input", maxFillingUserInputValidation);
form.addEventListener("submit", submitSettingsForm);
modalXButton.addEventListener("click", (e) => cancelAndExitModal(e, modal, settingsListDiv));
modalCancelButton.addEventListener("click", (e) => cancelAndExitModal(e, modal, settingsListDiv));
modalCloseButton.addEventListener("click", (e) => cancelAndExitModal(e, modal, settingsListDiv));
modalOkButton.addEventListener("click", (e) => submitModalForm(e));