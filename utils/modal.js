const modal = document.querySelector(".modal");
const modalOkButton = document.querySelector("#ok-button");
const modalCloseButton = document.querySelector("#close-button");
const modalCancelButton = document.querySelector("#cancel-button");
const modalXButton = document.querySelector("#x-button");
const settingsListDiv = document.querySelector(".inner-modal-settings-list");

let units;
let medium;
let maxH;
let maxV;
let tShape;
let mFill;

export const messageModalContent = async (modal, settingsListDiv, message) => {
  
  while (
    settingsListDiv.lastChild
  ) {
    await settingsListDiv.removeChild(settingsListDiv.lastChild);
  }
  const ms = document.createElement("p");
  ms.textContent = `${message}`;
  await settingsListDiv.appendChild(ms);
  settingsListDiv.style.textAlign = "center";
  modal.style.display = "block";
  modalOkButton.style.display = "none";
  modalCancelButton.style.display = "none";
  modalXButton.style.display = "none";
  modalCloseButton.style.display = "inline";
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
      modalOkButton.style.display = "inline";
      modalXButton.style.display = "block";
      modalCancelButton.value = "BACK";
      modalCancelButton.style.display = "inline";
      modalCloseButton.style.display = "none";
        const modalTitle = document.createElement("h3");
  modalTitle.className = "inner-modal-settings-list-title";
  modalTitle.textContent = "Please check the entered data";
  await settingsListDiv.appendChild(modalTitle);

  const lineBreak = document.createElement("br");
  await settingsListDiv.appendChild(lineBreak);

  const unitsType = document.createElement("p");
  unitsType.textContent = `Measuring unit: ${unitsInput.value}`;
  units = unitsInput.value;
  await settingsListDiv.appendChild(unitsType);

  const mediumType = document.createElement("p");
  if (densityInput.value == "Custom") {
    mediumType.textContent = `Medium type: ${mediumNameInput.value} (${densityPicker.value} kg/m3)`;
    medium = `${mediumNameInput.value} (${densityPicker.value} kg/m3)`;
  } else {
    mediumType.textContent = `Medium type: ${densityInput.value}`;
    medium = densityInput.value;
  }
  await settingsListDiv.appendChild(mediumType);

  const maximumHeight = document.createElement("p");
  maximumHeight.textContent = `Tank height [m]: ${maxHeight.value}`;
  maxH = maxHeight.value;
  await settingsListDiv.appendChild(maximumHeight);

  const maximumVolume = document.createElement("p");
  maximumVolume.textContent = `Tank volume [l]: ${maxVolume.value}`;
  maxV = maxVolume.value;
  await settingsListDiv.appendChild(maximumVolume);

  const tankShapeInput = document.createElement("p");
  tankShapeInput.textContent = `Tank shape: ${tankShape.value}`;
  tShape = tankShape.value;
  await settingsListDiv.appendChild(tankShapeInput);

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
   customHeightVolumePairs.textContent = `Height - Volume pairs: ${heightsAndVolumes.join(", ")}`;
   tShape = `Custom - height/volume pairs: ${heightsAndVolumes.join(", ")}`;
   await settingsListDiv.appendChild(customHeightVolumePairs);
  }

  const fillingLimit = document.createElement("p");
  fillingLimit.textContent = `Filling limit [%]: ${maxFilling.value}`;
  mFill = maxFilling.value;
  await settingsListDiv.appendChild(fillingLimit);
  settingsListDiv.style.textAlign = "left";

  modal.style.display = "block";
    };

  export const cancelAndExitModal = async (event, element, listElement) => {
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
      };
      
  export const submitModalForm = async (event) => {
        event.preventDefault();
        let date = new Date().toLocaleString();

        const data = JSON.stringify({
          units: units,
          medium: medium,
          maxHeight: maxH,
          maxVolume: maxV,
          tankShape: tShape,
          fillingLimit: mFill,
          creationDate: date
        });

        fetch("/data", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: data
        })
        .then(res => {

          if (res.ok) {
            modalCloseButton.style.display = "none";
            messageModalContent(modal, settingsListDiv, "Tank form was successfully filled. Press button to exit the modal and then close the browser.");
          } else {
            modalCloseButton.style.display = "none";
            messageModalContent(modal, settingsListDiv, "Tank form was not successfully filled. Press button to return to form and try again.");
          }
        })
        .catch(error => {
          
          console.log('ERROR:' + error)
      });
      };