import './Main.css';
import { useLocation, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Opportunities from './Opportunities/Opportunities';
import BestOptions from './BestOptions/BestOptions';
import Promo from './Promo/Promo';

export default function Main({ setIsLoginPopupOpen, setIsRegisterPopupOpen }) {
	const location = useLocation();
	const isMain =
		location.pathname === '/certificates-and-commendations/frontend';

	return (
		<>
			<Promo />
			<Opportunities />
			<BestOptions />
		</>
	);
}
