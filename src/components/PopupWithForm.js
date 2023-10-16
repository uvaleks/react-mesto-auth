import { useEffect } from 'react';

function PopupWithForm({ popupName, children, isOpen, onClose, handleSubmit, title, buttonText }) {
  const handleBgClick = (e) => {
    if (e.target.classList.contains('popup')) {
      onClose();
    }
  }

  return (
    <div onClick={handleBgClick} className={`popup popup_type_${popupName} ${isOpen ? 'popup_opened' : ''}`}>
          <div className="popup__container">
            <form onSubmit={handleSubmit} className="popup__form popup__add" name="add-form"> 
              <h2 className="popup__title">{title}</h2>
              {children}
              <button className="popup__submit-button" type="submit">{buttonText}</button>
            </form>
            <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
          </div>
    </div>
  );
}

export default PopupWithForm;




