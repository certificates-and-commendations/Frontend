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
		<div className="App">
			{!isPageNotFoundOpen && (
				<Header
					setIsLoginPopupOpen={setIsLoginPopupOpen}
					setIsRegisterPopupOpen={setIsRegisterPopupOpen}
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

				{/* По готовности компонента Samples кладем его в роут */}
				{/* <Route path='/profile' element={<ProtectedRouteElement loggedIn={isloggedIn} element={ Ожидаю Samples } />} /> */}

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
	);
}

export default App;
