import './InfoToolTip.css';
import success from '../../images/success.svg';
import bad from '../../images/bad.svg';

function InfoToolTip({ status, text, opened, onClose }) {
	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			className={opened ? 'info-tooltip info-tooltip_opened' : 'info-tooltip'}
			onClick={onClose}
		>
			<div className="info-tooltip__container">
				<img
					className="info-tooltip__icon"
					alt="иконка"
					src={status ? success : bad}
				/>
				<p className="info-tooltip__text">{text}</p>
			</div>
		</div>
	);
}

export default InfoToolTip;
