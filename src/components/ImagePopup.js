function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_photo ${card ? 'popup_opened' : ''}`}>
          <div className="popup__photo-wrapper">
              <img className="popup__photo" src={`${card ? card.link : '//:0'}`} alt={`Изображение ${card ? card.name : 'отсутствует'}`}/>
              <h2 className="popup__photo-title">{`${card && card.name}`}</h2>
              <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
          </div>
    </div>
  );
}

export default ImagePopup;




