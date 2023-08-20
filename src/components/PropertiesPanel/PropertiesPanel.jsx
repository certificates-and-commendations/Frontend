import React from 'react';
import FioTable from '../FioTable/FioTable';

function PropertiesPanel({
	font,
	fontSize,
	onFontChange,
	onFontSizeChange,
	onSignatureUpload,
	onSavePDF,
	onCertificateUpload,
	showTable,
	tableData,
	setTableData,
	setShowTable,
	textBlocks,
	setTextBlocks,
	certificateRef,
	onStampUpload,
	isVisible
}) {
	const handleCertificateUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.type === 'image/jpeg' || file.type === 'image/png') {
				const reader = new FileReader();
				reader.onload = (event) => {
					onCertificateUpload(event.target.result);
				};
				reader.readAsDataURL(file);
			} else {
				alert('Пожалуйста, загрузите изображение в формате JPEG или PNG.');
			}
		}
	};
	console.log(isVisible)

	return (
		<div className={`properties ${isVisible ? 'visible' : 'hidden'}`}>
			<label className="properties__label properties__label_fonts" htmlFor="fontSelect">
				<span className="properties__span-text">Font:</span>
				<select
					id="fontSelect"
					value={font}
					onChange={onFontChange}
					className="properties__select"
				>
					<option value="Arial">Arial</option>
					<option value="Times New Roman">Times New Roman</option>
				</select>
			</label>
			<label className="properties__label properties__label_font-size" htmlFor="fontSizeSelect">
				<span className="properties__span-text">Font Size:</span>
				<input
					id="fontSizeSelect"
					type="number"
					value={fontSize}
					onChange={onFontSizeChange}
					className="properties__input properties__input_font-size"
				/>
			</label>
			<label className="properties__label properties__label_signature" htmlFor="signatureSelect">
				<span className="properties__span-text">Загрузка подписи (PNG):</span>
				<input
					id="signatureSelect"
					type="file"
					accept="image/png"
					onChange={onSignatureUpload}
					className="properties__input_signature"
				/>
			</label>
			<label className="properties__label properties__label_upload-stamp" htmlFor="uploadStampSelect">
				<span className="properties__span-text properties__span-text_upload-stamp">
					Загрузка печати (PNG):
				</span>
				<input
					id="uploadStampSelect"
					type="file"
					accept="image/png"
					onChange={onStampUpload}
					className="properties__input_stamp"
				/>
			</label>
			<label className="properties__label properties__label_upload-certificate" htmlFor="uploadCertificateSelect">
				<span className="properties__span-text properties__span-text_upload-certificate">
					Загрузка грамоты (JPEG/PNG: 600x850):
				</span>
				<input
					id="uploadCertificateSelect"
					type="file"
					accept="image/jpeg,image/png"
					onChange={handleCertificateUpload}
					className="properties__input_certificate"
				/>
			</label>
			{showTable && (
				<FioTable
					tableData={tableData}
					setTableData={setTableData}
					setShowTable={setShowTable}
					textBlocks={textBlocks}
					setTextBlocks={setTextBlocks}
					certificateRef={certificateRef}
				/>
			)}
			<button onClick={onSavePDF} className="save-button">
				Сохранить в PDF
			</button>
		</div>
	);
}

export default PropertiesPanel;
