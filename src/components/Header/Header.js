import './Header.css';
import { useLocation, Link } from 'react-router-dom';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import HeaderNav from '../HeaderNav/HeaderNav';
import Logo from '../Logo/Logo';
import avatar from '../../images/avatar.png';

export default function Header({
	setIsLoginPopupOpen,
	setIsRegisterPopupOpen,
	isloggedIn,
	setIsLoggedIn,
}) {
	const location = useLocation();
	// ПРОВЕРЯЕМ НА ГЛАВНОЙ ЛИ МЫ СТРАНИЦЕ , ПОКА НЕ ГОТОВ MAIN , ОТКЛЮЧИЛ ПРОВЕРКУ
	const isMainPage = false; // location.pathname === '/'

	function LogOut() {
		setIsLoggedIn(false);
		localStorage.clear('jwt');
	}

	return (
		<header className={`header ${isMainPage && 'header_section_main'}`}>
			<div className="header__column">
				<Link className="header__logo" to="/frontend">
					<Logo />
				</Link>
				{!isMainPage && <HeaderNav />}
			</div>

			{isloggedIn ? (
				<div className="header__profile">
					<Link to="/frontend/profile">
						<img src={avatar} alt="Аватар" className="header__avatar" />
					</Link>
					<button
						type="button"
						className="header__exit-button"
						onClick={() => LogOut()}
					>
						Выйти
					</button>
				</div>
			) : (
				<HeaderAuth
					setIsLoginPopupOpen={setIsLoginPopupOpen}
					setIsRegisterPopupOpen={setIsRegisterPopupOpen}
				/>
			)}
		</header>
	);
}
