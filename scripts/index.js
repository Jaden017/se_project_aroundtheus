const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardsList = document.querySelector(".cards__list");
const profileSection = document.querySelector(".profile");
//profile buttons
const editButton = profileSection.querySelector(".profile__edit-button");
const addButton = profileSection.querySelector(".profile__add-button");
//Profile Elements
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

//profile modal
const profileModal = document.querySelector(".modal_profile");
const profileForm = document.querySelector(".modal__form-profile");

//profile Modal Buttons
const profileExitButton = document.querySelector(".modal__exit-editor");
const profileSubmitButton = profileForm.querySelector(".modal__button-profile");

// profile Modal Fields
const nameEditInput = profileModal.querySelector(".modal__input_type_title");
const descEditInput = profileModal.querySelector(
  ".modal__input_type_description"
);

//New Card Modal
const newCardModal = document.querySelector(".modal_new-card");
const newCardForm = document.querySelector(".modal__new-card-form");

//New Card Buttons
const cardExitButton = document.querySelector(".modal__exit-new-card");
const cardSubmitButton = profileForm.querySelector(".modal__button-new-card");

//New Card Fields
const titleCardInput = newCardModal.querySelector(".modal__input_type_name");
const urlCardInput = newCardModal.querySelector(".modal__input_type_url");

//Preview modal
const previewModal = document.querySelector(".modal_preview");
const previewImage = previewModal.querySelector(".modal__preview-image");
const previewTitle = previewModal.querySelector(".modal__preview-title");
const previewExitButton = previewModal.querySelector(".modal__exit-preview");

const cardsTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function getCardData(cardData) {
  const cardElement = cardsTemplate.cloneNode(true);

  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewTitle.textContent = cardData.name;
    toggleModal(previewModal);
  });

  cardImageElement.src = cardData.link;
  cardTitleElement.textContent = cardData.name;
  cardImageElement.alt = cardData.name;

  return cardElement;
}

// Functions

function renderCards() {
  initialCards.forEach((cardData) => {
    const cardElement = getCardData(cardData);

    cardsList.prepend(cardElement);
  });
}

function fillProfileInputs() {
  nameEditInput.value = profileTitle.textContent;
  descEditInput.value = profileDesc.textContent;
}

function setProfileData(e) {
  e.preventDefault();
  profileTitle.textContent = nameEditInput.value;
  profileDesc.textContent = descEditInput.value;
}

function toggleModal(modal) {
  modal.classList.toggle("modal_opened");
}

function addNewCard() {}

function addNewCard(e) {
  e.preventDefault();

  const title = titleCardInput.value.trim();
  const url = urlCardInput.value.trim();

  if (!title || !url) {
    alert("Name and URL Cannot be empty!");
    return;
  }

  const newCard = {
    name: title,
    link: url,
  };

  const cardElement = getCardData(newCard);

  cardsList["append"](cardElement); //Push new cards to the front

  e.target.reset();

  toggleModal(newCardModal);
}

// Event Listners

editButton.addEventListener("click", function () {
  fillProfileInputs();
  toggleModal(profileModal);
});
addButton.addEventListener("click", function () {
  toggleModal(newCardModal);
});

profileExitButton.addEventListener("click", function () {
  toggleModal(profileModal);
});
cardExitButton.addEventListener("click", function () {
  toggleModal(newCardModal);
});

profileForm.addEventListener("submit", (e) => {
  setProfileData(e);
  toggleModal(profileModal);
});

newCardForm.addEventListener("submit", addNewCard);

previewExitButton.addEventListener("click", function () {
  toggleModal(previewModal);
});

renderCards();
