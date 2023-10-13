import logoPath from '../images/logo.svg';
import { useState } from 'react';

function Header() {
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);

  function handleMenuClick() {
    setMobileMenuOpened(!isMobileMenuOpened);
  }

  return (
    <header className="header">
        <img className="header__logo" src={logoPath} alt="Логотип Место"/>
        <div className={`header__menu ${isMobileMenuOpened ? 'header__menu_opened' : ''}`}>
          <a className="header__menu-email">uvaleks@mail.ru</a>
          <a className="header__menu-button">Войти</a>
        </div>
        <a onClick={handleMenuClick} className={`header__menu-burger ${isMobileMenuOpened ? 'header__menu-burger_icon_close' : 'header__menu-burger_icon_burger'}`}></a>
    </header>
  );
}

export default Header;
