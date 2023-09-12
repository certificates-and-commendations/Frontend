import './Samples.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authApi from '../../utils/AuthApi';
import Checkbox from './Checkbox/Checkbox';
import Sample from './Sample/Sample';
// Временно подключил картинки
import sampleImageVertical from '../../images/vertical2.svg';
import sampleImageHorizontal from '../../images/horizontal2.svg';

function Samples({ setDiploma }) {
	// Массив шаблонов
	const [samples, setSamples] = useState({
		count: 2,
		next: null,
		previous: null,
		results: [
			{
				id: 2,
				title: 'horizotal template',
				thumbnail: sampleImageHorizontal,
				category: null,
				color: null,
				is_horizontal: true,
			},
			{
				id: 1,
				title: 'vertical template',
				thumbnail: sampleImageVertical,
				category: null,
				color: null,
				is_horizontal: false,
			},
			{
				id: 3,
				title: 'horizotal template',
				thumbnail: sampleImageHorizontal,
				category: null,
				color: null,
				is_horizontal: true,
			},
			{
				id: 4,
				title: 'vertical template',
				thumbnail: sampleImageVertical,
				category: null,
				color: null,
				is_horizontal: false,
			},
			{
				id: 5,
				title: 'horizotal template',
				thumbnail: sampleImageHorizontal,
				category: null,
				color: null,
				is_horizontal: true,
			},
			{
				id: 6,
				title: 'vertical template',
				thumbnail: sampleImageVertical,
				category: null,
				color: null,
				is_horizontal: false,
			},
			{
				id: 7,
				title: 'horizotal template',
				thumbnail: sampleImageHorizontal,
				category: null,
				color: null,
				is_horizontal: true,
			},
			{
				id: 8,
				title: 'vertical template',
				thumbnail: sampleImageVertical,
				category: null,
				color: null,
				is_horizontal: false,
			},
		],
	});
	// СТЕЙТ СОСТОЯНИЙ КНОПОК 
	const [checkboxValues, setCheckboxValues] = useState({
		diplomas: false,
		thanks: false,
		certificates: false,
		is_vertical: false,
		is_horizontal: false,
	});
	// ЗАПИСЫВАЕТ СОСТОЯНИЕ КНОПКИ В ОБЬЕКТ СОСТОЯНИЙ
	const handleCheckboxClick = (name, isChecked) => {
		setCheckboxValues({
			...checkboxValues,
			[name]: isChecked,
		});
	};
	// ОТПРАВЛЯЕМ ЗАПРОС НА СНЯТИЕ ЛАЙКА
	const handleDislike = (e, item) => {
		e.stopPropagation();
		// return authApi.addLike(item)
		// 	.then((res) => {
		// 		const newSamples = samples.filter((card) => card.id === res.id)
		// 		setSamples(newSamples)
		// 	})
		// 	.catch((err) => console.log(err))
		console.log('Dislike', item);
	};
	// ОТПРАВЛЯЕМ ЗАПРОС НА ПОСТАНОВКУ ЛАЙКА
	const handleLike = (e, item) => {
		e.stopPropagation();
		// return authApi.addLike(item)
		// 	.then((res) => {
		// 		const newSamples = samples.filter((card) => card.id === res.id)
		// 		setSamples(newSamples)
		// 	})
		// 	.catch((err) => console.log(err))
		console.log('Like', item);
	};
	// СЕТАПИМ СТЕЙТ "ВЫБРАНЫЙ ШАБЛОН"
	const handleImageClick = (e, item) => {
		e.stopPropagation();
		setDiploma(item);
		console.log('Click');
	};
	// ОТПРАВЛЯЕМ ЗАПРОС НА БЭК ДЛЯ ПОЛУЧЕНИЯ ОТФИЛЬТРОВАНЫХ ШАБЛОНОВ
	async function getFilteredSamples() {
		try {
			const samplesFromBack = await authApi.handleFilterSamples(checkboxValues);
			setSamples(samplesFromBack);
		} catch (err) {
			console.log(err);
		}
	}
	// ПРИ ИЗМЕНЕНИИ ОБЬЕКТА НАСТРОЕК checkboxValues ОТПРАВЛЯЕМ ЗАБРОС НА БЭК
	// И СЕТАПИМ ШАБЛОНЫ К ПОКАЗУ
	useEffect(() => {
		const allFalse = Object.values(checkboxValues).every(
			(value) => value === false
		);
		if (!allFalse) {
			getFilteredSamples(checkboxValues);
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
							name="is_horizontal"
							state={checkboxValues}
							onClick={handleCheckboxClick}
							text="Горизонтальная"
						/>
						<Checkbox
							name="is_vertical"
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
							<Sample
								key={item.id}
								item={item}
								onImageClick={handleImageClick}
								onLike={handleLike}
								onDislike={handleDislike}
							/>
						);
					})}
				</div>
			</div>
		</main>
	);
}

export default Samples;
