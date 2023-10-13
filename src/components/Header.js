import logoPath from '../images/logo.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ loggedIn, isUserOnSignupScreeen, setUserOnSignupScreeen }) {
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const navigate = useNavigate();

  function handleMenuClick() {
    setMobileMenuOpened(!isMobileMenuOpened);
  }

  function handleSignupMenuClick() {
    setUserOnSignupScreeen(!isUserOnSignupScreeen);
    if (isUserOnSignupScreeen) {
      navigate('/signin')
    } else {
      navigate('/signup')
    }
  }

  return (
    <header className="header">
        <img className="header__logo" src={logoPath} alt="Логотип Место"/>
        <div className={`header__menu ${isMobileMenuOpened ? 'header__menu_opened' : ''}`}>
          {loggedIn && <a className="header__menu-email">uvaleks@mail.ru"</a>}
          <a onClick={handleSignupMenuClick} className="header__menu-button">{loggedIn ? "Выйти" : (isUserOnSignupScreeen ? 'Войти' : 'Зарегистрироваться')}</a>
        </div>
        <a onClick={handleMenuClick} className={`header__menu-burger ${isMobileMenuOpened ? 'header__menu-burger_icon_close' : 'header__menu-burger_icon_burger'}`}></a>
    </header>
  );
}

export default Header;
