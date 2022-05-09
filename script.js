import {
  dropdownValidation, 
  regularNumberValidation, 
  maxHeightValidation, 
  maxVolumeValidation, 
  tankShapeValidation,
  customHeightValidation, 
  customVolumeValidation, 
  //addedCustomFieldValidation, 
  maxFillingValidation,
  errorMessageOutput,
} from './utils/inputValidation.js';


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
let isModalOpen = false;
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
const shapeAdjustmentInner = document.querySelector(
  ".custom-tank-shape-adjustment-inner"
);
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
const modal = document.querySelector(".modal");
const modalXButton = document.querySelector("#x-button");
const modalOkButton = document.querySelector("#ok-button");
const modalCancelButton = document.querySelector("#cancel-button");
const unitsInput = document.querySelector(".units-input");
const densityInput = document.querySelector(".density-input");
const densityPicker = document.querySelector("#density-picker");
const maxHeight = document.querySelector("#max-height");
const maxVolume = document.querySelector("#max-volume");
const tankShape = document.querySelector(".tank-shape-input");
const customTankShapeOption = document.querySelector("#custom");
const maxFilling = document.querySelector("#max-fill");
const settingsListDiv = document.querySelector(".inner-modal-settings-list");

const validateUserInput = () => {
  errorMessages.length = 0;
  // otherCustomMaxHeightsAndVolumes = 0;
  // customHeights.length = 0;
  // customVolumes.length = 0;
  errorMessages.push(dropdownValidation(unitsInput, "Measuring unit is required."));
  errorMessages.push(dropdownValidation(densityInput, "Medium type is required."));
  errorMessages.push(regularNumberValidation(densityPicker, "Invalid density."));
  errorMessages.push(maxHeightValidation (maxHeight, "Invalid tank height."));
  errorMessages.push(maxVolumeValidation(maxVolume, "Invalid tank volume."));
  errorMessages.push(tankShapeValidation(tankShape, "Tank shape is required."));
  const chvArray = customHeightValidation(customMaxHeight2, "Invalid height-volume pair(s).", otherCustomMaxHeightsAndVolumes, customHeights);
  otherCustomMaxHeightsAndVolumes.push(...chvArray[0]);
  customHeights.push(...chvArray[1]);
  errorMessages = errorMessages.filter(element => element != chvArray[2]);
  errorMessages.push(chvArray[2]);
  const cvvArray = customVolumeValidation(customMaxVolume2, "Invalid height-volume pair(s).", otherCustomMaxHeightsAndVolumes, customVolumes);
  otherCustomMaxHeightsAndVolumes.push(...cvvArray[0]);
  customVolumes.push(...cvvArray[1]);
  errorMessages = errorMessages.filter(element => element != cvvArray[2]);
  errorMessages.push(cvvArray[2]);
  // Added/removed custom fields validation
  if (otherCustomMaxHeightsAndVolumes.length > 0) {
    otherCustomMaxHeightsAndVolumes.forEach((el) => {
      const inputField = document.querySelector(`#${el.id}`);
      if (inputField.id.includes("height")) {
        if (
          inputField.value == "" ||
          inputField.value == undefined ||
          inputField.value < 0 ||
          inputField.value > 2.5
        ) {
          errorMessages = errorMessages.filter(
            (message) => message != "Invalid height-volume pair(s)."
          );
          errorMessages.push("Invalid height-volume pair(s).");
          otherCustomMaxHeightsAndVolumes =
            otherCustomMaxHeightsAndVolumes.filter(
              (element) => element.id != el.id
            );
          otherCustomMaxHeightsAndVolumes.push({
            id: inputField.id,
            value:
              inputField.value != "" ? Number.parseFloat(inputField.value) : "",
          });
          inputField.style.borderColor = "red";
          error.style.display = "block";
          error.style.color = "red";
          error.style.fontWeight = "900";
        } else {
          customHeights = customHeights.filter(
            (height) => height[0] != inputField.id
          );
          inputField.style.borderColor = "black";
          otherCustomMaxHeightsAndVolumes =
            otherCustomMaxHeightsAndVolumes.filter(
              (element) => element.id != el.id
            );
          customHeights.push([inputField.id, inputField.value]);
        }
      } else if (inputField.id.includes("volume")) {
        if (
          inputField.value == "" ||
          inputField.value == undefined ||
          inputField.value < 0 ||
          inputField.value > 2500
        ) {
          errorMessages = errorMessages.filter(
            (message) => message != "Invalid height-volume pair(s)."
          );
          errorMessages.push("Invalid height-volume pair(s).");
          otherCustomMaxHeightsAndVolumes =
            otherCustomMaxHeightsAndVolumes.filter(
              (element) => element.id != el.id
            );
          otherCustomMaxHeightsAndVolumes.push({
            id: inputField.id,
            value:
              inputField.value != "" ? Number.parseFloat(inputField.value) : "",
          });
          inputField.style.borderColor = "red";
          error.style.display = "block";
          error.style.color = "red";
          error.style.fontWeight = "900";
        } else {
          customVolumes = customVolumes.filter(
            (volume) => volume[0] != inputField.id
          );
          inputField.style.borderColor = "black";
          otherCustomMaxHeightsAndVolumes =
            otherCustomMaxHeightsAndVolumes.filter(
              (element) => element.id != el.id
            );
          customVolumes.push([inputField.id, inputField.value]);
        }
      } else {
        errorMessages = errorMessages.filter(
          (message) => message != "Invalid height-volume pair(s)."
        );
      }
    });
    console.log(otherCustomMaxHeightsAndVolumes);
    if (otherCustomMaxHeightsAndVolumes.length == 0) {
      errorMessages = errorMessages.filter(
        (message) => message != "Invalid height-volume pair(s)."
      );
    }
  }
  // Added/removed custom fields validation (refactoring)
//   const acfvArray = addedCustomFieldValidation("Invalid height-volume pair(s).", otherCustomMaxHeightsAndVolumes, customHeights, customVolumes);
//  otherCustomMaxHeightsAndVolumes.length = 0;
//  otherCustomMaxHeightsAndVolumes.push(...acfvArray[1]);

   const mfvArray = maxFillingValidation(maxFilling, "Invalid filling limit.");
   console.log(mfvArray);
   //errorMessages = errorMessages.filter(element => element != mfvArray[1]);
    //errorMessages.push(mfvArray[1]);

   errorMessageOutput(error, errorMessages);
};

unitsOptions.forEach((option) => {
  option.addEventListener("click", () => {
    getUnitsIntoInput(option.textContent);
  });
  option.addEventListener("click", validateUserInput);
});

mediaOptions.forEach((option) => {
  option.addEventListener("click", () => {
    customDensity(option.textContent);
  });
  option.addEventListener("click", validateUserInput);
});

tankShapeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    customTankShape(option.textContent);
  });
  option.addEventListener("click", validateUserInput);
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

const storeIntoCustomArray = (e) => {
  otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(
    (element) => element.id != e.target.id
  );
  otherCustomMaxHeightsAndVolumes.push({
    id: e.target.id,
    value: e.target.value != "" ? Number.parseFloat(e.target.value) : "",
  });
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
    densityPicker.disabled = false;
  } else {
    densityPicker.value = null;
    customAdjustment.style.display = "none";
    densityPicker.disabled = true;
  }
  densityInput.value = id.trim();
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
  }
  tankShape.value = id.trim();
};

const addAnotherCustomTankShape = () => {
  document.querySelector("#add-another" + (counter - 1)).style.display = "none";
  document.querySelector("#delete" + (counter - 1)).style.display = "none";

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
  heightInput.addEventListener("focus", validateUserInput);
  heightInput.addEventListener("input", validateUserInput);
  heightInput.addEventListener("input", storeIntoCustomArray);
  heightInput.addEventListener("keypress", (event) => {
    if (event.key === "-") {
      event.preventDefault();
    }
  });

  volumeInput.type = "number";
  volumeInput.id = `custom-max-volume${counter}`;
  volumeInput.name = `custom-max-volume${counter}`;
  volumeInput.placeholder = "Insert value...";
  volumeInput.value = "";
  volumeInput.step = "1";
  volumeInput.addEventListener("focus", validateUserInput);
  volumeInput.addEventListener("input", validateUserInput);
  volumeInput.addEventListener("input", storeIntoCustomArray);
  volumeInput.addEventListener("keypress", (event) => {
    if (event.key === "." || event.key === "-") {
      event.preventDefault();
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
  if (id === "custom-tank-shape-adjustment-inner3") {
    document.querySelector("#delete2").style.display = "none";
  }
  document
    .querySelector(".custom-tank-shape-adjustment")
    .removeChild(document.querySelector("#" + id));
  otherCustomMaxHeightsAndVolumes.pop();
  otherCustomMaxHeightsAndVolumes.pop();
  customHeights.pop();
  customVolumes.pop();
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
  errorMessages.push(regularNumberValidation(densityPicker, "Invalid density."));
  if (
    maxHeight.value == "" ||
    maxHeight.value == undefined ||
    maxHeight.value < 0 ||
    maxHeight.value > 2.5
  ) {
    maxHeight.style.borderColor = "red";
    errorMessages.push("Invalid tank height.");
    error.style.display = "block";
    error.style.color = "red";
    error.style.fontWeight = "900";
  } else {
    maxHeight.style.borderColor = "black";
    errorMessages = errorMessages.filter(
      (message) => message != "Invalid tank height."
    );
  }
  if (
    maxVolume.value == "" ||
    maxVolume.value == undefined ||
    maxVolume.value < 0 ||
    maxVolume.value > 2500
  ) {
    maxVolume.style.borderColor = "red";
    errorMessages.push("Invalid tank volume.");
    error.style.display = "block";
    error.style.color = "red";
    error.style.fontWeight = "900";
  } else {
    maxVolume.style.borderColor = "black";
    errorMessages = errorMessages.filter(
      (message) => message != "Invalid tank volume."
    );
  }
  if (
    tankShape.value == "Choose..." ||
    tankShape.value == "" ||
    tankShape.value == undefined
  ) {
    tankShape.style.borderColor = "red";
    errorMessages.push("Tank shape is required.");
    error.style.display = "block";
    error.style.color = "red";
    error.style.fontWeight = "900";
  } else {
    tankShape.style.borderColor = "black";
    errorMessages = errorMessages.filter(
      (message) => message != "Tank shape is required."
    );
  }
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
        } else if (element.value > 2.5) {
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
        } else if (element.value > 2500) {
          customTankShapeError = true;
          inputField.style.borderColor = "red";
          if (volumeTooBigNumErrorCounter == 1) {
            error.style.display = "block";
            error.style.color = "red";
            error.style.fontWeight = "900";
          }
        } else if (element.value < 0) {
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

  if (
    maxFilling.value == "Choose..." ||
    maxFilling.value == "" ||
    maxFilling.value == undefined
  ) {
    maxFilling.style.borderColor = "red";
    errorMessages.push("Invalid filling limit.");
    error.style.display = "block";
    error.style.color = "red";
    error.style.fontWeight = "900";
  } else {
    maxFilling.style.borderColor = "black";
    errorMessages = errorMessages.filter(
      (message) => message != "Invalid filling limit."
    );
  }

  if (errorMessages.length > 0) {
    while (error.children.length > 0) {
      error.removeChild(error.lastElementChild);
      firstChild = error.firstChild;
    }
    window.scrollTo(0, 0);
    console.log(errorMessages);
    e.preventDefault();
    error.style.display = "block";
    errorMessages.forEach((message) => {
      const errorParagraph = document.createElement("p");
      errorParagraph.textContent = message;
      error.appendChild(errorParagraph);
    });
    return;
  }
  today = new Date();

  const modalTitle = document.createElement("h3");
  modalTitle.className = "inner-modal-settings-list-title";
  modalTitle.textContent = "Please check the entered data:";
  settingsListDiv.appendChild(modalTitle);
  const lineBreak = document.createElement("br");
  settingsListDiv.appendChild(lineBreak);
  const unitsType = document.createElement("p");
  unitsType.textContent = `Measuring unit: ${unitsInput.value}`;
  settingsListDiv.appendChild(unitsType);

  const mediumType = document.createElement("p");
  if (densityInput.value == "Custom") {
    mediumType.textContent = `Medium type: Custom (${densityPicker.value} kg/m3)`;
  } else {
    mediumType.textContent = `Medium type: ${densityInput.value}`;
  }
  settingsListDiv.appendChild(mediumType);
  const maximumHeight = document.createElement("p");
  maximumHeight.textContent = `Tank height [m]: ${maxHeight.value}`;
  settingsListDiv.appendChild(maximumHeight);
  const maximumVolume = document.createElement("p");
  maximumVolume.textContent = `Tank volume [l]: ${maxVolume.value}`;
  settingsListDiv.appendChild(maximumVolume);
  const tankShapeInput = document.createElement("p");
  tankShapeInput.textContent = `Tank shape: ${tankShape.value}`;
  settingsListDiv.appendChild(tankShapeInput);
  if (tankShape.value == "Custom") {
    heightsAndVolumes.length = 0;
    const customHeightVolumePairs = document.createElement("p");
    customHeights = customHeights.filter((el) => !el[0].includes("volume"));
    customVolumes = customVolumes.filter((el) => !el[0].includes("height"));
    let currentHeightId = "";
    let uniqueHeights = [];
    customHeights.forEach((height) => {
      if (height[0] != currentHeightId) {
        currentHeightId = height[0];
        uniqueHeights.push(height);
      }
    });
    uniqueHeights = uniqueHeights.sort();
    let currentVolumeId = "";
    let uniqueVolumes = [];
    customVolumes.forEach((volume) => {
      if (volume[0] != currentVolumeId) {
        currentVolumeId = volume[0];
        uniqueVolumes.push(volume);
      }
    });
    uniqueVolumes = uniqueVolumes.sort();
    for (let i = 0; i < uniqueHeights.length; i++) {
      const height = uniqueHeights[i][1];
      for (let j = 0; j < uniqueVolumes.length; j++) {
        const volume = uniqueVolumes[j][1];
        if (j == i) {
          heightsAndVolumes.push(`(${height} m, ${volume} l)`);
          break;
        }
      }
    }
    customHeightVolumePairs.textContent = `Height - Volume pairs: ${heightsAndVolumes.join(
      ", "
    )}`;
    settingsListDiv.appendChild(customHeightVolumePairs);
  }
  const fillingLimit = document.createElement("p");
  fillingLimit.textContent = `Filling limit [%]: ${maxFilling.value}`;
  settingsListDiv.appendChild(fillingLimit);
  modal.style.display = "block";
};
const cancelAndExitModal = (e) => {
  e.preventDefault();
  modal.style.display = "none";
  while (
    settingsListDiv.lastChild
  ) {
    settingsListDiv.removeChild(settingsListDiv.lastChild);
  }
};

const submitModalForm = (e) => {
  e.preventDefault();

  window.location.href = "success.html";

  modal.style.display = "none";
};

window.addEventListener("click", toggleUnitsInput);
window.addEventListener("click", toggleTankShapeInput);
window.addEventListener("click", toggleMediaInput);
densityPicker.addEventListener("input", validateUserInput);
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
maxHeight.addEventListener("input", validateUserInput);
maxHeight.addEventListener("input", saveIntoCustomMaxHeight);
maxVolume.addEventListener("keypress", (event) => {
  if (event.key === "." || event.key === "-") {
    event.preventDefault();
  }
});
maxVolume.addEventListener("input", validateUserInput);
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
customMaxHeight2.addEventListener("input", validateUserInput);
customMaxVolume2.addEventListener("input", validateUserInput);
customMaxHeight2.addEventListener("input", storeIntoCustomArray);
customMaxVolume2.addEventListener("input", storeIntoCustomArray);
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
maxFilling.addEventListener("input", validateUserInput);
form.addEventListener("submit", submitSettingsForm);
modalXButton.addEventListener("click", cancelAndExitModal);
modalCancelButton.addEventListener("click", cancelAndExitModal);
modalOkButton.addEventListener("click", submitModalForm);
