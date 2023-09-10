import './Samples.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authApi from '../../utils/AuthApi';
import Checkbox from './Checkbox/Checkbox';
// Временно подключил картинки
import sampleImageVertical from '../../images/vertical2.svg';
import sampleImageHorizontal from '../../images/horizontal2.svg';

function Samples({ setDiploma }) {
	// Массив шаблонов
	const [samples, setSamples] = useState({
		"count": 2,
		"next": null,
		"previous": null,
		"results": [
			{
				"id": 2,
				"title": "horizotal template",
				"thumbnail": sampleImageHorizontal,
				"category": null,
				"color": null,
				"is_horizontal": true
			},
			{
				"id": 1,
				"title": "vertical template",
				"thumbnail": sampleImageVertical,
				"category": null,
				"color": null,
				"is_horizontal": false
			},
			{
				"id": 3,
				"title": "horizotal template",
				"thumbnail": sampleImageHorizontal,
				"category": null,
				"color": null,
				"is_horizontal": true
			},
			{
				"id": 4,
				"title": "vertical template",
				"thumbnail": sampleImageVertical,
				"category": null,
				"color": null,
				"is_horizontal": false
			},
			{
				"id": 5,
				"title": "horizotal template",
				"thumbnail": sampleImageHorizontal,
				"category": null,
				"color": null,
				"is_horizontal": true
			},
			{
				"id": 6,
				"title": "vertical template",
				"thumbnail": sampleImageVertical,
				"category": null,
				"color": null,
				"is_horizontal": false
			},
			{
				"id": 7,
				"title": "horizotal template",
				"thumbnail": sampleImageHorizontal,
				"category": null,
				"color": null,
				"is_horizontal": true
			},
			{
				"id": 8,
				"title": "vertical template",
				"thumbnail": sampleImageVertical,
				"category": null,
				"color": null,
				"is_horizontal": false
			}
		]
	});
	const [checkboxValues, setCheckboxValues] = useState({
		diplomas: false,
		thanks: false,
		certificates: false,
		is_vertikal: false,
		is_horizontal: false,
	});

	const handleCheckboxClick = (name, isChecked) => {
		setCheckboxValues({
			...checkboxValues,
			[name]: isChecked,
		});
	};
	// ОТПРАВЛЯЕМ ЗАПРОС НА БЭК ДЛЯ ПОЛУЧЕНИЯ ОТФИЛЬТРОВАНЫХ ШАБЛОНОВ
	
	async function getFilteredSamples() {
		try {
			const samplesFromBack = await authApi.handleFilterSamples(checkboxValues)
			setSamples(samplesFromBack);
		} catch (err) {
			console.log(err)
		}
	}
	// ПРИ ИЗМЕНЕНИИ ОБЬЕКТА НАСТРОЕК checkboxValues ОТПРАВЛЯЕМ ЗАБРОС НА БЭК
	// И СЕТАПИМ ШАБЛОНЫ К ПОКАЗУ 
	useEffect(() => {
		const allFalse = Object.values(checkboxValues).every((value) => value === false);
		if (!allFalse) {
			getFilteredSamples()
		}
	}, [checkboxValues]);

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
						/>
					</div>
					<span className="samples__menu-title">Цвета</span>
				</form>
				<div className="samples__container">
					{samples.results.map((item) => {
						return (
							<Link key={item.id} className='samples__link' to='/editor'>
								<img

									onClick={() => setDiploma(item)}
									alt={item.title}
									className="samples__image"
									src={item.thumbnail}
								/>
							</Link>
						);
					})}
				</div>
			</div>
		</main>
	);
}

export default Samples;
