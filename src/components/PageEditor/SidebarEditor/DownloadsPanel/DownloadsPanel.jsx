import React, { useState } from 'react';
import squareCheck from '../../../../images/imageEditor/elements-panel__square-check.svg';
import square from '../../../../images/imageEditor/elements-panel__square.svg';

function DownloadsPanel({
	setUploadedCertificate,
	setPanelSidebarActive,
	setImageURLsDownloads,
	imageURLsDownloads,
	setSquareStatesDownloadPanel,
	squareStatesDownloadPanel,
}) {
	const [activeCertificateIndex, setActiveCertificateIndex] = useState(null);

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
				setSquareStatesDownloadPanel((prevStates) => [...prevStates, false]);
			} else {
				console.log('Загруженная грамота должна быть размером 600x850 px.');
			}
		});
	};

	const handleClickSquareDownloads = (index) => {
		setSquareStatesDownloadPanel((prevStates) => {
			const newStates = [...prevStates];

			if (newStates[index]) {
				newStates[index] = false;
			} else {
				newStates.fill(false);
				newStates[index] = true;
			}

			return newStates;
		});

		if (index === 0 && squareStatesDownloadPanel[index]) {
			setActiveCertificateIndex(index);
			setUploadedCertificate(null);
			setPanelSidebarActive(false);
		} else if (index >= 1 && squareStatesDownloadPanel[index]) {
			setActiveCertificateIndex(index);
			setUploadedCertificate(null);
			setPanelSidebarActive(false);
		} else {
			setActiveCertificateIndex(null);
			setUploadedCertificate([imageURLsDownloads[index]]);
			setPanelSidebarActive(true);
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
				{imageURLsDownloads.map((item, index) => (
					<div
						className="elements-panel__wrapper elements-panel__wrapper_size"
						key={item.id}
					>
						<img
							src={item.background || item}
							alt={`Загруженное изображение ${item.title || item.name}`}
							className="elements-panel__loading-img"
						/>
						<img
							key={index}
							src={squareStatesDownloadPanel[index] ? squareCheck : square}
							alt={
								squareStatesDownloadPanel[index]
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
