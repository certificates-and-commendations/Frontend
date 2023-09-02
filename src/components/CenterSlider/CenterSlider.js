import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export default function CenterSlider({ array, setDiploma, delay }) {
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
				<div key={item}>
					<Link
						to="/editor"
						className="profile__template-link"
						onClick={() => onClick(item)}
					>
						<img
							src={item.image}
							alt={item.name}
							className={
								item.type === 'vertical'
									? 'profile__template profile__template_vertical'
									: 'profile__template profile__template_horizontal'
							}
						/>
					</Link>
				</div>
			))}
		</Slider>
	);
}
