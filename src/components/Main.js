import Card from './Card';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function Main({
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    cards,
    selectedCard,
    onCardClick,
    onCardLike,
    onCardDelete,
    isEditProfilePopupOpen,
    onUpdateUser,
    isEditAvatarPopupOpen,
    onUpdateAvatar,
    isAddPlacePopupOpen,
    onAddCard,
    onClose
    }) {
  
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
        <section className="profile">
            <div className="profile__avatar-wrapper">
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
            <div className="profile__avatar-edit-button" onClick={onEditAvatar}></div>
            </div>
            <div className="profile__profile-info">
                <div className="profile__name-wrapper">
                    <h1 className="profile__profile-name" id="profile-name">{currentUser.name}</h1>
                    <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
                </div>
                <p className="profile__profile-description" id="profile-description">{currentUser.about}</p>
            </div>
            <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
        </section>
        <section className="elements">
          {cards.map((card) => (
            <Card
              name={card.name}
              link={card.link}
              likes={card.likes}
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              currentUser={currentUser}
            />
          ))}
        </section>
          <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={onClose} 
              onUpdateUser={onUpdateUser}
          />
          <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={onClose} 
              onUpdateAvatar={onUpdateAvatar}
          />
          <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={onClose} 
              onAddCard={onAddCard}
          />
          <PopupWithForm
              popupName={'confirm-delete'}
              title={"Вы уверены?"}
              buttonText={"Да"}
          />
          <ImagePopup
              card={selectedCard}
              onClose={onClose}
          />
    </main>
  );
}

export default Main;




