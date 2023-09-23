import clsx from 'clsx';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

export const Checkbox = ({ text, onClick, name, state }) => {
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
};

Checkbox.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	state: PropTypes.shape({
		diplomas: PropTypes.bool.isRequired,
		thanks: PropTypes.bool.isRequired,
		certificates: PropTypes.bool.isRequired,
		is_vertical: PropTypes.bool.isRequired,
		is_horizontal: PropTypes.bool.isRequired,
	}).isRequired,
};
