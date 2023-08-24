import React from 'react';
import Draggable from 'react-draggable';
import StylePropertiesPanel from '../StylePropertiesPanel/StylePropertiesPanel';

function TextBlock({
	index,
	textBlock,
	editingTextIndex,
	onTextChange,
	onInputKeyDown,
	setEditingTextIndex,
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
	isVisible,
	setActiveTextIndex,
	activeTextIndex,
	setShowProperties,
	setTextDecorationStyle,
    setTextPosition,
	textDecorationStyle
}) {

	const handleDragStop = (e, data) => {
		setTextPosition({x: data.x, y: data.y,} )
		// data.x и data.y содержат конечные координаты блока после перемещения
		// console.log('Конечные координаты x:', data.x);
		// console.log('Конечные координаты y:', data.y);
		// Здесь вы можете выполнить дополнительные действия с полученными координатами
	};

	return (
		// <Draggable bounds="parent" defaultPosition={{ x: 0, y: 0 }} onStop={handleDragStop}>
		<Draggable bounds="parent" onStop={handleDragStop}>
			<div
				className="certificate__text-field"
				style={{
					// top: textBlock.y,
					// left: textBlock.x,
					position: 'absolute',
					top: '50%',
					left: '50%'
				}}
			>
				{editingTextIndex === index ? (
					<input
						type="text"
						value={textBlock.text}
						onChange={(e) => onTextChange(e, index)}
						onKeyDown={(e) => onInputKeyDown(e, index)}
						onClick={(e) => e.stopPropagation()}
						style={{
							fontFamily: textBlock.fontFamily,
							fontSize: textBlock.fontSize,
							fontStyle: textBlock.isItalic ? 'italic' : 'normal',
							textDecoration:
								textDecorationStyle === 'underline'
									? 'underline'
									: textDecorationStyle === 'strikethrough'
									? 'line-through'
									: 'none',
							fontWeight: textBlock.isBold ? 'bold' : 'normal',
						}}
						className="certificate__input"
					/>
				) : (
					<div
						onDoubleClick={() => {
							setEditingTextIndex(index);
							setShowProperties(true);
							setActiveTextIndex(index);
						}}
						style={{
							fontFamily: textBlock.fontFamily,
							fontSize: textBlock.fontSize,
							fontStyle: textBlock.isItalic ? 'italic' : 'normal',
							textDecoration:
								textDecorationStyle === 'underline'
									? 'underline'
									: textDecorationStyle === 'strikethrough'
									? 'line-through'
									: 'none',
							fontWeight: textBlock.isBold ? 'bold' : 'normal',
						}}
					>
						{textBlock.text}
					</div>
				)}
				<StylePropertiesPanel
					index={index}
					font={font}
					fontSize={fontSize}
					onFontChange={onFontChange}
					onFontSizeChange={onFontSizeChange}
					onSignatureUpload={onSignatureUpload}
					onSavePDF={onSavePDF}
					onCertificateUpload={onCertificateUpload}
					showTable={showTable}
					setShowTable={setShowTable}
					tableData={tableData} // Передаем данные таблицы
					setTableData={setTableData} // Передаем функцию для обновления данных таблицы
					textBlocks={textBlocks}
					setTextBlocks={setTextBlocks}
					certificateRef={certificateRef}
					onStampUpload={onStampUpload}
					isVisible={isVisible}
					activeTextIndex={activeTextIndex}
					setActiveTextIndex={setActiveTextIndex}
					setTextDecorationStyle={setTextDecorationStyle}
				/>
			</div>
		</Draggable>
	);
}

export default TextBlock;
