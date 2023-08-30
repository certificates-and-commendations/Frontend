import './Header.css';
import { useLocation } from 'react-router-dom';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import HeaderNav from '../HeaderNav/HeaderNav';
import Logo from '../Logo/Logo';

export default function Header({
	setIsLoginPopupOpen,
	setIsRegisterPopupOpen,
}) {
	const location = useLocation();
	// ПРОВЕРЯЕМ НА ГЛАВНОЙ ЛИ МЫ СТРАНИЦЕ , ПОКА НЕ ГОТОВ MAIN , ОТКЛЮЧИЛ ПРОВЕРКУ
	const isMainPage = false; // location.pathname === '/'

	return (
		<header className={`header ${isMainPage && 'header_section_main'}`}>
			<div className="header__column">
				<Logo />
				{!isMainPage && <HeaderNav />}
			</div>
			<HeaderAuth
				setIsLoginPopupOpen={setIsLoginPopupOpen}
				setIsRegisterPopupOpen={setIsRegisterPopupOpen}
			/>
		</header>
	);
}
