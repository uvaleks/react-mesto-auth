import Popup from './Popup';

function ImagePopup({ card, onClose }) {
  return (
    <Popup isOpen={card && true} name={'image'} onClose={onClose}>
        <img className="popup__photo" src={`${card ? card.link : '//:0'}`} alt={`Изображение ${card ? card.name : 'отсутствует'}`}/>
        <h2 className="popup__photo-title">{`${card && card.name}`}</h2>
    </Popup>
  );
}

export default ImagePopup;




