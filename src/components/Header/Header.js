import Logo from '../Logo/Logo';
import HeaderAuth from './HeaderAuth/HeaderAuth';
import './Header.css';
import HeaderNav from './HeaderNav/HeaderNav';

export default function Header({ isMain }) {
	const isHeaderClassName = `header ${isMain && 'header_section_main'}`;

	return (
		<header className={isHeaderClassName}>
			<div className="header__column">
				<Logo />
				{!isMain && <HeaderNav />}
			</div>
			<HeaderAuth />
		</header>
	);
}
