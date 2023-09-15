import React, { useState } from 'react';
import './Checkbox.css';

function Checkbox({ text, onClick, name, state }) {
	const [isChecked, setIsChecked] = useState(state[name]);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
		onClick(name, !isChecked);
	};

	return (
		<label
			htmlFor={`checkbox_${name}`}
			className={`checkbox${isChecked ? '_checked' : ''}`}
		>
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
