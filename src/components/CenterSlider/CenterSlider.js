import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export default function CenterSlider({
	array,
	setDiploma,
	delay,
	isFavoriteSamples,
}) {
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
		autoplay: true,
		autoplaySpeed: delay,
		pauseOnHover: true,
	};

	function onClick(item) {
		setDiploma(item);
	}

	return (
		<Slider {...settings}>
			{array.map((item) => (
				<div key={item.id}>
					<Link
						to="/editor"
						className="profile__template-link"
						onClick={() => onClick(item)}
					>
						<div
							// src={isFavoriteSamples ? item.thumbnail : item.image}
							alt={isFavoriteSamples ? item.title : item.name}
							style={{ 
								backgroundImage: `url(${isFavoriteSamples ? item.thumbnail : item.image})` 
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
					</Link>
				</div>
			))}
		</Slider>
	);
}
