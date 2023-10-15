import './Profile.css';
import React, { useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import CenterSlider from '../CenterSlider/CenterSlider';

function Profile({
	setDiploma,
	myDocuments,
	templates,
	favoriteSamples,
	setFavoriteSamples,
	onGetUsersDocument,
	onGetUsersDocumentById,
}) {
	const currentUser = React.useContext(CurrentUserContext);

	function getDocumentUsers() {
		return onGetUsersDocument();
	}

	useEffect(() => {
		getDocumentUsers();
	}, []);

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
					isFavoriteSamples="true"
					setFavoriteSamples={setFavoriteSamples}
				/>
			</div>
			<div className="profile__documents">
				<h2 className="profile__subtitle">Созданные документы</h2>
				<CenterSlider array={myDocuments} setDiploma={setDiploma} />
			</div>
		</main>
	);
}

export default Profile;
