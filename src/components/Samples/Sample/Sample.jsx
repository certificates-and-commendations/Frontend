import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Sample({ item, onImageClick, onLike, onDislike, favoriteSamples }) {
	const [isCliked, setIsCliked] = useState(false);

	function handleLike(e) {
		onLike(e, item);
		setIsCliked(!isCliked);
	}

	function handleDislike(e) {
		onDislike(e, item);
		setIsCliked(!isCliked);
	}

	// СЕТАПИМ isCliked ЕСЛИ НАШ ШАБЛОН ЕСТЬ В ИЗБРАНЫХ У ПОЛЬЗОВАТЕЛЯ СТАВИЛ ЛАЙК ИНАЧЕ НЕТ
	// useEffect(() => {
	//     const result = favoriteSamples.some((elem) => (item.id + '') === elem.Id)
	//     setIsCliked(result)
	// }, [favoriteSamples])

	return (
		<div className='samples__div' key={item.id}>
			<button
				type="button"
				onClick={isCliked ? (e) => handleDislike(e) : (e) => handleLike(e)}
				className={`samples__button-like${isCliked ? '_active' : ''}`}
			/>
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
