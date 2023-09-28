import './Samples.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authApi from '../../utils/AuthApi';
import { Checkbox } from './Checkbox/Checkbox';
import { Sample } from './Sample/Sample';
// ВРЕМЕННЫЙ МАССИВ ШАБЛОНОВ
import { temporarySamles } from '../../constants/constants';

export const Samples = ({
	setDiploma,
	favoriteSamples,
	setFavoriteSamples,
	samples,
	isLoggedIn,
}) => {
	const [separetedSamples, setSeparatedSamples] = useState({
		column1: [],
		column2: [],
		column3: [],
	});

	// ВРЕМЕННЫЙ ОБЬЕКТ, ДАЛЬШЕ ШАБЛОНЫ К ПОКАЗУ БУДУТ БРАТЬСЯ ИЗ ПРОПСОВ
	const [samplesTemp, setSamplesTemp] = useState(
		samples || temporarySamles.results
	);

	// ОБЬЕКТ НАСТРОЕК , СОЖЕРЖИТ ВСЕ СОСТОЯНИЕ ЧЕКБОКСОВ-КНОПОК
	const [checkboxValues, setCheckboxValues] = useState({
		awards: false,
		appreciations: false,
		certificates: false,
		is_horizontal: false,
		is_vertical: false,
	});

	// РАЗДЕЛЯЕМ МАССИВ ШАБЛОНОВ НА ТРИ КОЛЛОНКИ
	useEffect(() => {
		const column1 = [];
		const column2 = [];
		const column3 = [];

		// console.log('длина', samplesTemp.length, 'Массив', samplesTemp);

		for (let i = 0; i < samplesTemp.length; i++) {
			const index = i % 3;
			if (index === 0) {
				column1.push(samplesTemp[i]);
			} else if (index === 1) {
				column2.push(samplesTemp[i]);
			} else {
				column3.push(samplesTemp[i]);
			}
		}
		setSeparatedSamples({
			column1,
			column2,
			column3,
		});
		// console.log('Успешно разделен', separetedSamples);
	}, [samplesTemp]);

	const handleCheckboxClick = (name, isChecked) => {
		setCheckboxValues({
			...checkboxValues,
			[name]: isChecked,
		});
	};

	const handleDislike = (e, item) => {
		e.stopPropagation();
		return authApi.removeLike(item.id).then((res) => {
			console.log(res);
			const newSamples = favoriteSamples.filter((card) => card.id !== item.id);
			setFavoriteSamples(newSamples);
			console.log('dislike ok');
		});
	};

	const handleLike = (e, item) => {
		e.stopPropagation();
		return authApi
			.addLike(item)
			.then((res) => {
				const newSamples = samples.filter((card) => card.id === res.id);
				setFavoriteSamples([...favoriteSamples, item]);
				console.log('like ok');
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
			console.log('После запроса фильтрации получили', samplesFromBack)
			if (samplesFromBack.results) {
				setSamplesTemp(samplesFromBack.results);
			}
		} catch (err) {
			console.log(err);
		}
	}
	// ПРИ ИЗМЕНЕНИИ ОБЬЕКТА НАСТРОЕК checkboxValues ОТПРАВЛЯЕМ ЗАБРОС НА БЭК
	// И СЕТАПИМ ШАБЛОНЫ К ПОКАЗУ
	useEffect(() => {
		getFilteredSamples();
	}, [checkboxValues]);

	// ПОЛУЧАЕМ ОДИН РАЗ МАССИВ ШАБЛОНОВ
	// const getAllSamples = () => {
	// 	authApi
	// 		.getAllSamples()
	// 		.then((res) => {
	// 			if (res.results) {
	// 				console.log(`шаблонов получили --> ${res.results.length}`);
	// 				console.log('массив', res.results);
	// 				setSamplesTemp(res.results);
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	// useEffect(() => {
	// 	getAllSamples();
	// }, []);

	return (
		<main className="samples">
			<h1 className="samples__title">Шаблоны</h1>
			<div className="samples__main">
				<form className="samples__menu">
					<span className="samples__menu-title">Шаблоны</span>
					<div className="samples__menu-continer">
						<Checkbox
							name="appreciations"
							state={checkboxValues}
							onClick={handleCheckboxClick}
							text="Благодарности"
						/>
						<Checkbox
							name="awards"
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
									isLoggedIn={isLoggedIn}
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
									isLoggedIn={isLoggedIn}
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
									isLoggedIn={isLoggedIn}
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
};
