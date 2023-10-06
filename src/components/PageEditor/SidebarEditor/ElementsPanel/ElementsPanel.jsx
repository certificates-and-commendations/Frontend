import React, { useState } from 'react';
import square from '../../../../images/imageEditor/elements-panel__square.svg';
import squareCheck from '../../../../images/imageEditor/elements-panel__square-check.svg';

function ElementsPanel({ setElement, element, positions, setPositions }) {
	const [imageURLsElements, setImageURLsElements] = useState([]);
	const [squareStates, setSquareStates] = useState([]);
	const [btnClick, setBtnClick] = useState(true);

	const onClickBtnActive = () => {
		setBtnClick(false);
	};

	const onClickBtnNotActive = () => {
		setBtnClick(true);
	};

	function isImageValid(file) {
		const allowedFormats = ['image/jpeg', 'image/png'];
		return allowedFormats.includes(file.type);
	}

	function generateUniqueId() {
		return Math.random().toString(36).substr(2, 9);
	}

	const handleFileInputChangeElements = (e) => {
		const files = Array.from(e.target.files);

		const validFiles = files.filter(isImageValid);

		if (validFiles.length === 0) {
			console.log('Загрузите изображение в формате JPEG или PNG.');
			return;
		}

		const newElements = validFiles.map((file) => ({
			id: generateUniqueId(),
			url: URL.createObjectURL(file),
		}));

		setImageURLsElements((prevImageURLs) => [...prevImageURLs, ...newElements]);
		setSquareStates((prevStates) => [
			...prevStates,
			...newElements.map(() => false),
		]);
	};

	const handleClickSquareElements = (id) => {
		const elementIndex = imageURLsElements.findIndex((elem) => elem.id === id);
		if (elementIndex !== -1) {
			const newSquareStates = [...squareStates];
			newSquareStates[elementIndex] = !newSquareStates[elementIndex];
			setSquareStates(newSquareStates);

			if (newSquareStates[elementIndex]) {
				const selectedElement = imageURLsElements.find(
					(elem) => elem.id === id
				);
				setElement((prevElement) => [...prevElement, selectedElement]);
			} else {
				setElement((prevElement) => {
					const updatedElement = [...prevElement];
					const removedIndex = updatedElement.findIndex(
						(elem) => elem.id === id
					);
					if (removedIndex !== -1) {
						updatedElement.splice(removedIndex, 1);
						const newPositions = [...positions];
						newPositions.splice(removedIndex, 1); // Удалить соответствующую позицию
						setPositions(newPositions); // Обновить состояние позиций
					}
					return updatedElement;
				});
			}
		}
	};

	return (
		<div className="elements-panel">
			<div className="text-panel__block-button">
				<button
					className={`text-panel__button ${
						btnClick ? 'text-panel__button_active' : ''
					}`}
					onClick={onClickBtnNotActive}
				>
					Элементы
				</button>
				<button
					className={`text-panel__button ${
						!btnClick ? 'text-panel__button_active' : ''
					}`}
					onClick={onClickBtnActive}
				>
					Таблица
				</button>
			</div>

			{btnClick ? (
				<>
					<div className="elements-panel__block-download">
						<p className="elements-panel__paragraph">
							Вы можете загрузить подпись, печать в формате JPEG/PNG.
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
						{imageURLsElements.map((elem, index) => (
							<div className="elements-panel__wrapper" key={elem.id}>
								<img
									src={elem.url}
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
									onClick={() => handleClickSquareElements(elem.id)}
								/>
							</div>
						))}
					</div>
				</>
			) : (
				<>
					<div className="elements-panel__block-download">
						<p className="elements-panel__paragraph">
							Вы можете загрузить таблицу Exel (с ФИО если нужно оформить
							несколько грамот)
						</p>
						<label
							htmlFor="fileElementsInput"
							className="elements-panel__btn-download"
						>
							Загрузить таблицу
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
						{imageURLsElements.map((elem, index) => (
							<div className="elements-panel__wrapper" key={elem.id}>
								<img
									src={elem.url}
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
				</>
			)}
		</div>
	);
}

export default ElementsPanel;
