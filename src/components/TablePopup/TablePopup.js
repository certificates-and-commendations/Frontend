import { useState } from 'react';
import './TablePopup.css';
import x from '../../images/x.svg';

export default function TablePopup({ popupName, isOpened, array, onClose }) {
	const newArray = {
		1: {
			name: 'Даниил',
		},
		2: {
			name: 'Даниил2',
		},
		3: {
			name: 'Дании4132л',
		},
		4: {
			name: 'Да1234ниил',
		},
		5: {
			name: 'Данtиил',
		},
		6: {
			name: 'Данawиил',
		},
	};
	const [renderArray, setRenderArray] = useState(newArray);

	function onClick() {
		const newArr = Object.values(renderArray).filter(
			(item) => item.name !== ''
		);
		const obj = newArr.reduce((object, value, index) => {
			return { ...object, [index + 1]: value };
		}, {});
		setRenderArray(obj);
	}

	function onChange(key, evt) {
		const { value } = evt.target;
		setRenderArray({
			...renderArray,
			[key + 1]: {
				name: value,
			},
		});
	}

	function addContent(key) {
		setRenderArray({
			...renderArray,
			[key + 1]: {
				name: '',
			},
		});
	}

	return (
		<section
			className={
				isOpened
					? `popup popup_${popupName} popup_opened`
					: `popup popup_${popupName}`
			}
		>
			<div className="popup__container popup__container-table">
				<button className="popup__table-close" onClick={onClose}>
					<img src={x} alt="Закрыть" />
				</button>
				<div className="popup__table">
					<div className="popup__table-header">
						<div className="popup__table-title popup__table-column">№</div>
						<div className="popup__table-title popup__table-column">%фио</div>
					</div>
					<form className="popup__table-form">
						{Object.values(renderArray).map((item, key) => (
							<div className="popup__table-body" key={key}>
								<div className="popup__table-content popup__table-column">
									{key + 1}
								</div>
								<div className="popup__table-content popup__table-column">
									<input
										type="text"
										className="popup__table-input"
										value={item.name}
										onChange={(evt) => {
											onChange(key, evt);
										}}
									/>
								</div>
							</div>
						))}
						{}
						<div className="popup__table-body">
							<div className="popup__table-content popup__table-column popup__table-column_button popup__table-column_last">
								<button
									type="button"
									className="popup__table-button"
									onClick={() => {
										addContent(Object.values(renderArray).length);
									}}
								>
									+
								</button>
							</div>
							<div className="popup__table-content popup__table-column popup__table-column_last">
								{' '}
							</div>
						</div>
					</form>
				</div>
				<button type="submit" className="popup__table-submit" onClick={onClick}>
					Создать грамоты
				</button>
			</div>
		</section>
	);
}
