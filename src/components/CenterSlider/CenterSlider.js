/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link, useNavigate } from 'react-router-dom';
import trash from '../../images/trash.svg';

export default function CenterSlider({
	array,
	setDiploma,
	isFavoriteSamples,
	setFavoriteSamples,
}) {
	const navigate = useNavigate();

	const settings = {
		dots: true,
		speed: 3500,
		arrows: false,
		focusOnSelect: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		variableWidth: true,
		adaptiveHeight: true,
		infinite: false,
	};

	function onTemplateClick(item) {
		setDiploma(item);
		navigate('/editor');
	}

	function onTrashClick(item) {
		const newSamples = array.filter((card) => card.id !== item.id);
		setFavoriteSamples(newSamples);
	}

	return (
		// eslint-disable-next-line eqeqeq
		!(array.length === 0) ? (
			<Slider {...settings}>
				{array.map((item) => (
					<div key={item.id} className="profile__template-main">
						<img
							src={trash}
							alt="Удалить"
							className="profile__template-trash"
							onClick={() => onTrashClick(item)}
						/>
						<div
							onClick={() => onTemplateClick()}
							// src={isFavoriteSamples ? item.thumbnail : item.image}
							alt={isFavoriteSamples ? item.title : item.name}
							style={{
								backgroundImage: `url(${
									isFavoriteSamples ? item.thumbnail : item.image
								})`,
							}}
							className={
								isFavoriteSamples
									? item.is_horizontal
										? 'profile__template profile__template_horizontal'
										: 'profile__template profile__template_vertical'
									: item.type === 'horizontal'
									? 'profile__template profile__template_horizontal'
									: 'profile__template profile__template_vertical'
							}
						/>
					</div>
				))}
			</Slider>
		) : isFavoriteSamples ? (
			<p className="profile__template-text">У вас нет избранных шаблонов</p>
		) : (
			<p className="profile__template-text">У вас нет созданных документов</p>
		)
	);
}
