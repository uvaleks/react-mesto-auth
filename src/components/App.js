import Header from './Header';
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


function App() {
    const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '', _id: '', cohort: '' });
    const [cards, setCards] = useState([]);
    const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlaceOpne] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

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
        setSelectedCard(null)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <CardsContext.Provider value={cards}>
                <div className="page">
                    <Header />
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
                    />
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
                    <Footer />
                </div>
            </CardsContext.Provider>
        </CurrentUserContext.Provider>
  );
}

export default App;
