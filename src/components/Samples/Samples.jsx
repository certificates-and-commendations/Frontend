import './Samples.css';
import { useState, useEffect } from 'react';
import authApi from '../../utils/AuthApi';
import Checkbox from './Checkbox/Checkbox';
// Временно подключил картинки
import sampleImageVertical from '../../images/vertical2.svg';
import sampleImageHorizontal from '../../images/horizontal2.svg';

function Samples() {
	// Массив шаблонов
	const [samples, setSamples] = useState([
		{
			image: sampleImageVertical,
			alt: 'картинка',
			id: '121241',
		},
		{
			image: sampleImageHorizontal,
			alt: 'картинка',
			id: '123123',
		},
	]);
	const [checkboxValues, setCheckboxValues] = useState({
		diplomas: false,
		thanks: false,
		certificates: false,
		vertikal: false,
		horizontal: false,
	});

	const handleCheckboxClick = (name, isChecked) => {
		setCheckboxValues({
			...checkboxValues,
			[name]: isChecked,
		});
	};

	// async function getSamples() {
	//     try {
	//         const samplesFromBack = await authApi
	//         setSamples(samplesFromBack);
	//     } catch(err) {
	//         console.log(err)
	//     }
	// }

	useEffect(() => {
		// getSamples()
	});

	return (
		<main className="samples">
			<h1 className="samples__title">Шаблоны</h1>
			<div className="samples__main">
				<form className="samples__menu">
					<span className="samples__menu-title">Шаблоны</span>
					<div className="samples__menu-continer">
						<Checkbox
							name="thanks"
							state={checkboxValues}
							onClick={handleCheckboxClick}
							text="Благодарности"
						/>
						<Checkbox
							name="diplomas"
							state={checkboxValues}
							onClick={handleCheckboxClick}
							text="Грамоты"
						/>
						<Checkbox
							name="certificates"
							state={checkboxValues}
							onClick={handleCheckboxClick}
							text="Сертификаты"
						/>
					</div>
					<span className="samples__menu-title">Ориентация</span>
					<div className="samples__menu-continer">
						<Checkbox
							name="horizontal"
							state={checkboxValues}
							onClick={handleCheckboxClick}
							text="Горизонтальная"
						/>
						<Checkbox
							name="vertikal"
							state={checkboxValues}
							onClick={handleCheckboxClick}
							text="Вертикальнаяы"
						/>{' '}
					</div>
					<span className="samples__menu-title">Цвета</span>
				</form>
				<div className="samples__container">
					{samples.map((item) => {
						return (
							<img
								key={item.id}
								alt={item.alt}
								className="samples__image"
								src={item.image}
							/>
						);
					})}
				</div>
			</div>
		</main>
	);
}

export default Samples;
