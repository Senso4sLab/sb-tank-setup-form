const modal = document.querySelector(".modal");
const innerModal = document.querySelector(".inner-modal");
const modalButtons = document.querySelector(".inner-modal-buttons");
const modalOkButton = document.querySelector("#ok-button");
const modalCloseButton = document.querySelector("#close-button");
const modalCancelButton = document.querySelector("#cancel-button");
const modalXButton = document.querySelector("#x-button");
const settingsListDiv = document.querySelector(".inner-modal-settings-list");

let isSuccessfull = true;

let units;
let medium;
let maxH;
let maxV;
let tShape;
let mFill;
let hvPairs;

export const messageModalContent = async (modal, settingsListDiv, message) => {
  
  while (
    settingsListDiv.lastChild
  ) {
    await settingsListDiv.removeChild(settingsListDiv.lastChild);
  }
  const ms = document.createElement("p");
  ms.textContent = `${message}`;
  ms.classList.add("inner-modal-result-message");
  await settingsListDiv.appendChild(ms);
  settingsListDiv.style.textAlign = "center";
  modal.style.display = "flex";
  modalOkButton.style.display = "none";
  modalCancelButton.style.display = "none";
  modalCloseButton.style.display = "block";
};

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
      const body = document.querySelector("body");
      body.style.position = "fixed";
      hvPairs = "";
      modalOkButton.style.display = "inline";
      modalXButton.style.display = "block";
      modalCancelButton.value = "BACK";
      modalCancelButton.style.display = "inline";
      modalCloseButton.style.display = "none";
      const emptyDiv = document.createElement("div");
      emptyDiv.style.height = "1vh";
      await settingsListDiv.appendChild(emptyDiv);
        const modalTitle = document.createElement("h3");
  modalTitle.className = "inner-modal-settings-list-title";
  modalTitle.textContent = "Please check the entered data";
  await settingsListDiv.appendChild(modalTitle);

  const unitsTypeAndValue = document.createElement("ul");
  unitsTypeAndValue.className = "inner-modal-settings-list-ul";
  const unitsPreText = document.createElement("li");
  const unitsName = document.createElement("li");
  unitsPreText.textContent = "Measuring unit: ";
  unitsPreText.classList.add("pre-text");
  unitsName.textContent = `${unitsInput.value}`;
  unitsTypeAndValue.appendChild(unitsPreText);
  unitsTypeAndValue.appendChild(unitsName);
  units = unitsInput.value;
  await settingsListDiv.appendChild(unitsTypeAndValue);

  const mediaTypeAndValue = document.createElement("ul");
  mediaTypeAndValue.className = "inner-modal-settings-list-ul";
  const mediaPreText = document.createElement("li");
  const mediaName = document.createElement("li");
  mediaPreText.textContent = "Medium type:";
  mediaPreText.classList.add("pre-text");
  if (densityInput.value == "Custom") {
    mediaName.textContent = `${mediumNameInput.value} (${densityPicker.value} kg/m3)`;
    medium = `${mediumNameInput.value} (${densityPicker.value} kg/m3)`;
  } else {
    mediaName.textContent = `${densityInput.value}`;
  }
  mediaTypeAndValue.appendChild(mediaPreText);
  mediaTypeAndValue.appendChild(mediaName);
  await settingsListDiv.appendChild(mediaTypeAndValue);

  const maximumHeight = document.createElement("ul");
  maximumHeight.className = "inner-modal-settings-list-ul";
  const maximumHeightPreText = document.createElement("li");
  const maximumHeightValue = document.createElement("li");
  maximumHeightPreText.textContent = "Tank height [m]:";
  maximumHeightPreText.classList.add("pre-text");
  maximumHeightValue.textContent = `${maxHeight.value}`;
  maximumHeight.appendChild(maximumHeightPreText);
  maximumHeight.appendChild(maximumHeightValue);
  maxH = maxHeight.value;
  await settingsListDiv.appendChild(maximumHeight);

  const maximumVolume = document.createElement("ul");
  maximumVolume.className = "inner-modal-settings-list-ul";
  const maximumVolumePreText = document.createElement("li");
  const maximumVolumeValue = document.createElement("li");
  maximumVolumePreText.textContent = "Tank volume [L]:";
  maximumVolumePreText.classList.add("pre-text");
  maximumVolumeValue.textContent = `${maxVolume.value}`;
  maximumVolume.appendChild(maximumVolumePreText);
  maximumVolume.appendChild(maximumVolumeValue);
  maxV = maxVolume.value;
  await settingsListDiv.appendChild(maximumVolume);

  const tankShapeTypeAndValue = document.createElement("ul");
  tankShapeTypeAndValue.className = "inner-modal-settings-list-ul";
  const tankShapePreText = document.createElement("li");
  const tankShapeName = document.createElement("li");
  tankShapePreText.textContent = `Tank shape:`;
  tankShapePreText.classList.add("pre-text");
  tankShapeName.textContent = `${tankShape.value}`;
  tankShapeTypeAndValue.appendChild(tankShapePreText);
  tankShapeTypeAndValue.appendChild(tankShapeName);
  tShape = tankShape.value;
  await settingsListDiv.appendChild(tankShapeTypeAndValue);
  
  if (tankShape.value == "Custom") {
    heightsAndVolumes.length = 0;
    const customHeightVolumePairsList = document.createElement("ul");
    customHeightVolumePairsList.className = "inner-modal-settings-list-ul";
    customHeightVolumePairsList.id = "inner-modal-settings-list-ul-custom-pairs-list";
    const customHeightVolumePairsListElementPreText = document.createElement("li");
    customHeightVolumePairsListElementPreText.textContent = `Height - volume pairs [m,L]: `;
    customHeightVolumePairsListElementPreText.classList.add("pre-text");
    customHeightVolumePairsListElementPreText.id = "inner-modal-settings-list-ul-custom-pairs-list-pre-text";
    customHeightVolumePairsList.appendChild(customHeightVolumePairsListElementPreText);
    for (let i = 0; i < customHeights.length; i++) {
      const height = await customHeights[i][1];
      for (let j = 0; j < customVolumes.length; j++) {
        const volume = await customVolumes[j][1];
        if (j == i) {

          hvPairs = hvPairs.concat(height, ",", volume, ",");
         await heightsAndVolumes.push(`(${height}, ${volume})`);
         const customHeightVolumePairsListElement = document.createElement("li");
         customHeightVolumePairsListElement.textContent = `(${height}, ${volume})`;
         customHeightVolumePairsListElement.classList.add("inner-modal-height-volume-pair");
         customHeightVolumePairsList.appendChild(customHeightVolumePairsListElement);
          break;
        }
      }
      }

  hvPairs = hvPairs.concat(`${maxH},${maxV}`);

   await settingsListDiv.appendChild(customHeightVolumePairsList);
  } else {
    heightsAndVolumes.length = 0;
    hvPairs = `${maxH},${maxV}`;
  }

  const fillingLimit = document.createElement("ul");
  fillingLimit.className = "inner-modal-settings-list-ul";
  const fillingLimitPreText = document.createElement("li");
  const fillingLimitValue = document.createElement("li");
  fillingLimitPreText.textContent = `Filling limit [%]:`;
  fillingLimitPreText.classList.add("pre-text");
  fillingLimitValue.textContent =  `${maxFilling.value}`;
  fillingLimit.appendChild(fillingLimitPreText);
  fillingLimit.appendChild(fillingLimitValue);
  mFill = maxFilling.value;
  await settingsListDiv.appendChild(fillingLimit);

  settingsListDiv.style.textAlign = "left";
  modal.style.display = "flex";
  emptyDiv.scrollIntoView();
    };

  export const cancelAndExitModal = async (event, element, listElement) => {
    const body = document.querySelector("body");
      body.style.position = "static";
        event.preventDefault();
        units = "";
        medium = "";
        maxH = "";
        maxV = "";
        tShape = "";
        mFill = "";
        element.style.display = "none";
        while (
          listElement.lastChild
        ) {
          await listElement.removeChild(listElement.lastChild);
        }
        
        modal.id = "";
        innerModal.id = "";
        modalButtons.id = "";
        settingsListDiv.id ="";
      };
      
  export const submitModalForm = async (event) => {
      //   event.preventDefault();
     
      // let date = new Date().toUTCString();
      //     const data = JSON.stringify({
      //     units: units,
      //     medium: medium,
      //     tankShape: tShape,
      //     hvPairs: hvPairs,
      //     fillingLimit: mFill,
      //     creationDate: date
      //   });

      //   fetch("/data", {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: data
      //   })
      //   .then(res => {

      //     if (res.ok) {
      //       modalCloseButton.style.display = "none";
      //       messageModalContent(modal, settingsListDiv, "Tank form was successfully filled. Press button to exit the modal and then close the browser.");
      //     } else {
      //       modalCloseButton.style.display = "none";
      //       messageModalContent(modal, settingsListDiv, "Tank form was not successfully filled. Press button to return to form and try again.");
      //     }
      //   })
      //   .catch(error => {
          
      //     console.log('ERROR:' + error)
      // });
      event.preventDefault();
      
      modal.id = "message-modal";
      innerModal.id = "message-inner-modal";
      settingsListDiv.id ="message-inner-modal-settings-list";
      modalButtons.id = "message-inner-modal-buttons";
      modalCloseButton.style.display = "none";
          if (isSuccessfull) {
            messageModalContent(modal, settingsListDiv, "Tank setup was successful. You can now safely close the browser.");
          } else {
            messageModalContent(modal, settingsListDiv, "Tank setup was not successful. Press OK button and try again.");
          }
          isSuccessfull = !isSuccessfull;
          let date = new Date().toUTCString();
          const data = JSON.stringify({
          units: units,
          medium: medium,
          tankShape: tShape,
          hvPairs: hvPairs,
          fillingLimit: mFill,
          creationDate: date
        });
          console.log(data);
      };