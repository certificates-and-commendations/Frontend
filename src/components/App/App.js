import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
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
import { Samples } from '../Samples/Samples';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PageEditor from '../PageEditor/PageEditor';
import ComputerRestrictions from '../ComputerRestrictions/ComputerRestrictions';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import TablePopup from '../TablePopup/TablePopup';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [timeoutButton, setTimeoutButton] = useState(false);
	const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
	const [isRegisterConfirmationPopupOpen, setIsRegisterConfirmationPopupOpen] =
		useState(false);
	const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
	const [isRecoveryPopupOpen, setIsRecoveryPopupOpen] = useState(false);
	const [isPageNotFoundOpen, setIsPageNotFoundOpen] = useState(false);
	const [isTablePopupOpen, setIsTablePopupOpen] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
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
	// СТЕЙТ С ВЫБРАНЫМ ШАБЛОНОМ ДЛЯ РАБОТЫ В РЕДАКТОРЕ
	const [diploma, setDiploma] = useState({});
	// CТЕЙТ С СОЗДАННЫМИ ДОКУМЕНТАМИ
	const [myDocuments, setMyDocuments] = useState([]);
	const [infoToolTip, setInfoToolTip] = useState({
		text: '',
		status: true,
		opened: false,
	});
	// СТЕЙТ С МАССИВОМ СОХРАНЕНЫХ ШАБЛОНОВ ПОЛЬЗОВАТЕЛЯ
	const [favoriteSamples, setFavoriteSamples] = useState([]);
	// СТЕЙТ С МАССИВОМ ШАБЛОНОВ
	const [samples, setSamples] = useState([]);

	const location = useLocation();
	const navigate = useNavigate();

	const isEditorPage = location.pathname === '/editor';

	// стейты редактора
	const [textBlocks, setTextBlocks] = useState([]);
	const [imageURLsDownloads, setImageURLsDownloads] = useState([]);
	const [imageURLsElements, setImageURLsElements] = useState([]);
	const [uploadedCertificate, setUploadedCertificate] = useState(null);
	const [textPosition, setTextPosition] = useState([]);
	const [textBlockStyles, setTextBlockStyles] = useState([]);
	const [textBlockColors, setTextBlockColors] = useState([]);
	const [background, setBackground] = useState('');
	const certificateRef = useRef(null);

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
		setIsTablePopupOpen(false);
	}

	const isOpen =
		isRegisterPopupOpen ||
		isRegisterConfirmationPopupOpen ||
		isLoginPopupOpen ||
		isRecoveryPopupOpen ||
		isTablePopupOpen;

	React.useEffect(() => {
		function closeByEscape(evt) {
			if (evt.key === 'Escape') {
				closeAllPopups();
			}
		}

		function closeByOverlay(evt) {
			if (!evt.target.closest('.popup *') && !infoToolTip.opened) {
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

	const getAllSamples = () => {
		return authApi
			.getAllSamples()
			.then((res) => {
				if (res.results) {
					setSamples(res.results);
				}
			})
			.catch((err) => {
				setInfoToolTip({
					text: err.message,
					status: false,
					opened: true,
				});
			});
	};

	useEffect(() => {
		getAllSamples();
	}, []);

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
						setIsLoggedIn(true);
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
					localStorage.clear('jwt');
					console.log('Token check', err);
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

	// происходит закрытие InfoToolTip
	useEffect(() => {
		setTimeout(() => {
			setInfoToolTip({ text: '', status: true, opened: false });
		}, 3000);
	}, [infoToolTip]);

	const handleCreateJson = () => {
		const textDataArray = textBlocks.map((block, index) => ({
			text: block.text,
			font: {
				font: block.fontFamily,
				is_bold: textBlockStyles[index].isBold,
				is_italic: textBlockStyles[index].isItalic,
			},
			coordinate_y: parseInt(textPosition[index].y, 10),
			coordinate_x: parseInt(textPosition[index].x, 10),
			font_size: block.fontSize,
			font_color: textBlockColors[index].color,
			text_decoration: textBlockStyles[index].isDecoration,
			align: textBlockStyles[index].isAlign,
		}));

		const elementsDataArray = imageURLsElements.map((img, index) => ({
			image: img.base64,
			coordinate_x: img.position.x,
			coordinate_y: img.position.y,
		}));

		// Создание JSON объекта
		const jsonToSave = {
			title: uploadedCertificate.map((elem) => elem.title),
			background,
			texts: textDataArray,
			Element: elementsDataArray,
		};

		authApi
			.handleCreateDocument(jsonToSave)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const handleSavePDF = async () => {
		const scale = 3; // Увеличение разрешения в 3 раза
		const canvas = await html2canvas(certificateRef.current, { scale });
		const imgData = canvas.toDataURL('image/png');
		const pdf = new JsPDF();
		pdf.addImage(imgData, 'PNG', 0, 0, 210, 300, '', 'FAST');
		pdf.save('certificate.pdf');
		handleCreateJson();
	};

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="App">
				{!isPageNotFoundOpen && (
					<Header
						setIsLoginPopupOpen={setIsLoginPopupOpen}
						setIsRegisterPopupOpen={setIsRegisterPopupOpen}
						isloggedIn={isLoggedIn}
						setIsLoggedIn={setIsLoggedIn}
						onSavePDF={handleSavePDF}
					/>
				)}
				<Routes>
					{/* Роут для Main */}
					<Route path="/" element={<Main />} />

					{/* Роут для Editor */}
					<Route
						path="/editor"
						element={
							<PageEditor
								samples={samples}
								loggedIn={isLoggedIn}
								certificateRef={certificateRef}
								setTextBlocks={setTextBlocks}
								textBlocks={textBlocks}
								setImageURLsDownloads={setImageURLsDownloads}
								imageURLsDownloads={imageURLsDownloads}
								setImageURLsElements={setImageURLsElements}
								imageURLsElements={imageURLsElements}
								setUploadedCertificate={setUploadedCertificate}
								uploadedCertificate={uploadedCertificate}
								setTextPosition={setTextPosition}
								textPosition={textPosition}
								setTextBlockStyles={setTextBlockStyles}
								textBlockStyles={textBlockStyles}
								setTextBlockColors={setTextBlockColors}
								textBlockColors={textBlockColors}
								setBackground={setBackground}
							/>
						}
					/>
					<Route
						path="/samples"
						element={
							<Samples
								setDiploma={setDiploma}
								loggedIn={isLoggedIn}
								favoriteSamples={favoriteSamples}
								setFavoriteSamples={setFavoriteSamples}
								samples={samples.length > 0 ? samples : null}
								isLoggedIn={isLoggedIn}
							/>
						}
					/>
					{/* {Роут для Profile} */}
					<Route
						path="/profile"
						element={
							<ProtectedRouteElement
								loggedIn={isLoggedIn}
								element={Profile}
								setDiploma={setDiploma}
								favoriteSamples={favoriteSamples}
								setFavoriteSamples={setFavoriteSamples}
								myDocuments={myDocuments}
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
				{!isPageNotFoundOpen || !isEditorPage ? <Footer /> : null}
				{isRegisterPopupOpen && (
					<Register
						title="Регистрация"
						buttonText="Зарегистрироваться"
						popupName="register"
						isOpened={isRegisterPopupOpen}
						onClose={() => closeAllPopups()}
						isloggedIn={isLoggedIn}
						formValue={formValue}
						setFormValue={setFormValue}
						setTimeoutButton={setTimeoutButton}
						setIsRegisterConfirmationPopupOpen={
							setIsRegisterConfirmationPopupOpen
						}
						setIsRegisterPopupOpen={setIsRegisterPopupOpen}
						timer={() => timer()}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
						setInfoToolTip={setInfoToolTip}
					/>
				)}
				{isRegisterConfirmationPopupOpen && (
					<RegisterConfirmation
						title="Код подтверждения"
						buttonText="Подтвердить"
						popupName="registerConfirmation"
						isOpened={isRegisterConfirmationPopupOpen}
						onClose={() => closeAllPopups()}
						setIsLoggedIn={setIsLoggedIn}
						formValue={formValue}
						setFormValue={setFormValue}
						setTimeoutButton={setTimeoutButton}
						timeoutButton={timeoutButton}
						timer={() => timer()}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
						setInfoToolTip={setInfoToolTip}
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
						setIsLoggedIn={setIsLoggedIn}
						isloggedIn={isLoggedIn}
						formValue={formValue}
						setFormValue={setFormValue}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
						setInfoToolTip={setInfoToolTip}
					/>
				)}
				{isRecoveryPopupOpen && (
					<Recovery
						title="Забыли пароль?"
						buttonText="Отправить код"
						popupName="recovery"
						isOpened={isRecoveryPopupOpen}
						onClose={() => closeAllPopups()}
						setIsLoginPopupOpen={setIsLoginPopupOpen}
						isloggedIn={isLoggedIn}
						formValue={formValue}
						setFormValue={setFormValue}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
						setInfoToolTip={setInfoToolTip}
					/>
				)}
				{infoToolTip.opened && (
					<InfoToolTip
						text={infoToolTip.text}
						status={infoToolTip.status}
						opened={infoToolTip.opened}
						onClose={() => {
							setInfoToolTip({ text: '', status: true, opened: false });
						}}
					/>
				)}
				{isTablePopupOpen && (
					<TablePopup
						isOpened={isTablePopupOpen}
						popupName="TablePopup"
						onClose={() => closeAllPopups()}
					/>
				)}
				<ComputerRestrictions />
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
