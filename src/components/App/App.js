import './App.css';
import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CertificateEditor from '../CertificateEditor/CertificateEditor';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Recovery from '../Recovery/Recovery';
import Main from '../Main/Main';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';

function App() {
	const [isloggedIn, setIsloggedIn] = useState(true);
	const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
	const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
	const [isRecoveryPopupOpen, setIsRecoveryPopupOpen] = useState(false);

	function closeAllPopups() {
		setIsRegisterPopupOpen(false);
		setIsLoginPopupOpen(false);
		setIsRecoveryPopupOpen(false);
	}

	return (
		<div className="App">
			<Header
				setIsLoginPopupOpen={setIsLoginPopupOpen}
				setIsRegisterPopupOpen={setIsRegisterPopupOpen}
			/>
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

				{/* По готовности компонента NotFoundPage кладем его в роут */}
				{/* <Route path='*' element={ Ожидаю NotFoundPage } /> */}
			</Routes>

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
