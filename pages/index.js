import './index.css';
import { initialCards, selectors, validationSettings } from '../utils/constants';

import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const formInputName = document.querySelector('#name');
const formInputProfession = document.querySelector('#profession');

const profileForm = document.forms['profile-form'];
const addCardForm = document.forms['card-form'];

const formValidators = {};

const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(validationSettings, formElement);
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(validationSettings);

const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);
cardPreviewPopup.close();

function createCard(data) {
    const cardElement = new Card({ data, handleImageClick: (imageData) => {
        cardPreviewPopup.open(imageData);
    }}, selectors.cardTemplate);
    return cardElement.getView();
}

const cardSection = new Section(
    {
        items: initialCards,
        renderer: (data) => {
            const cardElement = createCard(data);
            cardSection.addItem(cardElement);
        },
    },
    selectors.cardsList
);

cardSection.renderItems(initialCards);

const addFormPopup = new PopupWithForm(selectors.addFormPopup, (formData) => {
    const newCard = createCard(formData);
    addFormPopup.close();
    cardSection.addItem(newCard);
});

addButton.addEventListener("click", () => {
    formValidators[addCardForm.getAttribute('name')].resetValidation();
    addFormPopup.open();
});

addFormPopup.setEventListeners();

const userInfo = new UserInfo(selectors.profileName, selectors.profileProfession);

const editFormPopup = new PopupWithForm(selectors.editFormPopup, (values) => {
    userInfo.setUserInfo(values.name, values.profession);
    editFormPopup.close();
});

editButton.addEventListener("click", () => {
    const profileInfo = userInfo.getUserInfo();
    formInputName.value = profileInfo.name;
    formInputProfession.value = profileInfo.profession;
    formValidators[profileForm.getAttribute('name')].disableButton();
    editFormPopup.open();
});

editFormPopup.setEventListeners();
