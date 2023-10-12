import React from 'react';
import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  useEffect(() => {
    if (!isOpen) {
      avatarRef.current.value = null;
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar(avatarRef.current.value);
  } 

  return (
    <PopupWithForm handleSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} popupName={'edit-avatar'} title={"Обновить аватар"} buttonText={"Сохранить"}>
      <input ref={avatarRef} className="popup__input" type="url" name="input-avatar-link" placeholder="Ссылка на картинку" autoComplete="off" required/>
      <span className="input-avatar-link-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;




