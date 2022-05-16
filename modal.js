export const modalContent = (
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
    maxFilling
    ) => {
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
    mediumType.textContent = `Medium type: ${mediumNameInput.value} (${densityPicker.value} kg/m3)`;
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
    customHeightVolumePairs.textContent = `Height - Volume pairs: ${heightsAndVolumes.join(", ")}`;
    settingsListDiv.appendChild(customHeightVolumePairs);
  }

  const fillingLimit = document.createElement("p");
  fillingLimit.textContent = `Filling limit [%]: ${maxFilling.value}`;
  settingsListDiv.appendChild(fillingLimit);

  modal.style.display = "block";
    };

  export const cancelAndExitModal = (event) => {
        event.preventDefault();
        modal.style.display = "none";
        while (
          settingsListDiv.lastChild
        ) {
          settingsListDiv.removeChild(settingsListDiv.lastChild);
        }
      };
      
  export const submitModalForm = (event) => {
        event.preventDefault();
      
        window.location.href = "success.html";
      
        modal.style.display = "none";
      };