/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import React, { useState } from 'react';
import {
	Route,
	Navigate,
	useLocation,
	Routes,
	useNavigate,
} from 'react-router-dom';
import CertificateEditor from '../CertificateEditor/CertificateEditor';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Recovery from '../Recovery/Recovery';
import authApi from '../../utils/AuthApi';
// import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
	const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
	const [isRecoveryPopupOpen, setIsRecoveryPopupOpen] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const location = useLocation();
	const navigate = useNavigate();

	React.useEffect(() => {
		// настало время проверить токен
		if (localStorage.getItem('jwt')) {
			const jwt = localStorage.getItem('jwt');
			if (jwt) {
				// проверим токен
				authApi
					.tokenValidity()
					.then((res) => {
						if (res) {
							// авторизуем пользователя
							setIsLoggedIn(true);
							setCurrentUser(res);
							if (
								location.pathname === '/editor' ||
								location.pathname === '/' ||
								location.pathname === '/main'
							) {
								navigate(location);
							}
						}
						return res;
					})
					.catch((err) => {
						console.log(err);
					});
			}
			// здесь будем проверять токен
		}
	}, [isLoggedIn]);

	function closeAllPopups() {
		setIsRegisterPopupOpen(false);
		setIsLoginPopupOpen(false);
		setIsRecoveryPopupOpen(false);
	}

	return (
		<>
			<main className="main-content">
				<CertificateEditor />
			</main>
			{isRegisterPopupOpen ? (
				<Register
					title="Регистрация"
					buttonText="Зарегистрироваться"
					popupName="register"
					isOpened={isRegisterPopupOpen}
					onClose={() => closeAllPopups()}
					isloggedIn={isLoggedIn}
					setIsLoggedIn={setIsLoggedIn}
				/>
			) : undefined}
			{isLoginPopupOpen ? (
				<Login
					title="Вход"
					buttonText="Войти"
					popupName="login"
					isOpened={isLoginPopupOpen}
					onClose={() => closeAllPopups()}
					setIsRecoveryPopupOpen={setIsRecoveryPopupOpen}
					setIsloggedIn={setIsLoggedIn}
					isloggedIn={isLoggedIn}
				/>
			) : undefined}
			{isRecoveryPopupOpen ? (
				<Recovery
					title="Забыли пароль?"
					buttonText="Отправить инструкцию"
					popupName="recovery"
					isOpened={isRecoveryPopupOpen}
					onClose={() => closeAllPopups()}
					setIsLoginPopupOpen={setIsLoginPopupOpen}
				/>
			) : undefined}
			{/* <Routes > */}
			{/* По готовности компонента Main кладем его в роут */}
			{/* <Route path='/' element={ Ожидаю Main } /> */}

			{/* По готовности компонента Editor кладем его в роут */}
			{/* <Route path='/editor' element={<ProtectedRouteElement loggedIn={isloggedIn} element={ Ожидаю Editor } />} /> */}

			{/* По готовности компонента Editor кладем его в роут */}
			{/* <Route path='/profile' element={<ProtectedRouteElement loggedIn={isloggedIn} element={ Ожидаю Profile } />} /> */}

			{/* По готовности компонента NotFoundPage кладем его в роут */}
			{/* <Route path='*' element={ Ожидаю NotFoundPage } /> */}

			{/* </Routes> */}
		</>
	);
}

export default App;
