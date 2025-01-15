export default class Card {
    constructor({ data, handleImageClick }, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _setEventListeners() {
        this._likeButton = this._element.querySelector('.card__like-button');
        this._likeButton.addEventListener('click', this._handleLikeIcon);
        const deleteButton = this._element.querySelector('.card__delete-button');
        deleteButton.addEventListener('click', () => this._handleDeleteCard());
        this._imageWindow = this._element.querySelector('.card__image');
        this._imageWindow.addEventListener('click', () => this._handleImageClick({link: this._link, name: this._name}));
    }

    _handleLikeIcon = () => {
        this._likeButton.classList.toggle('card__like-button_active');
    }

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content.querySelector('.card')
            .cloneNode(true);
    }

    getView() {
        this._element = this._getTemplate();
        const cardImage = this._element.querySelector('.card__image');        
        cardImage.src = this._link;
        cardImage.alt = `Photo of ${this._name}`;
        const cardTitle = this._element.querySelector('.card__title');
        cardTitle.textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}
