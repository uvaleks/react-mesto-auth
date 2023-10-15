import logoPath from '../images/logo.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ loggedIn, isUserOnSignupScreeen, setUserOnSignupScreeen, userEmail, onSignOut }) {
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const navigate = useNavigate();

  function handleMenuClick() {
    setMobileMenuOpened(!isMobileMenuOpened);
  }

  function handleSignupMenuClick() {
    if (loggedIn) {
      onSignOut()
    } else {
      setUserOnSignupScreeen(!isUserOnSignupScreeen)
    }
  }

  useEffect(() => {
    if (isUserOnSignupScreeen) {
      navigate('/signup')
    } else {
      navigate('/signin')
    }
  }, [isUserOnSignupScreeen]);

  return (
    <header className="header">
        <img className="header__logo" src={logoPath} alt="Логотип Место"/>
        <div className={`header__menu ${isMobileMenuOpened ? 'header__menu_opened' : ''}`}>
          {loggedIn && <a className="header__menu-email">{userEmail}</a>}
          <a onClick={handleSignupMenuClick} className="header__menu-button">{loggedIn ? "Выйти" : (isUserOnSignupScreeen ? 'Войти' : 'Зарегистрироваться')}</a>
        </div>
        <a onClick={handleMenuClick} className={`header__menu-burger ${isMobileMenuOpened ? 'header__menu-burger_icon_close' : 'header__menu-burger_icon_burger'}`}></a>
    </header>
  );
}

export default Header;
