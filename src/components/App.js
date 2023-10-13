import * as auth from '../auth';
import Header from './Header';
import InfoTooltip from './InfoTooltip';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Footer from './Footer';
import api from '../utils/api';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import ProtectedRoute from './ProtectedRoute';
import { withRouter } from './withRouter'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';


function App() {
    const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '', _id: '', cohort: '' });
    const [cards, setCards] = useState([]);
    const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlaceOpne] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarOpen] = useState(false);
    const [isOkTooltipOpen, setOkTooltipOpen] = useState(true);
    const [isErrorTooltipOpen, setErrorTooltipOpen] = useState(true);
    const [selectedCard, setSelectedCard] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isUserOnSignupScreeen, setUserOnSignupScreeen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
          try {
            const userInfo = await api.getUserInfo();
            setCurrentUser(userInfo);
          } catch (error) {
            console.log("Error fetching user data:", error);
          }
        };
    
        fetchUserInfo();
    }, []);

    useEffect(() => {
      const fetchCards = async () => {
        try {
          const response = await api.getCards();
          setCards(response);
        } catch (error) {
          console.log("Error fetching cards:", error);
        }
      };
  
      fetchCards();
    }, []);

    async function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
    
        try {
            const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        } catch (error) {
            console.log("Like card error:", error);
        }
    }

    async function handleCardDelete(card) {
        try {
            const response = await api.deleteCard(card._id);
            if (response.message === 'Пост удалён') {
                const newCards = cards.filter(function (item) {
                    return item._id !== card._id;
                  })
                setCards(newCards);
            }
        } catch (error) {
            console.log("Deleting card error:", error);
        }
    }

    function handleUpdateUser({name, about}) {
        api.patchUserInfo({name, about})
        .then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch((error) => {
            console.log("Updating user info error:", error);
        })
    }

    function handleUpdateAvatar(link) {
        api.patchAvatar(link)
        .then((res) => {
            setCurrentUser({avatar: res.avatar});
            closeAllPopups();
        })
        .catch((error) => {
            console.log("Updating avatar error:", error);
        })
    }

    function handleAddPlaceSubmit(name, link) {
        api.postCard({name, link})
        .then((newCard) => {
            setCards([newCard, ...cards]); 
            closeAllPopups();
        })
        .catch((error) => {
            console.log("Adding card error:", error);
        })
    }
 
    function closeAllPopups() {
        setEditProfileOpen(false)
        setAddPlaceOpne(false)
        setEditAvatarOpen(false)
        setOkTooltipOpen(false)
        setErrorTooltipOpen(false)
        setSelectedCard(null)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    return (
            <CurrentUserContext.Provider value={currentUser}>
                <CardsContext.Provider value={cards}>
                    <div className="page">
                        <Header
                            loggedIn={loggedIn}
                            isUserOnSignupScreeen={isUserOnSignupScreeen}
                            setUserOnSignupScreeen={setUserOnSignupScreeen}
                        />
                        <Routes>
                            <Route path='/signup' element={
                                <Register
                                    authTitle={"Регистрация"}
                                    authButtonText={"Зарегистрироваться"}
                                >
                                    <InfoTooltip
                                        tooltipStatus={"ok"}
                                        isOpen={isOkTooltipOpen}
                                        onClose={closeAllPopups}
                                    />
                                    <InfoTooltip 
                                        tooltipStatus={"error"}
                                        isOpen={isErrorTooltipOpen}
                                        onClose={closeAllPopups}
                                    />
                                </Register>
                            }/>
                            <Route path='/signin' element={
                                <Login 
                                    authTitle={"Вход"}
                                    authButtonText={"Войти"}
                                />
                            }/>
                            <Route path='/cards' element={<ProtectedRoute loggedIn={loggedIn} component={
                                <Main
                                    onEditProfile={() => setEditProfileOpen(true)}
                                    onAddPlace={() => setAddPlaceOpne(true)}
                                    onEditAvatar={() => setEditAvatarOpen(true)}
                                    closeAllPopups={closeAllPopups}
                                    cards={cards}
                                    selectedCard={selectedCard}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                >
                                    <EditProfilePopup
                                        isOpen={isEditProfilePopupOpen}
                                        onClose={closeAllPopups}
                                        onUpdateUser={handleUpdateUser}
                                    />
                                    <EditAvatarPopup
                                        isOpen={isEditAvatarPopupOpen}
                                        onClose={closeAllPopups}
                                        onUpdateAvatar={handleUpdateAvatar}
                                    />
                                    <AddPlacePopup
                                        isOpen={isAddPlacePopupOpen}
                                        onClose={closeAllPopups}
                                        onAddCard={handleAddPlaceSubmit}
                                    />
                                    <PopupWithForm
                                        onClose={closeAllPopups}
                                        popupName={'confirm-delete'}
                                        title={"Вы уверены?"}
                                        buttonText={"Да"}
                                    />
                                    <ImagePopup
                                        card={selectedCard}
                                        onClose={closeAllPopups}
                                    />
                                </Main>
                            } />} />
                            <Route path="*" element={loggedIn ? <Navigate to="/cards" /> : <Navigate to="/signin" />}/>
                        </Routes>
                        <Footer />
                    </div>
                </CardsContext.Provider>
            </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
