import React, { useState } from 'react';
import squareCheck from '../../../../images/imageEditor/elements-panel__square-check.svg';
import square from '../../../../images/imageEditor/elements-panel__square.svg';

function DownloadsPanel({ setUploadedCertificate, setTextPanelActive }) {
	const [imageURLsDownloads, setImageURLsDownloads] = useState([]);
	const [squareStates, setSquareStates] = useState([]);

	function isImageValid(file) {
		const allowedFormats = ['image/jpeg', 'image/png'];
		return allowedFormats.includes(file.type);
	}

	function isImageSizeValid(file, callback) {
		const image = new Image();
		image.src = URL.createObjectURL(file);
		image.onload = () => {
			if (image.width === 600 && image.height === 850) {
				callback(true);
			} else {
				callback(false);
			}
		};
	}

	const handleFileInputChangeDownloads = (e) => {
		const files = Array.from(e.target.files);

		const validFiles = files.filter(isImageValid);

		if (validFiles.length === 0) {
			console.log('Загрузите изображение в формате JPEG или PNG.');
			return;
		}

		const sizePromises = validFiles.map((file) => {
			return new Promise((resolve) => {
				isImageSizeValid(file, resolve);
			});
		});

		Promise.all(sizePromises).then((sizes) => {
			if (sizes.every((valid) => valid)) {
				setImageURLsDownloads((prevImageURLs) => [
					...prevImageURLs,
					...validFiles.map((file) => URL.createObjectURL(file)),
				]);
				setSquareStates((prevStates) => [...prevStates, false]);
			} else {
				console.log('Загруженная грамота должна быть размером 600x850 px.');
			}
		});
	};

	const handleClickSquareDownloads = (index) => {
		setSquareStates((prevStates) => {
			const newStates = [...prevStates];
			newStates[index] = !newStates[index];
			return newStates;
		});
		if (squareStates[index]) {
			setUploadedCertificate(null);
			setTextPanelActive(false);
		} else {
			setUploadedCertificate([imageURLsDownloads[index]]);
			setTextPanelActive(true);
		}
	};

	return (
		<div className="elements-panel">
			<div className="elements-panel__block-download">
				<p className="elements-panel__paragraph">
					Вы можете загрузить собственный шаблон в формате JPEG/PNG: 600x850 px
				</p>
				<label
					htmlFor="fileElementsInput"
					className="elements-panel__btn-download"
				>
					Загрузить свой шаблон
					<input
						type="file"
						id="fileElementsInput"
						className="elements-panel__input"
						multiple
						onChange={handleFileInputChangeDownloads}
					/>
				</label>
			</div>
			<div className="elements-panel__loading-file elements-panel__loading-file_gap">
				{imageURLsDownloads.map((url, index) => (
					<div className="elements-panel__wrapper elements-panel__wrapper_size">
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
							className="elements-panel__square elements-panel__square_margin"
							onClick={() => handleClickSquareDownloads(index)}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default DownloadsPanel;
