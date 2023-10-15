import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

function Register({ onRegister, authTitle, authButtonText, setUserOnSignupScreeen, message, setMessage }) {
  const [isErrorTooltipOpen, setErrorTooltipOpen] = useState(false);
  const [isOkTooltipOpen, setOkTooltipOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    onRegister(password, email)
      .then(res => {return res})
      .then((res) => {
        if (res.error) {
          setMessage(res.error);
          setErrorTooltipOpen(true);
        } else {
          resetForm();
          setOkTooltipOpen(true);
        }
      })
      .catch((err) => console.log(err))
  };

  const handleCloseOkTooltip = () => {
    setOkTooltipOpen(false);
    setUserOnSignupScreeen(false);
  }

  const handleCloseErrorTooltip = () => {
    setErrorTooltipOpen(false);
  }

  const handleSwitchToSigninClick = () => {
    navigate('/signin');
    setUserOnSignupScreeen(false);
  }

  return (
    <div className="auth">
          <div className="auth__container">
            <form
              className="auth__form"
              onSubmit={handleSubmit}
            > 
              <h2 className="auth__title">{authTitle}</h2>
                <input
                  className="auth__input"
                  placeholder="Email"
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required/>
                <span className="email-error auth__input-error"></span>
                <input className="auth__input"
                  placeholder="Пароль"
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required/>
                <span className="password-error auth__input-error"></span>
              <button className="auth__submit-button" type="submit">{authButtonText}</button>
            </form>
            <div className="auth__signin-hint-container">
                <p className="auth__signin-hint">Уже зарегистрированы?</p>
                <a onClick={handleSwitchToSigninClick} className="auth__signin-link">Войти</a>
            </div>
          </div>
          <InfoTooltip
            tooltipStatus={"ok"}
            isOpen={isOkTooltipOpen}
            onClose={handleCloseOkTooltip}
          />
          <InfoTooltip 
            tooltipStatus={"error"}
            isOpen={isErrorTooltipOpen}
            onClose={handleCloseErrorTooltip}
            message={message}
          />
    </div>
  );
}

export default Register;




