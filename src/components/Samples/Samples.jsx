import './Samples.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authApi from '../../utils/AuthApi';
import Checkbox from './Checkbox/Checkbox';
import Sample from './Sample/Sample';
// ВРЕМЕННЫЙ МАССИВ ШАБЛОНОВ
import { temporarySamles } from '../../constants/constants';

function Samples({ setDiploma, favoriteSamples, setFavoriteSamples, samples }) {
	const [separetedSamples, setSeparatedSamples] = useState({
		column1: [],
		column2: [],
		column3: [],
	});
	// ВРЕМЕННЫЙ ОБЬЕКТ, ДАЛЬШЕ ШАБЛОНЫ К ПОКАЗУ БУДУТ БРАТЬСЯ ИЗ ПРОПСОВ
	const [samplesTemp, setSamplesTemp] = useState(temporarySamles);
	// ОБЬЕКТ НАСТРОЕК , СОЖЕРЖИТ ВСЕ СОСТОЯНИЕ ЧЕКБОКСОВ-КНОПОК
	const [checkboxValues, setCheckboxValues] = useState({
		diplomas: false,
		thanks: false,
		certificates: false,
		is_vertical: false,
		is_horizontal: false,
	});

	// РАЗДЕЛЯЕМ МАССИВ ШАБЛОНОВ НА ТРИ КОЛЛОНКИ
	useEffect(() => {
		const column1 = [];
		const column2 = [];
		const column3 = [];

		for (let i = 0; i < samplesTemp.results.length; i++) {
			const index = i % 3;

			if (index === 0) {
				column1.push(samplesTemp.results[i]);
			} else if (index === 1) {
				column2.push(samplesTemp.results[i]);
			} else {
				column3.push(samplesTemp.results[i]);
			}
		}

		setSeparatedSamples({
			column1,
			column2,
			column3,
		});
	}, [samplesTemp]);

	const handleCheckboxClick = (name, isChecked) => {
		setCheckboxValues({
			...checkboxValues,
			[name]: isChecked,
		});
	};

	const handleDislike = (e, item) => {
		e.stopPropagation();
		return authApi
			.removeLike(item.id)
			.then((res) => {
				console.log(res);
				const newSamples = favoriteSamples.filter(
					(card) => card.id !== item.id
				);
				setFavoriteSamples(newSamples);
				console.log('dislike ok')
			})
	};

	const handleLike = (e, item) => {
		e.stopPropagation();
		return authApi
			.addLike(item.id)
			.then((res) => {
				const newSamples = samples.filter((card) => card.id === res.id);
				setFavoriteSamples([...favoriteSamples, item]);
				console.log('like ok')
			})
			.catch((err) => console.log(err));
	};

	const handleImageClick = (e, item) => {
		e.stopPropagation();
		setDiploma(item);
	};
	// ОТПРАВЛЯЕМ ЗАПРОС НА БЭК ДЛЯ ПОЛУЧЕНИЯ ОТФИЛЬТРОВАНЫХ ШАБЛОНОВ
	async function getFilteredSamples() {
		try {
			const samplesFromBack = await authApi.handleFilterSamples(checkboxValues);
			setSamplesTemp(samplesFromBack);
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
					<div className="samples__container-inside">
						{separetedSamples.column1.map((item) => {
							return (
								<Sample
									key={item.id}
									item={item}
									onImageClick={handleImageClick}
									onLike={handleLike}
									onDislike={handleDislike}
									favoriteSamples={favoriteSamples}
								/>
							);
						})}
					</div>
					<div className="samples__container-inside">
						{separetedSamples.column2.map((item) => {
							return (
								<Sample
									key={item.id}
									item={item}
									onImageClick={handleImageClick}
									onLike={handleLike}
									onDislike={handleDislike}
									favoriteSamples={favoriteSamples}
								/>
							);
						})}
					</div>
					<div className="samples__container-inside">
						{separetedSamples.column3.map((item) => {
							return (
								<Sample
									key={item.id}
									item={item}
									onImageClick={handleImageClick}
									onLike={handleLike}
									onDislike={handleDislike}
									favoriteSamples={favoriteSamples}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</main>
	);
}

export default Samples;
