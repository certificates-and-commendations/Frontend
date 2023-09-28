import './Main.css';
import { useLocation, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Opportunities from './Opportunities/Opportunities';
import BestOptions from './BestOptions/BestOptions';
import Promo from './Promo/Promo';
import LandingSamples from './LandingSamples/LandingSamples';

export default function Main({ setIsLoginPopupOpen, setIsRegisterPopupOpen }) {
	const location = useLocation();

	return (
		<>
			<Promo />
			<LandingSamples />
			<Opportunities />
			<BestOptions />
		</>
	);
}
