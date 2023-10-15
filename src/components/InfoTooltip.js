import okTooltipStatus from '../images/ok-tooltip-status.svg';
import errorTooltipStatus from '../images/error-tooltip-status.svg';

function InfoTooltip({ tooltipStatus, isOpen, onClose, message }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
          <div className="tooltip">
              <img className="tooltip__status-icon" src={(tooltipStatus === 'ok') ? okTooltipStatus : errorTooltipStatus} />
              <h2 className="tooltip__title">{(tooltipStatus === 'ok') ? "Вы успешно зарегистрировались!" : ((message) ? message : 'Что-то пошло не так! Попробуйте ещё раз.')}</h2>
              <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
          </div>
    </div>
  );
}

export default InfoTooltip;




