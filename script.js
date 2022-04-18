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

// const radioButtonBoxDiv = document.querySelector(".radio-button-box-div");
// const unitsDiv = document.querySelector(".units-div");
// const percentRadioButton = document.querySelector("#percent");
// const meterRadioButton = document.querySelector("#meter");
// const literRadioButton = document.querySelector("#liter");
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
// let selectedValue = document.querySelector(".density-input").value;
const densityPicker = document.querySelector("#density-picker");
const maxHeight = document.querySelector("#max-height");
const maxVolume = document.querySelector("#max-volume")
const tankShape = document.querySelector(".tank-shape-input");
const customTankShapeOption = document.querySelector("#custom");
// const tankType = document.querySelector("#type");
const maxFilling = document.querySelector("#max-fill");
// const interval = document.querySelector("#interval");
const settingsListDiv = document.querySelector(".inner-modal-settings-list");

// options.forEach((option) => {
//   option.addEventListener("click", () => {
//     return customTankShape(option.textContent);
//   });
//   option.addEventListener("click", validateUserInput);
// });

const validateUserInput = (e) => {
  // error.textContent = "";
  // errorMessages.length = 0;
  let userInput = e.target.value != "" ? Number.parseFloat(e.target.value) : "";
  console.log(e.target);
  console.log(userInput);

  // if (e.target == percentRadioButton || e.target == meterRadioButton  || e.target == literRadioButton) {
  // if (percentRadioButton.checked == true || meterRadioButton.checked == true || literRadioButton.checked == true) {
  //   radioButtonBoxDiv.style.borderColor = "rgb(255, 255, 255)";
  //   errorMessages = errorMessages.filter(message => message != "Units must be picked.");
  //   // error.textContent = errorMessages.join(" ");
  // }
  // }
  if (e.target.className == "units-option-element") {
    if (unitsInput.value == "" || unitsInput.value == undefined) {
      errorMessages = errorMessages.filter(message => message != "Units are required.");
    unitsInput.style.borderColor = "red";
    errorMessages.push("Units are required.");
    error.style.display = "block";
    error.style.color = "red";
    error.style.fontWeight = "900";
  } else {
    unitsInput.style.borderColor = "black";
    errorMessages = errorMessages.filter(message => message != "Units are required.");
  }
  }
 else if (e.target.className == "media-option-element") {
  if (densityInput.value == "" || densityInput.value == undefined) {
    errorMessages = errorMessages.filter(message => message != "Media is required.");
  densityInput.style.borderColor = "red";
  errorMessages.push("Media is required.");
  error.style.display = "block";
  error.style.color = "red";
  error.style.fontWeight = "900";
} else {
  densityInput.style.borderColor = "black";
  errorMessages = errorMessages.filter(message => message != "Media is required.");
}
} else if (e.target == densityPicker) {
    if ((userInput < 0 || densityPicker.value == undefined || densityPicker.value == "") && densityPicker.disabled == false) {
      errorMessages = errorMessages.filter(message => message != "Invalid density input.");
      errorMessages.push("Invalid density input.");
      e.target.style.borderColor = "red";
      error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
    } else {
      e.target.style.borderColor = "black";
     errorMessages = errorMessages.filter(message => message != "Invalid density input.");
    }
  } else if (e.target == maxHeight) {
    if (userInput < 0 || userInput > 2.5 || userInput == undefined || userInput == "") {
      errorMessages = errorMessages.filter(message => message != "Invalid tank height input.");
      errorMessages.push("Invalid tank height input.");
      e.target.style.borderColor = "red";
      error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
    } else {
      e.target.style.borderColor = "black";
      errorMessages = errorMessages.filter(message => message != "Invalid tank height input.");
    }
  } else if (e.target == maxVolume) {
    if (userInput < 0 || userInput > 2500 || userInput == undefined || userInput == "") {
      errorMessages = errorMessages.filter(message => message != "Invalid tank volume input.");
      errorMessages.push("Invalid tank volume input.");
      e.target.style.borderColor = "red";
      error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
    } else {
      e.target.style.borderColor = "black";
      errorMessages = errorMessages.filter(message => message != "Invalid tank volume input.");
    }
  } else if (e.target.className == "shape-option-element") {
      errorMessages = errorMessages.filter(message => message != "Tank shape is required.");
      tankShape.style.borderColor = "black";
  } else if (e.target == customMaxHeight2 || e.target == customMaxVolume2) {
    otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(element => element.id != customMaxHeight2.id);
    otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(element => element.id != customMaxVolume2.id);
    if (e.target == customMaxHeight2) {
    if (userInput < 0 || userInput > 2.5 || userInput == "" || userInput == undefined) {
      errorMessages = errorMessages.filter(message => message != "Invalid inputs in custom tank shape height/volume table.");
      errorMessages.push("Invalid inputs in custom tank shape height/volume table.");
      otherCustomMaxHeightsAndVolumes.push({id: e.target.id, value: e.target.value != "" ? Number.parseFloat(e.target.value): ""});
      e.target.style.borderColor = "red";
      error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
    } else {
      customHeights = customHeights.filter(height => height[0] != e.target.id);
      e.target.style.borderColor = "black";
      errorMessages = errorMessages.filter(message => message != "Invalid inputs in custom tank shape height/volume table.");
      otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(element => element.id != customMaxHeight2.id);
      customHeights.push([e.target.id, e.target.value]);
    }
  } else if (e.target == customMaxVolume2) { 
      if (userInput < 0 || userInput > 2500 || userInput == "" || userInput == undefined) {
      errorMessages = errorMessages.filter(message => message != "Invalid inputs in custom tank shape height/volume table.");
      errorMessages.push("Invalid inputs in custom tank shape height/volume table.");
      otherCustomMaxHeightsAndVolumes.push({id: e.target.id, value: e.target.value != "" ? Number.parseFloat(e.target.value): ""});
      e.target.style.borderColor = "red";
      error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
    } else {
      customVolumes = customVolumes.filter(volume => volume[0] != e.target.id);
      e.target.style.borderColor = "black";
      errorMessages = errorMessages.filter(message => message != "Invalid inputs in custom tank shape height/volume table.");
      otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(element => element.id != customMaxVolume2.id);
      customVolumes.push([e.target.id, e.target.value]);
    }
  }
  } else if (otherCustomMaxHeightsAndVolumes.length > 0) {
    console.log(otherCustomMaxHeightsAndVolumes);
    otherCustomMaxHeightsAndVolumes.forEach(el => {
      const inputField = document.querySelector(`#${el.id}`);
      console.log(inputField.id);
      if (inputField.id.includes("height")) {
        if (inputField.value == "" || inputField.value == undefined || inputField.value < 0 || inputField.value > 2.5) {
          errorMessages = errorMessages.filter(message => message != "Invalid inputs in custom tank shape height/volume table.");
          errorMessages.push("Invalid inputs in custom tank shape height/volume table.");
          otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(element => element.id != el.id);
          otherCustomMaxHeightsAndVolumes.push({id: inputField.id, value: inputField.value != "" ? Number.parseFloat(inputField.value): ""});
      inputField.style.borderColor = "red";
      error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
        } else {
          customHeights = customHeights.filter(height => height[0] != inputField.id);
          inputField.style.borderColor = "black";
          otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(element => element.id != el.id);
          customHeights.push([inputField.id, inputField.value]);
        }
      } else if (inputField.id.includes("volume")) {
        if (inputField.value == "" || inputField.value == undefined || inputField.value < 0 || inputField.value > 2500) {
          errorMessages = errorMessages.filter(message => message != "Invalid inputs in custom tank shape height/volume table.");
          errorMessages.push("Invalid inputs in custom tank shape height/volume table.");
          otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(element => element.id != el.id);
          otherCustomMaxHeightsAndVolumes.push({id: inputField.id, value: inputField.value != "" ? Number.parseFloat(inputField.value): ""});
      inputField.style.borderColor = "red";
      error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
        } else {
          customVolumes = customVolumes.filter(volume => volume[0] != inputField.id);
          inputField.style.borderColor = "black";
          otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(element => element.id != el.id);
          customVolumes.push([inputField.id, inputField.value]);
        }
      } else {
        errorMessages = errorMessages.filter(message => message != "Invalid inputs in custom tank shape height/volume table.");
      }
    });
    console.log(otherCustomMaxHeightsAndVolumes);
    if (otherCustomMaxHeightsAndVolumes.length == 0) {
      errorMessages = errorMessages.filter(message => message != "Invalid inputs in custom tank shape height/volume table.");
    }
  } else if (e.target == maxFilling) {
    if (userInput == "Choose..." || userInput == "" || userInput == undefined || userInput < 0 || userInput > 100) {
      errorMessages = errorMessages.filter(message => message != "Error input in maximum filling.");
      errorMessages.push("Error input in maximum filling.");
      maxFilling.style.borderColor = "red";
      error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
  } else {
    maxFilling.style.borderColor = "black";
    errorMessages = errorMessages.filter(message => message != "Error input in maximum filling.");
    console.log(errorMessages);
  }
}

  if (errorMessages.length > 0) {
    let firstChild = error.firstChild;
    while (error.children.length > 0) {
        error.removeChild(firstChild);
        firstChild = error.firstChild;
    }
    // window.scrollTo(0, 0);
    console.log(errorMessages);
    // while(error.children.length > 0) {
    //   error.removeChild(error.children[0]);
    // }
    console.log(error);
    e.preventDefault();
    error.style.display = "block";
    //  error.textContent = errorMessages.join(" ");
    errorMessages.forEach(message => { 
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

// const innerDivIds = [];



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
  otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(element => element.id != e.target.id);
  otherCustomMaxHeightsAndVolumes.push({id: e.target.id, value: e.target.value != "" ? Number.parseFloat(e.target.value): ""});
}

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
  // selectedValue = id.trim();
  // console.log(selectedValue);
  if (id.trim() == "User specific density") {
    customAdjustment.style.display = "flex";
    densityPicker.disabled = false;
    // densityPicker.setAttribute("required");
  } else {
    // densityPicker.value = 0;
    // densityPicker.disabled = true;
    densityPicker.value = null;
    // densityPicker.removeAttribute("required");
    customAdjustment.style.display = "none";
    densityPicker.disabled = true;
  }
  densityInput.value = id.trim();
};

const customTankShape = (id) => {
  customMaxHeight.value = 0;
  customMaxVolume.value = 0;
  if (id.trim() === "Custom tank shape") {
    shapeAdjustment.style.display = "block";
    // customMaxHeight.disabled = false;
    // customMaxVolume.disabled = false;
    customMaxHeight2.disabled = false;
    customMaxHeight2.value = "";
    customMaxVolume2.disabled = false;
    customMaxVolume2.value = "";
    customHeightMax.disabled = true;
    customVolumeMax.disabled = true;
    addAnotherButton.style.display = "block";
    deleteButton.style.display = "none";
    otherCustomMaxHeightsAndVolumes.push({id: customMaxHeight2.id, value: customMaxHeight2.value}, {id: customMaxVolume2.id, value: customMaxVolume2.value});
  } else {
    while(counter > 3) {
        document.querySelector(`#custom-tank-shape-adjustment-inner${counter-1}`).remove();
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
  // const heightLabel = document.createElement("label");
  // const volumeLabel = document.createElement("label");
  const heightInput = document.createElement("input");
  const volumeInput = document.createElement("input");
  const buttonsDiv = document.createElement("div");
  const addButton = document.createElement("input");
  const deleteButton = document.createElement("input");

  innerDiv.className = "custom-tank-shape-adjustment-inner";
  innerDiv.id = "custom-tank-shape-adjustment-inner" + counter;

  // heightLabel.className = "label";
  // heightLabel.setAttribute("for", "custom-max-height");
  // heightLabel.innerText = "Height [m]:";

  // volumeLabel.className = "label";
  // volumeLabel.setAttribute("for", "custom-max-volume");
  // volumeLabel.innerText = "Volume [l]:";

  heightInput.type = "number";
  heightInput.id = `custom-max-height${counter}`;
  heightInput.name = `custom-max-height${counter}`;
  heightInput.placeholder = "Insert value...";
  heightInput.step = "0.01";
  heightInput.value = "";
  heightInput.addEventListener("input", validateUserInput);
  heightInput.addEventListener("input", storeIntoCustomArray);
  // heightInput.setAttribute("required");

  volumeInput.type = "number";
  volumeInput.id = `custom-max-volume${counter}`;
  volumeInput.name = `custom-max-volume${counter}`;
  volumeInput.placeholder = "Insert value...";
  volumeInput.value = "";
  volumeInput.step = "0.01";
  volumeInput.addEventListener("input", validateUserInput);
  volumeInput.addEventListener("input", storeIntoCustomArray);
  // heightInput.setAttribute("required");

  otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(element => element.id != heightInput.id); 
  otherCustomMaxHeightsAndVolumes = otherCustomMaxHeightsAndVolumes.filter(element => element.id != volumeInput.id);
  otherCustomMaxHeightsAndVolumes.push({id: heightInput.id, value: heightInput.value}, {id: volumeInput.id, value: volumeInput.value});

  buttonsDiv.className = "custom-buttons";

  addButton.className = "custom-button";
  addButton.id = "add-another" + counter;
  addButton.type = "button";
  addButton.value = "+";
  addButton.onclick = addAnotherCustomTankShape;

  deleteButton.className = "custom-button";
  deleteButton.id = "delete" + counter;
  deleteButton.type = "button";
  deleteButton.value = "-";
  deleteButton.onclick = () => deleteCustomTankShape(innerDiv.id);

  // innerDiv.appendChild(heightLabel);
  innerDiv.appendChild(heightInput);
  // innerDiv.appendChild(volumeLabel);
  innerDiv.appendChild(volumeInput);
  buttonsDiv.appendChild(addButton);
  buttonsDiv.appendChild(deleteButton);
  innerDiv.appendChild(buttonsDiv);

  document.querySelector(".custom-tank-shape-adjustment").insertBefore(innerDiv, shapeAdjustmentInnerMax);
  counter++;
  if (counter > 16) {
    document.querySelector("#add-another" + (counter - 1)).style.display =
      "none";
    return;
  }
};

const deleteCustomTankShape = (id) => {
  // heightsAndVolumes.pop();
  // console.log(heightsAndVolumes);
  counter--;

  document.querySelector("#add-another" + (counter - 1)).style.display =
    "block";
  document.querySelector("#delete" + (counter - 1)).style.display = "block";
  if (id === "custom-tank-shape-adjustment-inner3") {
    document.querySelector("#delete2").style.display = "none";
  }
  // if (document.querySelector("#" + id).children[0].style.borderColor === "red") {
  //  const emptyHeightIndex = errorMessages.lastIndexOf('Height is required.');
  //  const tooBigHeightIndex = errorMessages.lastIndexOf('Height is too big.');
  //  const tooSmallHeightIndex = errorMessages.lastIndexOf('Height cannot be negative.');
  //  if (emptyHeightIndex > tooBigHeightIndex && emptyHeightIndex > tooSmallHeightIndex) {
  //   errorMessages.splice(emptyHeightIndex, 1);
  //   error.textContent = "";
  //  error.textContent = errorMessages.join(" ");
  //  } else if (tooBigHeightIndex > emptyHeightIndex && tooBigHeightIndex > tooSmallHeightIndex) {
  //   errorMessages.splice(tooBigHeightIndex, 1);
  //   error.textContent = "";
  //  error.textContent = errorMessages.join(" ");
  //  } else if (tooSmallHeightIndex > emptyHeightIndex && tooSmallHeightIndex > tooBigHeightIndex) {
  //   errorMessages.splice(tooSmallHeightIndex, 1);
  //   error.textContent = "";
  //  error.textContent = errorMessages.join(" ");
  //  }
  // } 
  // if ( document.querySelector("#" + id).children[1].style.borderColor === "red" ) {
  //   const emptyVolumeIndex = errorMessages.lastIndexOf('Volume is required.');
  //   const tooBigVolumeIndex = errorMessages.lastIndexOf('Volume is too big.');
  //  const tooSmallVolumeIndex = errorMessages.lastIndexOf('Volume cannot be negative.');
  //  if (emptyVolumeIndex > tooBigVolumeIndex && emptyVolumeIndex > tooSmallVolumeIndex) {
  //   errorMessages.splice(emptyVolumeIndex, 1);
  //   error.textContent = "";
  //  error.textContent = errorMessages.join(" ");
  //  } else if (tooBigVolumeIndex > emptyVolumeIndex && tooBigVolumeIndex > tooSmallVolumeIndex) {
  //   errorMessages.splice(tooBigVolumeIndex, 1);
  //   error.textContent = "";
  //  error.textContent = errorMessages.join(" ");
  //  } else if (tooSmallVolumeIndex > emptyVolumeIndex && tooSmallVolumeIndex > tooBigVolumeIndex) {
  //   errorMessages.splice(tooSmallVolumeIndex, 1);
  //   error.textContent = "";
  //  error.textContent = errorMessages.join(" ");
  //  }
  // }
  document
    .querySelector(".custom-tank-shape-adjustment")
    .removeChild(document.querySelector("#" + id));
  otherCustomMaxHeightsAndVolumes.pop();
  otherCustomMaxHeightsAndVolumes.pop();
  customHeights.pop();
  customVolumes.pop();
  
  console.log("In the delete block:");
  console.log(customHeights);
  console.log(customVolumes);
  console.log(heightsAndVolumes);
  console.log(otherCustomMaxHeightsAndVolumes);
  console.log(errorMessages);
};

const submitSettingsForm = (e) => {
  e.preventDefault();
  errorMessages.length = 0;
  error.textContent = "";
  console.log(otherCustomMaxHeightsAndVolumes);
  if ((otherCustomMaxHeightsAndVolumes.length > 0) && ((otherCustomMaxHeightsAndVolumes.length % 2) != 0)) {
    otherCustomMaxHeightsAndVolumes.pop();
    console.log(otherCustomMaxHeightsAndVolumes);
  }

  // if (percentRadioButton.checked == false && meterRadioButton.checked == false && literRadioButton.checked == false) {
  //   radioButtonBoxDiv.style.borderColor = "red";
  //   errorMessages.push("Units must be picked.");
  //   error.style.display = "block";
  //   error.style.color = "red";
  //   error.style.fontWeight = "900";
  // } else {
  //   radioButtonBoxDiv.style.borderColor = "rgb(255, 255, 255)";
  //   errorMessages = errorMessages.filter(message => message != "Units must be picked.");
  // }

  if (unitsInput.value == "" || unitsInput.value == undefined) {
    errorMessages = errorMessages.filter(message => message != "Units are required.");
  unitsInput.style.borderColor = "red";
  errorMessages.push("Units are required.");
  error.style.display = "block";
  error.style.color = "red";
  error.style.fontWeight = "900";
} else {
  unitsInput.style.borderColor = "black";
  errorMessages = errorMessages.filter(message => message != "Units are required.");
}

  if (densityInput.value === "" || densityInput.value == undefined) {
    errorMessages = errorMessages.filter(message => message != "Media is required.");
    densityInput.style.borderColor = "red";
    errorMessages.push("Media is required.");
    error.style.display = "block";
    error.style.color = "red";
    error.style.fontWeight = "900";
  } else {
    densityInput.style.borderColor = "black";
    errorMessages = errorMessages.filter(message => message != "Media is required.");
  }

    if ((densityPicker.value == undefined || densityPicker.value == "") && densityPicker.disabled == false) {
      // errorMessages = errorMessages.filter(message => message != "Density is required.");
      errorMessages = errorMessages.filter(message => message != "Invalid density input.");
      densityPicker.style.borderColor = "red";
      // errorMessages.push("Density is required.");
      errorMessages.push("Invalid density input.");
      // errorMessages = errorMessages.filter(message => message != "Density value cannot be negative.");
      error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
    } else if (densityPicker.value < 0 && densityPicker.disabled == false) {
      // errorMessages = errorMessages.filter(message => message != "Density value cannot be negative.");
      errorMessages = errorMessages.filter(message => message != "Invalid density input.");
      densityPicker.style.borderColor = "red";
      // errorMessages.push("Density value cannot be negative.");
      errorMessages.push("Invalid density input.");
      // errorMessages = errorMessages.filter(message => message != "Density is required.");
      
      error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
    } else {
      densityPicker.style.borderColor = "black";
      // errorMessages = errorMessages.filter(message => message != "Density is required.");
      // errorMessages = errorMessages.filter(message => message != "Density value cannot be negative.");
      errorMessages = errorMessages.filter(message => message != "Invalid density input.");
    }

    if (maxHeight.value == "" || maxHeight.value == undefined || maxHeight.value < 0 || maxHeight.value > 2.5) {
      maxHeight.style.borderColor = "red";
      errorMessages.push("Invalid tank height input.");
      // errorMessages.push("Tank height is required.");
      // errorMessages.filter(message => message != "Tank height value cannot be negative.");
      // errorMessages.filter(message => message != "Tank height value cannot be more than 2.5 meters.");
      error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
    // } else if (maxHeight.value < 0) {
    //   maxHeight.style.borderColor = "red";
    //   errorMessages.push("Invalid tank height input.");
    //   // errorMessages.push("Tank height value cannot be negative.");
    //   // errorMessages.filter(message => message != "Tank height is required.");
    //   // errorMessages.filter(message => message != "Tank height value cannot be more than 2.5 meters.");
    //   error.style.display = "block";
    //   error.style.color = "red";
    //   error.style.fontWeight = "900";
    // } else if (maxHeight.value > 2.5) {
    //   maxHeight.style.borderColor = "red";
    //   errorMessages.push("Invalid tank height input.");
    //   // errorMessages.push("Tank height value cannot be more than 2.5 meters.");
    //   // errorMessages.filter(message => message != "Tank height is required.");
    //   // errorMessages.filter(message => message != "Tank height value cannot be negative.");
    //   error.style.display = "block";
    //   error.style.color = "red";
    //   error.style.fontWeight = "900";
    } else {
      maxHeight.style.borderColor = "black";
      errorMessages = errorMessages.filter(message => message != "Invalid tank height input.");
      // errorMessages.filter(message => message != "Tank height is required.");
      // errorMessages.filter(message => message != "Tank height value cannot be negative.");
      // errorMessages.filter(message => message != "Tank height value cannot be more than 2.5 meters.");
    }

    if (maxVolume.value == "" || maxVolume.value == undefined || maxVolume.value < 0 || maxVolume.value > 2500) {
      maxVolume.style.borderColor = "red";
      errorMessages.push("Invalid tank volume input.");
      // errorMessages.push("Tank volume is required.");
      // errorMessages.filter(message => message != "Tank volume value cannot be negative.");
      // errorMessages.filter(message => message != "Tank volume value cannot be more than 2500 liters.");
      error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
    // } else if (maxVolume.value < 0) {
    //   maxVolume.style.borderColor = "red";
    //   errorMessages.push("Invalid tank volume input.");
    //   // errorMessages.push("Tank volume value cannot be negative.");
    //   // errorMessages.filter(message => message != "Tank volume is required.");
    //   // errorMessages.filter(message => message != "Tank volume value cannot be more than 2500 liters.");
    //   error.style.display = "block";
    //   error.style.color = "red";
    //   error.style.fontWeight = "900";
    // } else if (maxVolume.value > 2500) {
    //   maxVolume.style.borderColor = "red";
    //   errorMessages.push("Invalid tank volume input.");
    //   // errorMessages.push("Tank volume value cannot be more than 2500 liters.");
    //   // errorMessages.filter(message => message != "Tank volume is required.");
    //   // errorMessages.filter(message => message != "Tank volume value cannot be negative.");
    //   error.style.display = "block";
    //   error.style.color = "red";
    //   error.style.fontWeight = "900";
    } else {
      maxVolume.style.borderColor = "black";
      errorMessages = errorMessages.filter(message => message != "Invalid tank volume input.");
      // errorMessages.filter(message => message != "Tank volume is required.");
      // errorMessages.filter(message => message != "Tank volume value cannot be more than 2500 liters.");
      // errorMessages.filter(message => message != "Tank volume value cannot be negative.");
    }

  if (tankShape.value == "Choose..." || tankShape.value == "" || tankShape.value == undefined) {
      tankShape.style.borderColor = "red";
      errorMessages.push("Tank shape is required.");
      error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
  } else {
    tankShape.style.borderColor = "black";
    errorMessages = errorMessages.filter(message => message != "Tank shape is required.");
  }

  // validation for custom-max-height2 and custom-max-volume2 fields
  // if (customMaxHeight2.value == "" || customMaxHeight2.value > 2.5 || customMaxHeight2.value < 0 ) {
  //   customMaxHeight2.style.borderColor = "red";
  //     errorMessages.push("Invalid inputs in custom tank shape height/volume table.");
  //     error.style.display = "block";
  //     error.style.color = "red";
  //     error.style.fontWeight = "900";
  // } else {
  //   customMaxHeight2.style.borderColor = "black";
  //   errorMessages.filter(message => message != "Invalid inputs in custom tank shape height/volume table.");
  // }

  // if (customMaxVolume2.value == "" || customMaxVolume2.value > 2.5 || customMaxVolume2.value < 0 ) {
  //   customMaxVolume2.style.borderColor = "red";
  //     errorMessages.push("Invalid inputs in custom tank shape height/volume table.");
  //     error.style.display = "block";
  //     error.style.color = "red";
  //     error.style.fontWeight = "900";
  // } else {

  // }

  if (otherCustomMaxHeightsAndVolumes.length > 0) {
    errorMessages = errorMessages.filter(message => message != "Invalid inputs in custom tank shape height/volume table.");
    customTankShapeError = false;
    // errorMessages.filter(message => message != "Height is required.");
    // errorMessages.filter(message => message != "Height is too big.");
    // errorMessages.filter(message => message != "Height cannot be negative.");
    // errorMessages.filter(message => message != "Volume is required.");
    // errorMessages.filter(message => message != "Volume is too big.");
    // errorMessages.filter(message => message != "Volume cannot be negative.");
   otherCustomMaxHeightsAndVolumes.forEach(element => {
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
          // heightEmptyErrorCounter++;
          inputField.style.borderColor = "red";
          if (heightEmptyErrorCounter == 1) {
            // errorMessages.push("Height is required.");
            // errorMessages.filter(message => message != "Height is too big.");
            // errorMessages.filter(message => message != "Height cannot be negative.");
            error.style.display = "block";
        error.style.color = "red";
        error.style.fontWeight = "900";
          }
    } else if (element.value > 2.50) {
      customTankShapeError = true;
      // heightTooBigNumErrorCounter++;
      inputField.style.borderColor = "red";
      if (heightTooBigNumErrorCounter == 1) {
        // errorMessages.push("Height is too big.");
        // errorMessages.filter(message => message != "Height is required.");
        // errorMessages.filter(message => message != "Height cannot be negative.");
        error.style.display = "block";
        error.style.color = "red";
        error.style.fontWeight = "900";
      }
    } else if (element.value < 0) {
      customTankShapeError = true;
      // heightTooSmallNumErrorCounter++;
      inputField.style.borderColor = "red";
      if (heightTooSmallNumErrorCounter == 1) {
        // errorMessages.push("Height cannot be negative.");
        // errorMessages.filter(message => message != "Height is required.");
        // errorMessages.filter(message => message != "Height is too big.");
        error.style.display = "block";
        error.style.color = "red";
        error.style.fontWeight = "900";
    } 
   } else {
      console.log(inputField);
      customHeights.push([inputField.id, inputField.value]);
      inputField.style.borderColor = "black";
      heightEmptyErrorCounter--;
      if (heightEmptyErrorCounter == 0) {
        // errorMessages.filter(message => message != "Height is required.");
        inputField.style.borderColor = "black";
      } 
      heightTooBigNumErrorCounter--;
      if (heightTooBigNumErrorCounter == 0) {
        // errorMessages.filter(message => message != "Height is too big.");
        inputField.style.borderColor = "black";
      } 
      heightTooSmallNumErrorCounter--;
      if (heightTooSmallNumErrorCounter == 0) {
        // errorMessages.filter(message => message != "Height cannot be negative.");
        inputField.style.borderColor = "black";
      }
    }
      }
     else if (element.id.includes("volume")) {
      if (element.value == "" || element.value == undefined) {
        customTankShapeError = true;
        // volumeEmptyErrorCounter++;
        inputField.style.borderColor = "red";
        if (volumeEmptyErrorCounter == 1) {
          // errorMessages.push("Volume is required.");
          // errorMessages.filter(message => message != "Volume is too big.");
          // errorMessages.filter(message => message != "Volume cannot be negative.");
          error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
        }
  } else if (element.value > 2500) {
    customTankShapeError = true;
    // volumeTooBigNumErrorCounter++;
    inputField.style.borderColor = "red";
    if (volumeTooBigNumErrorCounter == 1) {
      // errorMessages.push("Volume is too big.");
      // errorMessages.filter(message => message != "Volume is required.");
      // errorMessages.filter(message => message != "Volume cannot be negative.");
      error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
    }
  } else if (element.value < 0) {
    customTankShapeError = true;
    // volumeTooSmallNumErrorCounter++;
    inputField.style.borderColor = "red";
    if (volumeTooSmallNumErrorCounter == 1) {
      // errorMessages.push("Volume cannot be negative.");
      // errorMessages.filter(message => message != "Volume is required.");
      // errorMessages.filter(message => message != "Volume is too big.");
      error.style.display = "block";
      error.style.color = "red";
      error.style.fontWeight = "900";
  } 
 } else {
    customVolumes.filter(volume => volume[0] != inputField.id);
    customVolumes.push([inputField.id, inputField.value]);
    inputField.style.borderColor = "black";
    volumeEmptyErrorCounter--;
    if (volumeEmptyErrorCounter == 0) {
      // errorMessages.filter(message => message != "Volume is required.");
      inputField.style.borderColor = "black";
    } 
    volumeTooBigNumErrorCounter--;
    if (volumeTooBigNumErrorCounter == 0) {
      // errorMessages.filter(message => message != "Volume is too big.");
      inputField.style.borderColor = "black";
    } 
    volumeTooSmallNumErrorCounter--;
    if (volumeTooSmallNumErrorCounter == 0) {
      // errorMessages.filter(message => message != "Volume cannot be negative.");
      inputField.style.borderColor = "black";
    }
  }
    }
    if ( heightEmptyErrorCounter > 0 || heightTooBigNumErrorCounter > 0 ||  heightTooSmallNumErrorCounter > 0 || volumeEmptyErrorCounter > 0 || volumeTooBigNumErrorCounter > 0 || volumeTooSmallNumErrorCounter > 0) {
      customTankShapeError = true;
    }
  });
  if (customTankShapeError) {
    errorMessages.push("Invalid inputs in custom tank shape height/volume table.");
  error.style.display = "block";
  error.style.color = "red";
  error.style.fontWeight = "900";
  }
  }

  if (maxFilling.value == "Choose..." || maxFilling.value == "" || maxFilling.value == undefined) {
    maxFilling.style.borderColor = "red";
    errorMessages.push("Error input in maximum filling.");
    error.style.display = "block";
    error.style.color = "red";
    error.style.fontWeight = "900";
} else {
  maxFilling.style.borderColor = "black";
  errorMessages = errorMessages.filter(message => message != "Error input in maximum filling.");
}

  if (errorMessages.length > 0) {
    while(error.children.length > 0) {
      error.removeChild(error.lastElementChild);
      firstChild = error.firstChild;
    }
    window.scrollTo(0, 0);
    console.log(errorMessages);
    e.preventDefault();
    error.style.display = "block";
    // error.textContent = errorMessages.join(" ");
    errorMessages.forEach(message => {
      const errorParagraph = document.createElement("p");
      errorParagraph.textContent = message;
      error.appendChild(errorParagraph);
    });
    return;
  }
  today = new Date();

  

  const unitsType = document.createElement("p");
  unitsType.textContent = `Measure unit: ${unitsInput.value}`;
  settingsListDiv.appendChild(unitsType);

  const mediumType = document.createElement("p");
  // mediumType.textContent = `Medium type: ${densityInput.value}`;
  if (densityInput.value == "User specific density") {
    // const density = document.createElement("p");
    // density.textContent = `Density [kg/m3]: ${densityPicker.value}`;
    mediumType.textContent = `User specific density [${densityPicker.value} kg/m3]`;
  } else {
    mediumType.textContent = `Medium type: ${densityInput.value}`;
  }
  settingsListDiv.appendChild(mediumType);
  // mediumType.textContent = `Medium type: ${
  //  selectedValue.options[selectedValue.selectedIndex].text != undefined
  //     ? selectedValue.options[selectedValue.selectedIndex].text
  //     : "No value"
  // }`;
  // if (mediumType.textContext == "User specific density") {
  //   // const density = document.createElement("p");
  //   // density.textContent = `Density [kg/m3]: ${densityPicker.value}`;
  //   mediumType.textContent = `User specific density [${densityPicker.value} kg/m3]`;
  // }
  const maximumHeight = document.createElement("p");
  maximumHeight.textContent = `Tank height [m]: ${maxHeight.value}`;
  settingsListDiv.appendChild(maximumHeight);
  const maximumVolume = document.createElement("p");
  maximumVolume.textContent = `Tank volume [l]: ${maxVolume.value}`;
  settingsListDiv.appendChild(maximumVolume);
  const tankShapeInput = document.createElement("p");
  tankShapeInput.textContent = `Tank shape: ${tankShape.value}`;
  settingsListDiv.appendChild(tankShapeInput);
  // const customHeight = document.createElement("p");
  // customHeight.textContent = `Height [m]: ${customMaxHeight2.value}`;
  // const customVolume = document.createElement("p");
  // customVolume.textContent = `Volume [l]: ${customMaxVolume2.value}`;
  if (tankShape.value == "Custom tank shape") {
    heightsAndVolumes.length = 0;
    const customHeightVolumePairs = document.createElement("p");
    // const heightsAndVolumes = [];
    
    customHeights = customHeights.filter(el =>  !el[0].includes("volume"));
  customVolumes = customVolumes.filter(el =>  !el[0].includes("height"));
  
  let currentHeightId = "";
  let uniqueHeights = [];
  customHeights.forEach(height => {
    if (height[0] != currentHeightId) {
      currentHeightId = height[0];
      uniqueHeights.push(height);
    }
    // currentHeightId = height[0]; 
  });
  uniqueHeights = uniqueHeights.sort();
  
  let currentVolumeId = "";
  let uniqueVolumes = [];
  customVolumes.forEach(volume => {
    if (volume[0] != currentVolumeId) {
      currentVolumeId = volume[0];
      uniqueVolumes.push(volume);
    } 
    // currentVolumeId =volume[0];
  });
  uniqueVolumes = uniqueVolumes.sort();
  
  console.log(`Heights: ${uniqueHeights}; Volumes: ${uniqueVolumes}`);
  console.log(uniqueHeights);
    console.log(uniqueVolumes);
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
  heightsAndVolumes.forEach(el => console.log(el));
  customHeightVolumePairs.textContent = `Height - Volume pairs: ${heightsAndVolumes.join(", ")}`;
  settingsListDiv.appendChild(customHeightVolumePairs);
  // customHeights.forEach(el => console.log(el));
  // customVolumes.forEach(el => console.log(el));
    
  }
  // const tankLocation = document.createElement("p");
  // tankLocation.textContent = `Tank location: ${
  //   tankType.options[tankType.selectedIndex].text != "Choose a type..."
  //     ? tankType.options[tankType.selectedIndex].text
  //     : "No value"
  // }`;
  const fillingLimit = document.createElement("p");
  fillingLimit.textContent = `Filling limit [%]: ${maxFilling.value}`;
  // const timeInterval = document.createElement("p");
  // timeInterval.textContent = `Time interval: ${
  //   interval.options[interval.selectedIndex].text != "Choose an interval..."
  //     ? interval.options[interval.selectedIndex].text
  //     : "No value"
  // }`;
  // const date = document.createElement("p");
  // date.textContent = `Date: ${today}`;

  
  
  // densityPicker.value != "" ? settingsListDiv.appendChild(density) : null;
  // customMaxHeight2.value != "" ? settingsListDiv.appendChild(customHeight) : null;
  // customMaxVolume2.value != "" ? settingsListDiv.appendChild(customVolume) : null;
  // settingsListDiv.appendChild(customHeightVolumePairs);
  // settingsListDiv.appendChild(tankLocation);
  settingsListDiv.appendChild(fillingLimit);
 // settingsListDiv.appendChild(timeInterval);
  // settingsListDiv.appendChild(date);
  modal.style.display = "block";
};

const cancelAndExitModal = (e) => {
  e.preventDefault();
  modal.style.display = "none";
  while (settingsListDiv.firstChild) {
    settingsListDiv.removeChild(settingsListDiv.firstChild);
  };
};

// const submitModalForm = async (e) => {
//   e.preventDefault();

//   const data = {
//     units: {
//       percent: percentRadioButton.checked,
//       meter: meterRadioButton.checked,
//       liter: literRadioButton.checked
//     },
//     date: today,
//     media: {
//       media: densityInput.value,
//       density: densityPicker.value != "" ? densityPicker.value : null,
//     },
//     maxHeight: maxHeight.value,
//     maxVolume: maxVolume.value,
//     tankShape: {
//       tankShape: tankShape.value,
//       customMaxHeight: customMaxHeight.value != "" ? customMaxHeight.value : null,
//       customMaxVolume: customMaxVolume.value != "" ? customMaxVolume.value : null,
//       customMaxHeight2: customMaxHeight2.value != "" ? customMaxHeight2.value : null,
//       customMaxVolume2: customMaxVolume2.value != "" ? customMaxVolume2.value : null,
//       customHeightMax: customHeightMax.value != "" ? customHeightMax.value : null,
//       customVolumeMax: customVolumeMax.value != "" ? customVolumeMax.value : null,
//     },
//     // tankType: tankType.options[tankType.selectedIndex].text,
//     maxFilling: maxFilling.value,
//     // interval: interval.options[interval.selectedIndex].text,
//   };

//   console.log(today);
//   //console.log(selectedValue.options[selectedValue.selectedIndex].text);
//   //console.log(densityPicker.value);
//   console.log(maxHeight.value);
//   console.log(maxVolume.value);
//   console.log(customMaxHeight.value);
//   console.log(customMaxVolume.value);
//   // console.log(tankType.options[tankType.selectedIndex].text);
//   console.log(maxFilling.value);
//   //console.log(interval.options[interval.selectedIndex].text);

//   await fetch("http://localhost:3000/tank-settings", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   })
//     .then((response) => console.log(response))
//     .catch((err) => console.log(err));

//   modal.style.display = "none";
// };

const submitModalForm = async (e) => {
  e.preventDefault();
  modal.style.display = "none";
};

window.addEventListener("click", toggleUnitsInput);
window.addEventListener("click", toggleTankShapeInput);
window.addEventListener("click", toggleMediaInput);
// percentRadioButton.addEventListener("input", validateUserInput);
// meterRadioButton.addEventListener("input", validateUserInput);
// literRadioButton.addEventListener("input", validateUserInput);
// densityInput.addEventListener("input", validateUserInput);
densityPicker.addEventListener("input", validateUserInput);
maxHeight.addEventListener("input", validateUserInput);
maxHeight.addEventListener("input", saveIntoCustomMaxHeight);
maxVolume.addEventListener("input", validateUserInput);
maxVolume.addEventListener("input", saveIntoCustomMaxVolume);
densityInput.addEventListener("change", customDensity);
// densityInput.addEventListener("change", validateUserInput);
densityInput.addEventListener("focus", addReadonly);
tankShape.addEventListener("focus", addReadonly);
tankShape.addEventListener("change", customTankShape);
// tankShape.addEventListener("click", validateUserInput);
customMaxHeight2.addEventListener("input", validateUserInput);
customMaxVolume2.addEventListener("input", validateUserInput);
customMaxHeight2.addEventListener("input", storeIntoCustomArray);
customMaxVolume2.addEventListener("input", storeIntoCustomArray);
maxFilling.addEventListener("input", validateUserInput);
form.addEventListener("submit", submitSettingsForm);
modalXButton.addEventListener("click", cancelAndExitModal);
modalCancelButton.addEventListener("click", cancelAndExitModal);
modalOkButton.addEventListener("click", submitModalForm);
