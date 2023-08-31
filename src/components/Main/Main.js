import './Main.css';
import { useLocation, Navigate } from 'react-router-dom';
import Header from '../Header/Header';

export default function Main({ setIsLoginPopupOpen, setIsRegisterPopupOpen }) {
	const location = useLocation();
	const isMain =
		location.pathname === '/certificates-and-commendations/frontend';

	return (
		<div className="temporary__container">
			<p className="temporary__item">...Coming soon</p>
		</div>
	);
}