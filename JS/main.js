var imageInput = document.getElementById("contactImage");
var fullNameInput = document.getElementById("fullName");
var phoneNumberInput = document.getElementById("phoneNumber");
var emailInput = document.getElementById("email");
var AddressInput = document.getElementById("Address");
var GroupInput = document.getElementById("Group");
var NotesInput = document.getElementById("Notes");
var isFavoriteInput = document.getElementById("isFavorite");
var isEmergencyInput = document.getElementById("isEmergency");
var contactsData = document.getElementById("contactData");
var favourtieCardDisplay = document.getElementById("favoriteCard");
var emergencyCardDisplay = document.getElementById("emergencyCard");
var totalNumberDisplay = document.getElementById("totalNumber");
var favoritesNumberDisplay = document.getElementById("favoritesNumber");
var emergencyNumberDisplay = document.getElementById("emergencyNumber");
var searchInput = document.getElementById("searchInput");
var ContactList = [];
var GlobalIndex = null;
if (localStorage.getItem("Contacts") != null) {
  ContactList = JSON.parse(localStorage.getItem("Contacts"));
  displayContactCard(ContactList);
  dispalyFavouriteCard(ContactList);
  dispalyEmergencyCard(ContactList);
  showStatistics();
}
function createContact() {
  if (
    validateInput(fullNameInput) &&
    validateInput(phoneNumberInput) &&
    validateInput(emailInput) &&
    validateInput(AddressInput) &&
    validateInput(NotesInput) &&
    validateInput(imageInput)
  ) {
    var modal = bootstrap.Modal.getInstance(
      document.getElementById("contactModal"),
    );
    var Contact = {
      fullName: fullNameInput.value,
      phoneNumber: phoneNumberInput.value,
      Email: emailInput.value,
      Address: AddressInput.value,
      Group: GroupInput.value,
      Notes: NotesInput.value,
      isFavorite: isFavoriteInput.checked,
      isEmergency: isEmergencyInput.checked,
      image: "images/" + imageInput.files[0]?.name,
    };
    ContactList.push(Contact);
    localStorage.setItem("Contacts", JSON.stringify(ContactList));
    clearForm();
    modal.hide();
    Swal.fire({
      title: "Done",
      text: "Contact Added",
      icon: "success",
      confirmButtonText: "Close",
    });
    showStatistics();
    displayContactCard(ContactList);
    dispalyFavouriteCard(ContactList);
    dispalyEmergencyCard(ContactList);
  }
}
function showStatistics() {
  var emergencyCount = 0;
  var favoriteCount = 0;
  totalNumberDisplay.innerHTML = ContactList.length;
  for (let index = 0; index < ContactList.length; index++) {
    if (ContactList[index].isFavorite == true) {
      favoriteCount++;
    }
  }
  for (let index = 0; index < ContactList.length; index++) {
    if (ContactList[index].isEmergency == true) {
      emergencyCount++;
    }
  }
  favoritesNumberDisplay.innerHTML = favoriteCount;
  emergencyNumberDisplay.innerHTML = emergencyCount;
}
function clearForm() {
  fullNameInput.value = null;
  phoneNumberInput.value = null;
  emailInput.value = null;
  Address.value = null;
  GroupInput.value = null;
  NotesInput.value = null;
  isFavoriteInput.checked = false;
  isEmergencyInput.checked = false;
  imageInput.value = "";
}
function displayContactCard(arr) {
  var displayCard = "";
  for (let index = 0; index < arr.length; index++) {
    displayCard += `<div class="col-md-6">
                <div class="card mt-4 shadow">
                  <div class="card-body">
                    <div class="position-relative d-flex">
                      <img
                        src="${arr[index].image}"
                        class="rounded-3 object-fit-contain"
                        width="80px"
                        height="100px"
                        alt=""
                      />
                      ${
                        arr[index].isFavorite == true
                          ? `<span 
                        class="py-1  px-2 position-absolute top-0 card-star border border-white border-2 rounded-circle bg-orange"
                      >
                        <i
                          class="fa-solid fa-2xs fa-star"
                          style="color: rgb(255, 255, 255)"
                        ></i>
                      </span>`
                          : ""
                      }
                      
                      ${
                        arr[index].isEmergency == true
                          ? ` <span 
                        class="py-1 px-2 position-absolute bottom-0 card-star border border-white border-2 rounded-circle bg-danger"
                      >
                        <i
                          class="fa-solid fa-2xs fa-heart-pulse"
                          style="color: rgb(255, 255, 255)"
                        ></i>
                      </span>`
                          : ""
                      }
                     
                      <div class="ms-3">
                        <h6 class="h4">${arr[index].fullName}</h6>
                        <span class="rounded-3 phone-call"
                          ><i
                            class="fa-solid fa-xs fa-phone-volume"
                            style="color: rgb(21, 93, 252)"
                          ></i
                        ></span>
                        <a href="tel:${arr[index].phoneNumber} " class="d-inline">${arr[index].phoneNumber}</a>
                      </div>
                    </div>
                    <div class="mt-3">
                      <span class="p-1 rounded-1 bg-move">
                        <i
                          class="fa-solid fa-envelope"
                          style="color: rgb(127, 34, 254)"
                        ></i
                      ></span>
                      <a href="mailto:${arr[index].Email}" class="d-inline"
                        >${arr[index].Email}</a
                      >
                    </div>
                    <div class="mt-2">
                      <span class="p-1 rounded-1 bg-green">
                        <i
                          class="fa-solid fa-location-dot"
                          style="color: rgb(0, 153, 102)"
                        ></i
                      ></span>
                      <p class="d-inline">${arr[index].Address}</p>
                    </div>
                    <div class="mt-3">
                     ${
                       arr[index].Group == "Work"
                         ? `<span class="me-2 fs-6 bg-work p-1 rounded-3">Work</span>`
                         : ""
                     } 

                     ${
                       arr[index].Group == "Friend"
                         ? `    <span class="me-2 fs-6 bg-friend  p-1 rounded-3"
                        >friend</span
                      >`
                         : ""
                     }
                    ${
                      arr[index].Group == "Family"
                        ? `<span class="me-2 fs-6 bg-family p-1  rounded-3"
                        >family</span
                      >`
                        : ""
                    }      
                    ${
                      arr[index].Group == "School"
                        ? `<span class="me-2 fs-6 bg-school p-1  rounded-3"
                        >school</span
                      >`
                        : ""
                    }    
                    ${
                      arr[index].Group == "Others"
                        ? `<span class="me-2 fs-6 bg-other p-1  rounded-3">other</span>`
                        : ""
                    }
                      <span
                        class="p-1 text-danger fs-6 bg-danger-subtle rounded-3"
                      >
                        <i
                          class="fa-solid fa-2xs fa-heart-pulse"
                          style="color: #f60e40"
                        ></i>
                        Emergency</span
                      >
                    </div>
                  </div>
                  <div class="card-footer p-3">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <a href="tel:" class="bg-friend p-1 rounded-2"
                          ><i
                            class="fa-solid fa-phone"
                            style="color: rgb(0, 153, 102)"
                          ></i
                        ></a>
                        <a href="mailto:" class="p-1 rounded-2 bg-move">
                          <i
                            class="fa-solid fa-envelope"
                            style="color: rgb(127, 34, 254)"
                          ></i
                        ></a>
                      </div>
                      <div>
                        <span  onclick="makeFavorite(${index})" class="p-1 me-1 rounded-2 card-footer-star" style="color: rgb(255, 212, 59);"
                          ><i id="favoriteStar" class="fa-regular fa-star" ></i
                        ></span>
                        <span onclick="makeEmergency(${index})" class="p-1 text-danger me-1 rounded-2 card-footer-heart"
                          ><i class="fa-regular fa-heart"></i
                        ></span>
                        <span onclick="setForUpdate(${index})" class="p-1 me-1 rounded-2 card-footer-pen"
                          ><i class="fa-solid fa-pen"></i
                        ></span>
                        <span onclick="deleteContact(${index})" class="p-1 me-1 rounded-2 card-footer-trash"
                          ><i class="fa-solid fa-trash"></i
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
  }
  contactsData.innerHTML = displayCard;
}
function dispalyFavouriteCard(arr) {
  var cartona = "";
  for (let index = 0; index < arr.length; index++) {
    if (arr[index].isFavorite == true) {
      cartona += `     <div
                    class="p-2 mt-2 favourit-card d-flex bg-second rounded-3"
                  >
                    <img
                      src="${arr[index].image}"
                      class="object-fit-contain me-3 rounded-3"
                      width="50px"
                      height="50px"
                      alt=""
                    />
                    <div
                      class="d-flex justify-content-between w-100 align-items-center"
                    >
                      <div>
                        <h2 class="h6 mb-0">${arr[index].fullName}</h2>
                        <p class="fs-6">${arr[index].phoneNumber}</p>
                      </div>
                      <span class="span-phone"
                        ><a
                          href="tel:${arr[index].phoneNumber}"
                          class="bg-friend p-1 rounded-2"
                          ><i
                            class="fa-solid fa-phone"
                            style="color: rgb(0, 153, 102)"
                          ></i></a
                      ></span>
                    </div>
                  </div>`;
    }
  }
  favourtieCardDisplay.innerHTML = cartona;
}
function dispalyEmergencyCard(arr) {
  var cartona = "";
  for (let index = 0; index < arr.length; index++) {
    if (arr[index].isEmergency == true) {
      cartona += `  <div class="p-2 mt-2 danger-card d-flex bg-second rounded-3">
                    <img
                      src="${arr[index].image}"
                      class="object-fit-contain me-3 rounded-3"
                      width="50px"
                      height="50px"
                      alt=""
                    />
                    <div
                      class="d-flex justify-content-between w-100 align-items-center"
                    >
                      <div>
                        <h2 class="h6 mb-0">${arr[index].fullName}</h2>
                        <p class="fs-6">${arr[index].phoneNumber}</p>
                      </div>
                      <span class="span-phone-danger"
                        ><a
                          href="tel:${arr[index].phoneNumber}"
                          class="bg-heart p-1 rounded-2"
                          ><i
                            class="fa-solid fa-phone"
                            style="color: #ff2056"
                          ></i></a
                      ></span>
                    </div>
                  </div>`;
    }
  }
  emergencyCardDisplay.innerHTML = cartona;
}
function deleteContact(deletedIndex) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      ContactList.splice(deletedIndex, 1);

      localStorage.setItem("Contacts", JSON.stringify(ContactList));

      displayContactCard(ContactList);
      dispalyFavouriteCard(ContactList);
      dispalyEmergencyCard(ContactList);
      showStatistics();

      Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted.",
        icon: "success",
      });
    }
  });
}
function search() {
  console.log("work");

  var searchElement = searchInput.value;
  searchResult = [];
  for (let i = 0; i < ContactList.length; i++) {
    if (
      ContactList[i].fullName
        .toLowerCase()
        .includes(searchElement.toLowerCase()) ||
      ContactList[i].phoneNumber
        .toLowerCase()
        .includes(searchElement.toLowerCase()) ||
      ContactList[i].Email.toLowerCase().includes(searchElement.toLowerCase())
    ) {
      searchResult.push(ContactList[i]);
    }
    displayContactCard(searchResult);
    dispalyFavouriteCard(searchResult);
    dispalyEmergencyCard(searchResult);
  }
}
function setForUpdate(updatedIndex) {
  GlobalIndex = updatedIndex;
  var modal = new bootstrap.Modal(document.getElementById("contactModal"));
  modal.show();
  fullNameInput.value = ContactList[updatedIndex].fullName;
  phoneNumberInput.value = ContactList[updatedIndex].phoneNumber;
  emailInput.value = ContactList[updatedIndex].Email;
  AddressInput.value = ContactList[updatedIndex].Address;
  GroupInput.value = ContactList[updatedIndex].Group;
  NotesInput.value = ContactList[updatedIndex].Notes;
  isFavoriteInput.checked = ContactList[updatedIndex].isFavorite;
  isEmergencyInput.checked = ContactList[updatedIndex].isEmergency;
  upBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");
}
function updateContact() {
  if (
    validateInput(fullNameInput) &&
    validateInput(phoneNumberInput) &&
    validateInput(emailInput) &&
    validateInput(AddressInput) &&
    validateInput(NotesInput) &&
    validateInput(imageInput)
  ) {
    var modal = bootstrap.Modal.getInstance(
      document.getElementById("contactModal"),
    );
    ContactList[GlobalIndex].fullName = fullNameInput.value;
    ContactList[GlobalIndex].phoneNumber = phoneNumberInput.value;
    ContactList[GlobalIndex].Email = emailInput.value;
    ContactList[GlobalIndex].Address = AddressInput.value;
    ContactList[GlobalIndex].Group = GroupInput.value;
    ContactList[GlobalIndex].Notes = NotesInput.value;
    ContactList[GlobalIndex].isFavorite = isFavoriteInput.checked;
    ContactList[GlobalIndex].isEmergency = isEmergencyInput.checked;
    if (imageInput.files[0]) {
      ContactList[GlobalIndex].image = "images/" + imageInput.files[0]?.name;
    }
    localStorage.setItem("Contacts", JSON.stringify(ContactList));
    displayContactCard(ContactList);
    dispalyFavouriteCard(ContactList);
    dispalyEmergencyCard(ContactList);
    showStatistics();
    modal.hide();
    Swal.fire({
      title: "Done",
      text: "Contact Updated",
      icon: "success",
      confirmButtonText: "Close",
    });
  }
}
function makeFavorite(index) {
  if (ContactList[index].isFavorite == true) {
    ContactList[index].isFavorite = false;
  } else if (ContactList[index].isFavorite == false) {
    ContactList[index].isFavorite = true;
  }
  localStorage.setItem("Contacts", JSON.stringify(ContactList));
  displayContactCard(ContactList);
  dispalyFavouriteCard(ContactList);
  dispalyEmergencyCard(ContactList);
  showStatistics();
}
function makeEmergency(index) {
  if (ContactList[index].isEmergency == true) {
    ContactList[index].isEmergency = false;
  } else if (ContactList[index].isEmergency == false) {
    ContactList[index].isEmergency = true;
  }
  localStorage.setItem("Contacts", JSON.stringify(ContactList));
  displayContactCard(ContactList);
  dispalyFavouriteCard(ContactList);
  dispalyEmergencyCard(ContactList);
  showStatistics();
}
function validateInput(element) {
  var regex = {
    fullName: /^\w{2,15}\s?\w{0,15}$/,
    phoneNumber: /^01[0125][0-9]{8}$/,
    email: /^\w{2,10}\.?\w{0,10}[0-9]{0,3}@(gmail|yahoo|hotmail)\.com$/,
    Address: /^[A-Za-z0-9\s,.-]{5,50}$/,
    Notes: /^.{0,200}$/,
    contactImage: /^image\/(jpg|jpeg|png|gif|webp)$/,
  };
  var value = element.value;
  if (element.id == "contactImage") {
    value = imageInput.files[0]?.type;
  }

  if (regex[element.id].test(value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
