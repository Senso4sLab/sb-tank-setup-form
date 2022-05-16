export const addAnotherCustomTankShape = () => {
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
    heightInput.addEventListener("input", addedRemovedCustomFieldUserInputValidation);
    heightInput.addEventListener("input", storeIntoCustomArray);
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
  
    volumeInput.type = "number";
    volumeInput.id = `custom-max-volume${counter}`;
    volumeInput.name = `custom-max-volume${counter}`;
    volumeInput.placeholder = "Insert value...";
    volumeInput.value = "";
    volumeInput.step = "1";
    volumeInput.addEventListener("input", addedRemovedCustomFieldUserInputValidation);
    volumeInput.addEventListener("input", storeIntoCustomArray);
    volumeInput.addEventListener("keypress", (event) => {
      if (event.key === "." || event.key === "-") {
        event.preventDefault();
      }
    });
    volumeInput.addEventListener("input", () => {
      addButton.disabled = enableButton(heightInput, volumeInput);
      if (!addButton.disabled) {
        addButton.style.opacity = 1;
       }else {
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