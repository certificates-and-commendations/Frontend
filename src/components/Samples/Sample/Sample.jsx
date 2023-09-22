import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

function Sample({
	item,
	onImageClick,
	onLike,
	onDislike,
	favoriteSamples,
	isLoggedIn,
}) {
	const [isCliked, setIsCliked] = useState(false);
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

	// СЕТАПИМ isCliked ЕСЛИ НАШ ШАБЛОН ЕСТЬ В ИЗБРАНЫХ У ПОЛЬЗОВАТЕЛЯ СТАВИЛ ЛАЙК ИНАЧЕ НЕТ
	useEffect(() => {
		const result = favoriteSamples.some((elem) => item.id === elem.id);
		setIsCliked(result);
	}, [favoriteSamples]);

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
					src={item.thumbnail}
				/>
			</Link>
		</div>
	);
}

export default Sample;
