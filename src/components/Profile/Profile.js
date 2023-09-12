import './Profile.css';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import CenterSlider from '../CenterSlider/CenterSlider';
import { array } from '../../constants/constants';

function Profile({ setDiploma, diplomas, templates, favoriteSamples }) {
	const currentUser = React.useContext(CurrentUserContext);
	const trueValue = true;

	return (
		<main className="profile">
			<div className="profile__data">
				<h1 className="profile__title">Личный кабинет</h1>
				<p className="profile__email">{currentUser.email || `Загрузка...`}</p>
			</div>
			<div className="profile__templates">
				<h2 className="profile__subtitle">Избранные шаблоны</h2>
				<CenterSlider
					array={favoriteSamples || array}
					setDiploma={setDiploma}
					delay={5000}
					isFavoriteSamples={trueValue}
				/>
			</div>
			<div className="profile__documents">
				<h2 className="profile__subtitle">Созданные документы</h2>
				<CenterSlider
					array={diplomas || array}
					setDiploma={setDiploma}
					delay={3000}
				/>
			</div>
		</main>
	);
}

export default Profile;
