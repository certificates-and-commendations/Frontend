import './ColorFilter.css';
import { useState, useEffect } from 'react';

function ColorFilter({ colors }) {
	const [isChecked, setIsChecked] = useState({});

	useEffect(() => {
		const initialIsChecked = {};
		colors.forEach((color) => {
			initialIsChecked[color] = false;
		});
		setIsChecked(initialIsChecked);
	}, []);

	const handleCheckboxChange = (color) => {
		setIsChecked((prevState) => ({
			...prevState,
			[color]: !prevState[color],
		}));
	};

	return (
		<div className="filter">
			<span className="filter__title">Цвета</span>
			<div className="filter__container">
				<button className="filter__button-add" type="button" />
				{colors.map((color) => {
					return (
						<label
							key={color}
							htmlFor={`filter__checkbox_${color}`}
							style={{ backgroundColor: color }}
							className={`filter__checkbox ${
								isChecked[color] ? 'filter__checkbox_checked' : ''
							}`}
						>
							<input
								id={`filter__checkbox_${color}`}
								type="checkbox"
								checked={isChecked[color]}
								onChange={() => handleCheckboxChange(color)}
								className="filter__hidden-checkbox"
							/>
						</label>
					);
				})}
			</div>
		</div>
	);
}

export default ColorFilter;
