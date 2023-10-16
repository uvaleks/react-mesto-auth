import Popup from './Popup';

function PopupWithForm({ popupName, children, isOpen, onClose, handleSubmit, title, buttonText }) {

  return (
    <Popup isOpen={isOpen} name={popupName} onClose={onClose}>
      <form onSubmit={handleSubmit} className="popup__form popup__add" name="add-form"> 
        <h2 className="popup__title">{title}</h2>
        {children}
        <button className="popup__submit-button" type="submit">{buttonText}</button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;




