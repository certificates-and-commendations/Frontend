import React, { useState } from 'react';
import squareCheck from '../../../../images/imageEditor/elements-panel__square-check.svg';
import square from '../../../../images/imageEditor/elements-panel__square.svg';
import authApi from '../../../../utils/AuthApi';

function DownloadsPanel({ setUploadedCertificate, setPanelSidebarActive }) {
	const [imageURLsDownloads, setImageURLsDownloads] = useState([]);
	const [squareStates, setSquareStates] = useState([]);
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
				// Конвертируем допустимые изображения в формате base64 перед отправкой
				const base64Images = validFiles.map((file) => {
					return new Promise((resolve) => {
						const reader = new FileReader();
						reader.readAsDataURL(file);
						reader.onload = () => {
							resolve(
								`data:${file.type};base64,${reader.result.split(',')[1]}`
							);
						};
					});
				});

				Promise.all(base64Images).then((base64DataArray) => {
					const newCertificates = base64DataArray.map((base64) => {
						return authApi
							.handleLoadingDocument({
								file: files[base64DataArray.indexOf(base64)],
								base64,
							})
							.then((res) => res);
					});

					Promise.all(newCertificates)
						.then((certificateURLs) => {
							setImageURLsDownloads((prevImageURLsDownloads) => [
								...prevImageURLsDownloads,
								...certificateURLs,
							]);
							setSquareStates((prevStates) => [
								...prevStates,
								...newCertificates.map(() => false),
							]);
						})
						.catch((err) => console.log(err));
				});
			} else {
				console.log('Загруженная грамота должна быть размером 600x850 px.');
			}
		});
	};

	const handleClickSquareDownloads = (index, id) => {
		setSquareStates((prevStates) => {
			const newStates = [...prevStates];

			if (newStates[index]) {
				newStates[index] = false;
			} else {
				newStates.fill(false);
				newStates[index] = true;
			}

			return newStates;
		});

		if (activeCertificateIndex === index) {
			setActiveCertificateIndex(null);
			setUploadedCertificate(null);
			setPanelSidebarActive(false);
		} else {
			setActiveCertificateIndex(index);
			setUploadedCertificate([imageURLsDownloads[index].background]);
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
					<div className="elements-panel__wrapper elements-panel__wrapper_size">
						<img
							key={item.id}
							src={item.background}
							alt={`Загруженное изображение ${item.title}`}
							className="elements-panel__loading-img"
						/>
						<img
							key={index}
							src={squareStates[index] ? squareCheck : square}
							alt={
								squareStates[index]
									? ' Квадрат с галочкой.'
									: ' Пустой квадрат.'
							}
							className="elements-panel__square elements-panel__square_margin"
							onClick={() => handleClickSquareDownloads(index, item.id)}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default DownloadsPanel;
