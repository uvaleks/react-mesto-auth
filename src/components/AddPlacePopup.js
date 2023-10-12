import React from 'react';
import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  useEffect(() => {
    if (!isOpen) {
      nameRef.current.value = null;
      linkRef.current.value = null;
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
  
    onAddCard(nameRef.current.value, linkRef.current.value);
  } 

  return (
    <PopupWithForm handleSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} popupName={'add'} title={"Новое место"} buttonText={"Создать"}>
      <input ref={nameRef} className="popup__input" type="text" name="input-place" placeholder="Название" autoComplete="off" minLength="2" maxLength="30" required/>
      <span className="input-place-error popup__input-error"></span>
      <input ref={linkRef} className="popup__input" type="url" name="input-link" placeholder="Ссылка на картинку" autoComplete="off" required/>
      <span className="input-link-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;




