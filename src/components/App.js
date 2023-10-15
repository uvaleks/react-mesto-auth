import * as auth from '../auth';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import Main from './Main';
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
    const [selectedCard, setSelectedCard] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isUserOnSignupScreeen, setUserOnSignupScreeen] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
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

    function handleAddCard(name, link) {
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
        setSelectedCard(null)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    const checkToken = async (jwt) => {
        return auth.getContent(jwt)
          .then((res) => {
            if (res) {
                setLoggedIn(true);
                setUserEmail(res.data.email);
            }
          })
      };
    
      useEffect(() => {
        const jwt = localStorage.getItem('jwt');
    
        if (jwt) {
            checkToken(jwt);
        }
      }, [loggedIn]);
    
      useEffect(() => {
        if (loggedIn) {navigate('/cards')};
      }, [loggedIn]);

      const [message, setMessage] = useState('');
      const [isErrorTooltipOpen, setErrorTooltipOpen] = useState(false);

      const onRegister = (password, email) => {
        return auth.register(password, email).then((res) => {
            if (!res || res.statusCode === 400) setMessage('Что-то пошло не так');
          return res;
        });
      };
    
      const onLogin = (password, email) => {
        return auth.authorize(email, password).then((res) => {
            if (res) {
                if (res.token) {
                    setLoggedIn(true);
                    localStorage.setItem('jwt', res.token);
                }
                if (res.message) {
                    setMessage(res.message);
                    setErrorTooltipOpen(true)
                }
            }
        });
      };

      const onSignOut = () => {
        if (loggedIn) {
            localStorage.removeItem('jwt');
            setLoggedIn(false);
            navigate('/signin')
            }
      };

    return (
            <CurrentUserContext.Provider value={currentUser}>
                <CardsContext.Provider value={cards}>
                    <div className="page">
                        <Header
                            loggedIn={loggedIn}
                            isUserOnSignupScreeen={isUserOnSignupScreeen}
                            setUserOnSignupScreeen={setUserOnSignupScreeen}
                            userEmail={userEmail}
                            onSignOut={onSignOut}
                        />
                        <Routes>
                            <Route path='/signup' element={
                                <Register
                                    onRegister={onRegister}
                                    authTitle={"Регистрация"}
                                    authButtonText={"Зарегистрироваться"}
                                    setUserOnSignupScreeen={setUserOnSignupScreeen}
                                    message={message}
                                    setMessage={setMessage}
                                />
                            }/>
                            <Route path='/signin' element={
                                <Login
                                    onLogin={onLogin}
                                    authTitle={"Вход"}
                                    authButtonText={"Войти"}
                                    message={message}
                                    isErrorTooltipOpen={isErrorTooltipOpen}
                                    setErrorTooltipOpen={setErrorTooltipOpen}
                                />
                            }/>
                            <Route path='/cards' element={<ProtectedRoute loggedIn={loggedIn} component={Main} onEditProfile={() => setEditProfileOpen(true)}
                                    onAddPlace={() => setAddPlaceOpne(true)}
                                    onEditAvatar={() => setEditAvatarOpen(true)}
                                    closeAllPopups={closeAllPopups}
                                    cards={cards}
                                    selectedCard={selectedCard}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                    isEditProfilePopupOpen={isEditProfilePopupOpen}
                                    onUpdateUser={handleUpdateUser}
                                    isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                                    onUpdateAvatar={handleUpdateAvatar}
                                    isAddPlacePopupOpen={isAddPlacePopupOpen}
                                    onAddCard={handleAddCard}
                                    onClose={closeAllPopups}
                                    />} />  
                            <Route path="*" element={loggedIn ? <Navigate to="/cards" /> : <Navigate to="/signin" />}/>
                        </Routes>
                        <Footer />
                    </div>
                </CardsContext.Provider>
            </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
