import React, { Component } from 'react';
import Slider from 'react-slick';

export default function CenterSlider({ massiv }) {
	const settings = {
		dots: true,
		className: 'center',
		centerMode: true,
		speed: 500,
		variableWidth: true,
		adaptiveHeight: true,
		infinite: true,
		arrows: false,
	};

	return (
		<Slider {...settings}>
			{massiv.map((item) => (
				<div key={item}>
					<img
						src={item.image}
						alt={item.name}
						className={
							item.type === 'vertical'
								? 'profile__template_vertical'
								: 'profile__template_horizontal'
						}
					/>
				</div>
			))}
		</Slider>
	);
}
