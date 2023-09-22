import clsx from 'clsx';
import React, { useState } from 'react';
import './Checkbox.css';

function Checkbox({ text, onClick, name, state }) {
	const [isChecked, setIsChecked] = useState(state[name]);

	const checkboxClass = clsx('checkbox', {
		checkbox_checked: isChecked,
	});

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
		onClick(name, !isChecked);
	};

	return (
		<label htmlFor={`checkbox_${name}`} className={checkboxClass}>
			<input
				id={`checkbox_${name}`}
				type="checkbox"
				checked={isChecked}
				onChange={handleCheckboxChange}
				className="hidden-checkbox"
			/>
			{text}
		</label>
	);
}

export default Checkbox;
