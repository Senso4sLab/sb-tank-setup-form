export const modalContent = async (
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
    maxFilling
    ) => {
        const modalTitle = document.createElement("h3");
  modalTitle.className = "inner-modal-settings-list-title";
  modalTitle.textContent = "Please check the entered data";
  await settingsListDiv.appendChild(modalTitle);

  const lineBreak = document.createElement("br");
  await settingsListDiv.appendChild(lineBreak);

  const unitsType = document.createElement("p");
  unitsType.textContent = `Measuring unit: ${unitsInput.value}`;
  await settingsListDiv.appendChild(unitsType);

  const mediumType = document.createElement("p");
  if (densityInput.value == "Custom") {
    mediumType.textContent = `Medium type: ${mediumNameInput.value} (${densityPicker.value} kg/m3)`;
  } else {
    mediumType.textContent = `Medium type: ${densityInput.value}`;
  }
  await settingsListDiv.appendChild(mediumType);

  const maximumHeight = document.createElement("p");
  maximumHeight.textContent = `Tank height [m]: ${maxHeight.value}`;
  await settingsListDiv.appendChild(maximumHeight);

  const maximumVolume = document.createElement("p");
  maximumVolume.textContent = `Tank volume [l]: ${maxVolume.value}`;
  await settingsListDiv.appendChild(maximumVolume);

  const tankShapeInput = document.createElement("p");
  tankShapeInput.textContent = `Tank shape: ${tankShape.value}`;
  await settingsListDiv.appendChild(tankShapeInput);

  // Prvi custom par dodaj v customHeights in customVolumes
  if (tankShape.value == "Custom") {
    heightsAndVolumes.length = 0;
    const customHeightVolumePairs = document.createElement("p");
    for (let i = 0; i < customHeights.length; i++) {
      const height = await customHeights[i][1];
      for (let j = 0; j < customVolumes.length; j++) {
        const volume = await customVolumes[j][1];
        if (j == i) {
         await heightsAndVolumes.push(`(${height} m, ${volume} l)`);
          break;
        }
      }
    }
    // customHeights = customHeights.filter((el) => !el[0].includes("volume"));
    // customVolumes = customVolumes.filter((el) => !el[0].includes("height"));
  //   let currentHeightId = "";
  //   let uniqueHeights = [];
  //  await customHeights.forEach((height) => {
  //     if (height[0] != currentHeightId) {
  //       currentHeightId = height[0];
  //       uniqueHeights.push(height);
  //     }
  //   });
  //   uniqueHeights = uniqueHeights.sort();
  //   let currentVolumeId = "";
  //   let uniqueVolumes = [];
  //  await customVolumes.forEach((volume) => {
  //     if (volume[0] != currentVolumeId) {
  //       currentVolumeId = volume[0];
  //       uniqueVolumes.push(volume);
  //     }
  //   });
  //   uniqueVolumes = uniqueVolumes.sort();
  //   for (let i = 0; i < uniqueHeights.length; i++) {
  //     const height = await uniqueHeights[i][1];
  //     for (let j = 0; j < uniqueVolumes.length; j++) {
  //       const volume = await uniqueVolumes[j][1];
  //       if (j == i) {
  //        await heightsAndVolumes.push(`(${height} m, ${volume} l)`);
  //         break;
  //       }
  //     }
  //   }
   customHeightVolumePairs.textContent = `Height - Volume pairs: ${heightsAndVolumes.join(", ")}`;
   await settingsListDiv.appendChild(customHeightVolumePairs);
  }

  const fillingLimit = document.createElement("p");
  fillingLimit.textContent = `Filling limit [%]: ${maxFilling.value}`;
  await settingsListDiv.appendChild(fillingLimit);

  modal.style.display = "block";
    };

  export const cancelAndExitModal = async (event, element, listElement) => {
        event.preventDefault();
        element.style.display = "none";
        while (
          listElement.lastChild
        ) {
          await listElement.removeChild(listElement.lastChild);
        }
      };
      
  export const submitModalForm = async (event, element) => {
        event.preventDefault();
        window.location.href = "success.html";
        element.style.display = "none";
        let date = new Date().toLocaleString();
      };