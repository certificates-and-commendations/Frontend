import './App.css';
import React, { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import CertificateEditor from '../CertificateEditor/CertificateEditor';
import Register from '../Register/Register';
import RegisterConfirmation from '../RegisterConfirmation/RegisterConfirmation';
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
	const [timeoutButton, setTimeoutButton] = useState(false);
	const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
	const [isRegisterConfirmationPopupOpen, setIsRegisterConfirmationPopupOpen] =
		useState(true);
	const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
	const [isRecoveryPopupOpen, setIsRecoveryPopupOpen] = useState(false);
	const [isPageNotFoundOpen, setIsPageNotFoundOpen] = useState(false);
	const [formValue, setFormValue] = useState({
		email: '',
		password: '',
		first: '',
		second: '',
		thirst: '',
		fourth: '',
		code: '',
	});
	const [currentUser, setCurrentUser] = useState({});
	const [diploma, setDiploma] = useState({});
	const location = useLocation();
	const navigate = useNavigate();

	function closeAllPopups() {
		setIsRegisterPopupOpen(false);
		setIsLoginPopupOpen(false);
		setIsRecoveryPopupOpen(false);
		setIsRegisterConfirmationPopupOpen(false);
		setFormValue({
			email: '',
			password: '',
			first: '',
			second: '',
			thirst: '',
			fourth: '',
			code: '',
		});
	}

	const isOpen =
		isRegisterPopupOpen ||
		isRegisterConfirmationPopupOpen ||
		isLoginPopupOpen ||
		isRecoveryPopupOpen;

	React.useEffect(() => {
		function closeByEscape(evt) {
			if (evt.key === 'Escape') {
				closeAllPopups();
			}
		}
		function closeByOverlay(evt) {
			if (!evt.target.closest('.popup *')) {
				closeAllPopups();
			}
		}
		if (isOpen) {
			// навешиваем только при открытии
			document.addEventListener('keydown', closeByEscape);
			document.addEventListener('mousedown', closeByOverlay);
			return () => {
				document.removeEventListener('keydown', closeByEscape);
				document.removeEventListener('mousedown', closeByOverlay);
			};
		}
	}, [isOpen]);

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
							location.pathname === '/main' ||
							location.pathname === '/profile'
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

	function timer() {
		const startTime = new Date();
		const stopTime = startTime.setMinutes(startTime.getMinutes() + 1);
		// запускаем ежесекундный отсчёт
		const countDown = setInterval(() => {
			// текущее время
			const now = new Date().getTime();
			// сколько времени осталось до конца таймера
			const remain = stopTime - now;
			// переводим миллисекунды в минуты и секунды
			const min = Math.floor((remain % (1000 * 60 * 60)) / (1000 * 60));
			let sec = Math.floor((remain % (1000 * 60)) / 1000);
			// если значение текущей секунды меньше 10, добавляем вначале ведущий ноль
			sec = sec < 10 ? `0${sec}` : sec;
			// отправляем значение таймера на страницу в нужный раздел
			setTimeoutButton(`${min}:${sec}`);
			// если время вышло
			if (remain < 0) {
				// останавливаем отсчёт
				clearInterval(countDown);
				// пишем текст вместо цифр
				setTimeoutButton(false);
			}
		}, 1000);
	}

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
								diploma={diploma}
							/>
						}
					/>

					<Route
						path="/profile"
						element={
							<ProtectedRouteElement
								loggedIn={isloggedIn}
								element={Profile}
								setDiploma={setDiploma}
							/>
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
						formValue={formValue}
						setFormValue={setFormValue}
						setTimeoutButton={setTimeoutButton}
						setIsRegisterConfirmationPopupOpen={
							setIsRegisterConfirmationPopupOpen
						}
						setIsRegisterPopupOpen={setIsRegisterPopupOpen}
						timer={() => timer()}
					/>
				)}
				{isRegisterConfirmationPopupOpen && (
					<RegisterConfirmation
						title="Код подтверждения"
						buttonText="Подтвердить"
						popupName="registerConfirmation"
						isOpened={isRegisterConfirmationPopupOpen}
						onClose={() => closeAllPopups()}
						setIsloggedIn={setIsloggedIn}
						formValue={formValue}
						setFormValue={setFormValue}
						setTimeoutButton={setTimeoutButton}
						timeoutButton={timeoutButton}
						timer={() => timer()}
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
						formValue={formValue}
						setFormValue={setFormValue}
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
						formValue={formValue}
						setFormValue={setFormValue}
					/>
				)}
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
