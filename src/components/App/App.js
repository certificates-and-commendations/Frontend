import './App.css';
import React, { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import CertificateEditor from '../CertificateEditor/CertificateEditor';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Recovery from '../Recovery/Recovery';
import Main from '../Main/Main';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import authApi from '../../utils/AuthApi';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
	const [isloggedIn, setIsloggedIn] = useState(true);
	const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
	const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
	const [isRecoveryPopupOpen, setIsRecoveryPopupOpen] = useState(false);
	const [isPageNotFoundOpen, setIsPageNotFoundOpen] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const location = useLocation();
	const navigate = useNavigate();

	function closeAllPopups() {
		setIsRegisterPopupOpen(false);
		setIsLoginPopupOpen(false);
		setIsRecoveryPopupOpen(false);
	}

	React.useEffect(() => {
		// настало время проверить токен
		if (localStorage.getItem('jwt')) {
			const jwt = localStorage.getItem('jwt');
			// проверим токен
			authApi
				.tokenValidity()
				.then((res) => {
					if (res) {
						// авторизуем пользователя
						setIsloggedIn(true);
						setCurrentUser(res);
						if (
							location.pathname === '/editor' ||
							location.pathname === '/' ||
							location.pathname === '/main'
						) {
							navigate(location);
						}
					}
				})
				.catch((err) => {
					console.log(err);
				});
			// здесь будем проверять токен
		}
	}, []);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="App">
				{!isPageNotFoundOpen && (
					<Header
						setIsLoginPopupOpen={setIsLoginPopupOpen}
						setIsRegisterPopupOpen={setIsRegisterPopupOpen}
						isloggedIn={isloggedIn}
						setIsLoggedIn={setIsloggedIn}
					/>
				)}
				<Routes>
					{/* Роут для Main */}
					<Route path="/" element={<Main />} />

					{/* Роут для Editor */}
					<Route
						path="/editor"
						element={
							<ProtectedRouteElement
								loggedIn={isloggedIn}
								element={CertificateEditor}
							/>
						}
					/>

					<Route
						path="/profile"
						element={
							<ProtectedRouteElement loggedIn={isloggedIn} element={Profile} />
						}
					/>

					<Route
						path="*"
						element={
							<PageNotFound setIsPageNotFoundOpen={setIsPageNotFoundOpen} />
						}
					/>
				</Routes>
				{!isPageNotFoundOpen && <Footer />}
				{isRegisterPopupOpen && (
					<Register
						title="Регистрация"
						buttonText="Зарегистрироваться"
						popupName="register"
						isOpened={isRegisterPopupOpen}
						onClose={() => closeAllPopups()}
						isloggedIn={isloggedIn}
					/>
				)}
				{isLoginPopupOpen && (
					<Login
						title="Вход"
						buttonText="Войти"
						popupName="login"
						isOpened={isLoginPopupOpen}
						onClose={() => closeAllPopups()}
						setIsRecoveryPopupOpen={setIsRecoveryPopupOpen}
						setIsloggedIn={setIsloggedIn}
						isloggedIn={isloggedIn}
					/>
				)}
				{isRecoveryPopupOpen && (
					<Recovery
						title="Забыли пароль?"
						buttonText="Отправить инструкцию"
						popupName="recovery"
						isOpened={isRecoveryPopupOpen}
						onClose={() => closeAllPopups()}
						setIsLoginPopupOpen={setIsLoginPopupOpen}
						isloggedIn={isloggedIn}
					/>
				)}
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
