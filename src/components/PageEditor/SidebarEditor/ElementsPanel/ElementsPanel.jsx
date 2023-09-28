import React, { useState } from 'react';
import square from '../../../../images/imageEditor/elements-panel__square.svg';
import squareCheck from '../../../../images/imageEditor/elements-panel__square-check.svg';

function ElementsPanel() {
	const [imageURLsElements, setImageURLsElements] = useState([]);
	const [squareStates, setSquareStates] = useState([]);

	function isImageValid(file) {
		const allowedFormats = ['image/jpeg', 'image/png'];
		return allowedFormats.includes(file.type);
	}

	const handleFileInputChangeElements = (e) => {
		const files = Array.from(e.target.files);

		const validFiles = files.filter(isImageValid);

		if (validFiles.length === 0) {
			console.log('Загрузите изображение в формате JPEG или PNG.');
			return;
		}

		setImageURLsElements((prevImageURLs) => [
			...prevImageURLs,
			...validFiles.map((file) => URL.createObjectURL(file)),
		]);
		setSquareStates((prevStates) => [...prevStates, false]);
	};

	const handleClickSquareElements = (index) => {
		setSquareStates((prevStates) => {
			const newStates = [...prevStates];
			newStates[index] = !newStates[index];
			return newStates;
		});
	};

	return (
		<div className="elements-panel">
			<div className="elements-panel__block-download">
				<p className="elements-panel__paragraph">
					Вы можете загрузить подпись, печать в формате JPEG/PNG
					&nbsp;И&nbsp;таблицу&nbsp;Exel&nbsp;(с ФИО если нужно оформить
					несколько грамот)
				</p>
				<label
					htmlFor="fileElementsInput"
					className="elements-panel__btn-download"
				>
					Загрузить файл
					<input
						type="file"
						id="fileElementsInput"
						className="elements-panel__input"
						multiple
						onChange={handleFileInputChangeElements}
					/>
				</label>
			</div>
			<div className="elements-panel__loading-file">
				{imageURLsElements.map((url, index) => (
					<div className="elements-panel__wrapper">
						<img
							key={index}
							src={url}
							alt={`Загруженное изображение ${index}`}
							className="elements-panel__loading-img"
						/>
						<img
							src={squareStates[index] ? squareCheck : square}
							alt={
								squareStates[index]
									? ' Квадрат с галочкой.'
									: ' Пустой квадрат.'
							}
							className="elements-panel__square"
							onClick={() => handleClickSquareElements(index)}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default ElementsPanel;
