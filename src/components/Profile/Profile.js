import './Profile.css';
import React from 'react';
import Slider from 'react-slick';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import CenterSlider from '../CenterSlider/CenterSlider';
import horizontal from '../../images/horizontal.jpg';
import vertical from '../../images/vertical.jpg';

function Profile() {
	const currentUser = React.useContext(CurrentUserContext);

	const massiv = [
		{
			name: 'diploma',
			image: horizontal,
			type: 'horizontal',
		},
		{
			name: 'diploma',
			image: horizontal,
			type: 'horizontal',
		},
		{
			name: 'diploma',
			image: horizontal,
			type: 'horizontal',
		},
		{
			name: 'gramota',
			image: vertical,
			type: 'vertical',
		},
		{
			name: 'gramota',
			image: vertical,
			type: 'vertical',
		},
		{
			name: 'gramota',
			image: vertical,
			type: 'vertical',
		},
	];

	return (
		<section className="profile">
			<div className="profile__data">
				<h1 className="profile__title">Личный кабинет</h1>
				<p className="profile__email">{currentUser.email || `Загрузка...`}</p>
			</div>
			<div className="profile__templates">
				<h2 className="profile__subtitle">Избранные шаблоны</h2>
				<CenterSlider massiv={massiv} />
			</div>
			<div className="profile__documents">
				<h2 className="profile__subtitle">Созданные документы</h2>
				<CenterSlider massiv={massiv} />
			</div>
		</section>
	);
}

export default Profile;
