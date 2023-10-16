import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Sample = ({
	item,
	onImageClick,
	onLike,
	onDislike,
	favoriteSamples,
	isLoggedIn,
}) => {
	const [isCliked, setIsCliked] = useState(item.is_favourite);
	const buttonClass = clsx('samples__button-like', {
		'samples__button-like_active': isCliked,
	});

	function handleLike(e) {
		return onLike(e, item)
			.then(() => {
				setIsCliked(!isCliked);
			})
			.catch((err) => console.log(err));
	}

	function handleDislike(e) {
		return onDislike(e, item)
			.then(() => {
				setIsCliked(!isCliked);
			})
			.catch((err) => console.log(err));
	}

	// СЕТАПИМ isCliked ЕСЛИ НАШ ШАБЛОН ЕСТЬ В ИЗБРАНЫХ У ПОЛЬЗОВАТЕЛЯ СТАВИМ ЛАЙК ИНАЧЕ НЕТ
	// useEffect(() => {
	// 	const result = favoriteSamples.some((elem) => item.id === elem.id);
	// 	setIsCliked(result);
	// }, [favoriteSamples]);

const hardCode = item.thumbnail.replace('http', 'https')

	return (
		<div className="samples__div" key={item.id}>
			{isLoggedIn && (
				<button
					type="button"
					onClick={isCliked ? (e) => handleDislike(e) : (e) => handleLike(e)}
					className={buttonClass}
				/>
			)}
			<Link key={item.id} className="samples__link" to="/editor">
				<img
					onClick={(e) => onImageClick(e, item)}
					alt={item.title}
					className="samples__image"
					src={hardCode}
				/>
			</Link>
		</div>
	);
};

Sample.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		thumbnail: PropTypes.string.isRequired,
		category: PropTypes.number,
		color: PropTypes.number,
		is_horizontal: PropTypes.bool.isRequired,
	}).isRequired,
	onImageClick: PropTypes.func.isRequired,
	onLike: PropTypes.func.isRequired,
	onDislike: PropTypes.func.isRequired,
	favoriteSamples: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			thumbnail: PropTypes.string.isRequired,
			category: PropTypes.number,
			color: PropTypes.number,
			is_horizontal: PropTypes.bool.isRequired,
		})
	).isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
};
