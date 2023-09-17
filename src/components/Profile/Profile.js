import './Profile.css';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import CenterSlider from '../CenterSlider/CenterSlider';
import { array } from '../../constants/constants';

function Profile({
	setDiploma,
	diplomas,
	templates,
	favoriteSamples,
	setFavoriteSamples,
}) {
	const currentUser = React.useContext(CurrentUserContext);

	return (
		<main className="profile">
			<div className="profile__data">
				<h1 className="profile__title">Личный кабинет</h1>
				<p className="profile__email">{currentUser.email || `Загрузка...`}</p>
			</div>
			<div className="profile__templates">
				<h2 className="profile__subtitle">Избранные шаблоны</h2>
				<CenterSlider
					array={favoriteSamples}
					setDiploma={setDiploma}
					isFavoriteSamples
					setFavoriteSamples={setFavoriteSamples}
				/>
			</div>
			<div className="profile__documents">
				<h2 className="profile__subtitle">Созданные документы</h2>
				<CenterSlider array={diplomas || array} setDiploma={setDiploma} />
			</div>
		</main>
	);
}

export default Profile;
