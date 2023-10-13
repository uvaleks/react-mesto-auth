function Register({ authTitle, authButtonText}) {
  return (
    <div className="auth">
          <div className="auth__container">
            <form className="auth__form"> 
              <h2 className="auth__title">{authTitle}</h2>
                <input className="auth__input" type="email" name="email" placeholder="Email" autoComplete="off" minLength="6" maxLength="40" required/>
                <span className="email-error auth__input-error"></span>
                <input className="auth__input" type="password" name="password" placeholder="Пароль" autoComplete="off" minLength="8" maxLength="32" required/>
                <span className="password-error auth__input-error"></span>
              <button className="auth__submit-button" type="submit">{authButtonText}</button>
            </form>
            <div className="auth__signin-hint-container">
                <p className="auth__signin-hint">Уже зарегистрированы?</p>
                <a className="auth__signin-link">Войти</a>
            </div>
          </div>
    </div>
  );
}

export default Register;



