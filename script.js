 import {
  limitDecimals,
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
let today;

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
const addAnotherButton = document.querySelector("#add-another2");
const deleteButton = document.querySelector("#delete2");
const proceedButton = document.querySelector("#proceed-button");
const modal = document.querySelector(".modal");
const modalXButton = document.querySelector("#x-button");
const modalOkButton = document.querySelector("#ok-button");
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

const maxTwoDecimalsValidation = (element) => {
  errorMessages = errorMessages.filter(message => message != "There can be only two decimals.");
  errorMessages.push(limitDecimals(element, element.value, "There can be only two decimals."));
  checkForErrorMessages();
};

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
  const chvArray = customHeightValidation(customMaxHeight2, "Invalid height-volume pair(s).", otherCustomMaxHeightsAndVolumes, customHeights);
  otherCustomMaxHeightsAndVolumes = chvArray[0];
  customHeights = chvArray[1];
  errorMessages.push(chvArray[2]);
  checkForErrorMessages();
};

const customVolumeUserInputValidation = () => {
  errorMessages = errorMessages.filter(message => message != "Invalid height-volume pair(s).");
  const cvvArray = customVolumeValidation(customMaxVolume2, "Invalid height-volume pair(s).", otherCustomMaxHeightsAndVolumes, customVolumes);
  otherCustomMaxHeightsAndVolumes = cvvArray[0];
  customVolumes = cvvArray[1];
  errorMessages.push(cvvArray[2]);
  checkForErrorMessages();
};

const customAddedHeightUserInputValidation = (element) => {
  errorMessages = errorMessages.filter(message => message != "Invalid height-volume pair(s).");
  const chvArray = customHeightValidation(element, "Invalid height-volume pair(s).", otherCustomMaxHeightsAndVolumes, customHeights);
  otherCustomMaxHeightsAndVolumes = chvArray[0];
  customHeights = chvArray[1];
  errorMessages.push(chvArray[2]);
  checkForErrorMessages();
};

const customAddedVolumeUserInputValidation = (element) => {
  errorMessages = errorMessages.filter(message => message != "Invalid height-volume pair(s).");
  const cvvArray = customVolumeValidation(element, "Invalid height-volume pair(s).", otherCustomMaxHeightsAndVolumes, customVolumes);
  otherCustomMaxHeightsAndVolumes = cvvArray[0];
  customVolumes = cvvArray[1];
  errorMessages.push(cvvArray[2]);
  checkForErrorMessages();
};

const maxFillingUserInputValidation = () => {
  errorMessages = errorMessages.filter(message => message != "Invalid filling limit.");
  errorMessages.push(maxFillingValidation(maxFilling, "Invalid filling limit."));
  checkForErrorMessages();
};

const checkForErrorMessages = () => {
  console.log(errorMessages);
 errorMessages = errorMessageOutput(error, errorMessages);
 errorMessages = errorMessages.filter(message => message != "");
 errorMessages = errorMessages.filter(message => message != undefined);
 console.log(errorMessages);
 if (errorMessages.length == 0) {
  proceedButton.disabled = false;
  proceedButton.style.opacity = 1;
 }
};

const customTankShape = (id) => {
  customMaxHeight.value = 0;
  customMaxVolume.value = 0;
  if (id.trim() === "Custom") {
    shapeAdjustment.style.display = "block";
    customMaxHeight2.disabled = false;
    customMaxHeight2.value = "";
    customMaxVolume2.disabled = false;
    customMaxVolume2.value = "";
    customHeightMax.disabled = true;
    customVolumeMax.disabled = true;
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
  } else {
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
  }
  tankShape.value = id.trim();
};

unitsOptions.forEach((option) => {
  option.addEventListener("click", () => {
    getUnitsIntoInput(option.textContent);
  });
  option.addEventListener("click", unitsUserInputValidation);
});

mediaOptions.forEach((option) => {
  option.addEventListener("click", () => {
    customDensity(option.textContent);
  });
  option.addEventListener("click", densityUserInputValidation);
});

tankShapeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    customTankShape(option.textContent);
  });
  option.addEventListener("click", tankShapeUserInputValidation);
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
  customHeightMax.value = e.target.value;
};

const saveIntoCustomMaxVolume = (e) => {
  e.preventDefault();
  customVolumeMax.value = e.target.value;
};

const addReadonly = () => {
  tankShape.setAttribute("readonly", "true");
  densityInput.setAttribute("readonly", "true");
};

const getUnitsIntoInput = (id) => {
  unitsInput.value = id.trim();
};

const customDensity = (id) => {
  if (id.trim() == "Custom") {
    customAdjustment.style.display = "flex";
    customAdjustment.style.flexFlow = "column wrap";
    customAdjustment.style.justifyContent = "center";
    customAdjustment.style.alignItems = "center";
    mediumNameInput.disabled = false;
    densityPicker.disabled = false;
  } else {
    mediumNameInput.value = null;
    densityPicker.value = null;
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
  document.querySelector("#add-another" + (counter - 1)).style.display = "none";
  document.querySelector("#delete" + (counter - 1)).style.display = "none";
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

  heightInput.type = "number";
  heightInput.id = `custom-max-height${counter}`;
  heightInput.name = `custom-max-height${counter}`;
  heightInput.placeholder = "Insert value...";
  heightInput.step = "0.01";
  heightInput.value = "";
  heightInput.addEventListener("input", () => customAddedHeightUserInputValidation(heightInput));
  heightInput.addEventListener("keypress", (event) => {
    if (event.key === "-") {
      event.preventDefault();
    }
  });
  heightInput.addEventListener("input", () => {
    addButton.disabled = enableButton(heightInput, volumeInput);
    if (!addButton.disabled) {
      addButton.style.opacity = 1;
    } else {
      addButton.style.opacity = 0.7;
    }
  });
  heightInput.addEventListener("input", () => maxTwoDecimalsValidation(heightInput));

  volumeInput.type = "number";
  volumeInput.id = `custom-max-volume${counter}`;
  volumeInput.name = `custom-max-volume${counter}`;
  volumeInput.placeholder = "Insert value...";
  volumeInput.value = "";
  volumeInput.step = "1";
  volumeInput.addEventListener("input", () => customAddedVolumeUserInputValidation(volumeInput));
  volumeInput.addEventListener("keypress", (event) => {
    if (event.key === "." || event.key === "-") {
      event.preventDefault();
    }
  });
  volumeInput.addEventListener("input", () => {
    addButton.disabled = enableButton(heightInput, volumeInput);
    if (!addButton.disabled) {
      addButton.style.opacity = 1;
     } else {
      addButton.style.opacity = 0.7;
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

  addButton.className = "custom-button";
  addButton.id = "add-another" + counter;
  addButton.type = "button";
  addButton.value = "+";
  addButton.addEventListener("click", addAnotherCustomTankShape);
  addButton.style.opacity = 0.7;
  addButton.disabled = true;

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
  document.querySelector("#add-another" + (counter - 1)).style.display =
    "block";
  document.querySelector("#delete" + (counter - 1)).style.display = "block";
  document.querySelector("#custom-max-height" + (counter - 1)).disabled = false;
  document.querySelector("#custom-max-volume" + (counter - 1)).disabled = false;
  if (id === "custom-tank-shape-adjustment-inner3") {
    document.querySelector("#delete2").style.display = "none";
  }
  document
    .querySelector(".custom-tank-shape-adjustment")
    .removeChild(document.querySelector("#" + id));
    console.log(otherCustomMaxHeightsAndVolumes);
  otherCustomMaxHeightsAndVolumes.pop();
  console.log(otherCustomMaxHeightsAndVolumes);
  otherCustomMaxHeightsAndVolumes.pop();
  console.log(customHeights);
  customHeights.pop();
  console.log(customHeights);
  console.log(customVolumes);
  customVolumes.pop();
  console.log(customVolumes);
  errorMessages = errorMessages.filter(message => message != "Invalid height-volume pair(s).");
  checkForErrorMessages();
};

deleteButton.addEventListener("click", () => deleteCustomTankShape('custom-tank-shape-adjustment-inner'));

const submitSettingsForm = (e) => {
  e.preventDefault();
  errorMessages.length = 0;
  error.textContent = "";
  if (
    otherCustomMaxHeightsAndVolumes.length > 0 &&
    otherCustomMaxHeightsAndVolumes.length % 2 != 0
  ) {
    otherCustomMaxHeightsAndVolumes.pop();
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
      let heightEmptyErrorCounter = 0;
      let heightTooBigNumErrorCounter = 0;
      let heightTooSmallNumErrorCounter = 0;
      let volumeEmptyErrorCounter = 0;
      let volumeTooBigNumErrorCounter = 0;
      let volumeTooSmallNumErrorCounter = 0;
      if (element.id.includes("height")) {
        if (element.value == "" || element.value == undefined) {
          customTankShapeError = true;
          inputField.style.borderColor = "red";
          if (heightEmptyErrorCounter == 1) {
            error.style.display = "block";
            error.style.color = "red";
            error.style.fontWeight = "900";
          }
        } else if (element.value > 4.7) {
          customTankShapeError = true;
          inputField.style.borderColor = "red";
          if (heightTooBigNumErrorCounter == 1) {
            error.style.display = "block";
            error.style.color = "red";
            error.style.fontWeight = "900";
          }
        } else if (element.value < 0) {
          customTankShapeError = true;
          inputField.style.borderColor = "red";
          if (heightTooSmallNumErrorCounter == 1) {
            error.style.display = "block";
            error.style.color = "red";
            error.style.fontWeight = "900";
          }
        } else {
          customHeights.push([inputField.id, inputField.value]);
          inputField.style.borderColor = "black";
          heightEmptyErrorCounter--;
          if (heightEmptyErrorCounter == 0) {
            inputField.style.borderColor = "black";
          }
          heightTooBigNumErrorCounter--;
          if (heightTooBigNumErrorCounter == 0) {
            inputField.style.borderColor = "black";
          }
          heightTooSmallNumErrorCounter--;
          if (heightTooSmallNumErrorCounter == 0) {
            inputField.style.borderColor = "black";
          }
        }
      } else if (element.id.includes("volume")) {
        if (element.value == "" || element.value == undefined) {
          customTankShapeError = true;
          inputField.style.borderColor = "red";
          if (volumeEmptyErrorCounter == 1) {
            error.style.display = "block";
            error.style.color = "red";
            error.style.fontWeight = "900";
          }
        } 
        else if (element.value < 0) {
          customTankShapeError = true;
          inputField.style.borderColor = "red";
          if (volumeTooSmallNumErrorCounter == 1) {
            error.style.display = "block";
            error.style.color = "red";
            error.style.fontWeight = "900";
          }
        } else {
          customVolumes.filter((volume) => volume[0] != inputField.id);
          customVolumes.push([inputField.id, inputField.value]);
          inputField.style.borderColor = "black";
          volumeEmptyErrorCounter--;
          if (volumeEmptyErrorCounter == 0) {
            inputField.style.borderColor = "black";
          }
          volumeTooBigNumErrorCounter--;
          if (volumeTooBigNumErrorCounter == 0) {
            inputField.style.borderColor = "black";
          }
          volumeTooSmallNumErrorCounter--;
          if (volumeTooSmallNumErrorCounter == 0) {
            inputField.style.borderColor = "black";
          }
        }
      }
      if (
        heightEmptyErrorCounter > 0 ||
        heightTooBigNumErrorCounter > 0 ||
        heightTooSmallNumErrorCounter > 0 ||
        volumeEmptyErrorCounter > 0 ||
        volumeTooBigNumErrorCounter > 0 ||
        volumeTooSmallNumErrorCounter > 0
      ) {
        customTankShapeError = true;
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
    const proceedButton = document.querySelector("#proceed-button");
    while (error.children.length > 0) {
      error.removeChild(error.lastElementChild);
      firstChild = error.firstChild;
    }
    window.scrollTo(0, 0);
    e.preventDefault();
    proceedButton.disabled = true;
    proceedButton.style.opacity = 0.7;
    error.style.display = "block";
    errorMessages.forEach((message) => {
      const errorParagraph = document.createElement("p");
      errorParagraph.textContent = message;
      error.appendChild(errorParagraph);
    });
    return;
  } else {
    proceedButton.disabled = false;
    proceedButton.style.opacity = 1;
  }
  today = new Date();

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
window.addEventListener("click", toggleTankShapeInput);
window.addEventListener("click", toggleMediaInput);
mediumNameInput.addEventListener("input", mediumNameUserInputValidation);
mediumNameInput.addEventListener("keypress", (event) => {
  if (!event.code.includes("Key") && event.code != "Space") {
    event.preventDefault();
  }
});
densityPicker.addEventListener("input", mediumDensityUserInputValidation);
densityPicker.addEventListener("keypress", (event) => {
  if (event.key === "." || event.key === "-") {
    event.preventDefault();
  }
});
maxHeight.addEventListener("keypress", (event) => {
  if (event.key === "-") {
    event.preventDefault();
  }
});
maxHeight.addEventListener("input", maxHeightUserInputValidation);
maxHeight.addEventListener("input", saveIntoCustomMaxHeight);
maxHeight.addEventListener("input",() => maxTwoDecimalsValidation(maxHeight));
maxVolume.addEventListener("keypress", (event) => {
  if (event.key === "." || event.key === "-") {
    event.preventDefault();
  }
});
maxVolume.addEventListener("input", maxVolumeUserInputValidation);
maxVolume.addEventListener("input", saveIntoCustomMaxVolume);
densityInput.addEventListener("change", customDensity);
densityInput.addEventListener("focus", addReadonly);
tankShape.addEventListener("focus", addReadonly);
tankShape.addEventListener("change", customTankShape);
customMaxHeight.addEventListener("keypress", (event) => {
  if (event.key === "-") {
    event.preventDefault();
  }
});
customMaxVolume.addEventListener("keypress", (event) => {
  if (event.key === "." || event.key === "-") {
    event.preventDefault();
  }
});
customMaxHeight2.addEventListener("input", () => {
  addAnotherButton.disabled = enableButton(customMaxHeight2, customMaxVolume2);
  if (!addAnotherButton.disabled) {
    addAnotherButton.style.opacity = 1;
  } else {
    addAnotherButton.style.opacity = 0.7;
  }
});
customMaxVolume2.addEventListener("input", () => {
  addAnotherButton.disabled = enableButton(customMaxHeight2, customMaxVolume2);
  if (!addAnotherButton.disabled) {
    addAnotherButton.style.opacity = 1;
  } else {
    addAnotherButton.style.opacity = 0.7;
  }
});
customMaxHeight2.addEventListener("input", customHeightUserInputValidation);
customMaxHeight2.addEventListener("input", () => maxTwoDecimalsValidation(customMaxHeight2));
customMaxVolume2.addEventListener("input", customVolumeUserInputValidation);
customMaxHeight2.addEventListener("keypress", (event) => {
  if (event.key === "-") {
    event.preventDefault();
  }
});
customMaxVolume2.addEventListener("keypress", (event) => {
  if (event.key === "." || event.key === "-") {
    event.preventDefault();
  }
});

maxFilling.addEventListener("input", maxFillingUserInputValidation);
maxFilling.addEventListener("keypress", (event) => {
  if (event.key === "." || event.key === "-") {
    event.preventDefault();
  }
});
form.addEventListener("submit", submitSettingsForm);
modalXButton.addEventListener("click", (e) => cancelAndExitModal(e, modal, settingsListDiv));
modalCancelButton.addEventListener("click", (e) => cancelAndExitModal(e, modal, settingsListDiv));
modalOkButton.addEventListener("click", (e) => submitModalForm(e, modal));
