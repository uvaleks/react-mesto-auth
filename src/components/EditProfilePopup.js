import React from 'react';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = React.useContext(CurrentUserContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm handleSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} popupName={'edit-form'} title={"Редактировать профиль"} buttonText={"Сохранить"}>
      <input onChange={handleNameChange} value={name}  className="popup__input" type="text" name="name" placeholder="Имя" autoComplete="off" minLength="2" maxLength="40" required/>
      <span className="name-error popup__input-error"></span>
      <input onChange={handleDescriptionChange} value={description} className="popup__input" type="text" name="about" placeholder="Занятие" autoComplete="off" minLength="2" maxLength="200" required/>
      <span className="about-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;




