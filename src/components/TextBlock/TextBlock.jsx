import React, { useState, useRef } from 'react';
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
	setFont,
	fontSize,
	setFontSize,
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
	textDecorationStyle,
	textBlockStyles,
	setTextBlockStyles,
   	textAlignStyle,
   	setTextAlignStyle
}) {
	const [widthInput, setWidthInput] = useState(209)
	const [heightInput, setHeightInput] = useState(17)
	const textareaRef = useRef(null);
	const [color, setColor] = useState('#000000');
	const scrollbarWidth = 19;

	const handleResizeMouseDown = (e) => {
		e.stopPropagation(); // Предотвращаем всплытие события
	};

	const handleDragStop = (e, data) => {
		setTextPosition({ x: data.x, y: data.y });
		// data.x и data.y содержат конечные координаты блока после перемещения
		// console.log('Конечные координаты x:', data.x);
		// console.log('Конечные координаты y:', data.y);
		// Здесь вы можете выполнить дополнительные действия с полученными координатами
	};

	const handleTextareaClick = () => {
		if (textareaRef.current) {
			setWidthInput(textareaRef.current.clientWidth);
			setHeightInput(textareaRef.current.clientHeight)
		}
	};

	const handleChangeComplete = (newColor) => {
		setColor(newColor.hex); // Обновляем цвет при выборе
	};

	return (
		// <Draggable bounds="parent" defaultPosition={{ x: 0, y: 0 }} onStop={handleDragStop}>
		<Draggable bounds="parent" onStop={handleDragStop}>
			<div className="certificate__text-field">
				{editingTextIndex === index ? (
					<textarea
						value={textBlock.text}
						onMouseDown={handleResizeMouseDown}
						onChange={(e) => onTextChange(e, index)}
						onKeyDown={(e) => onInputKeyDown(e, index)}
						onClick={(e) => {
							e.stopPropagation()
							handleTextareaClick()
						}}
						ref={textareaRef}
						style={{
							fontFamily: textBlock.fontFamily,
							fontSize: textBlock.fontSize,
							fontStyle: textBlock.isItalic ? 'italic' : 'normal',
							fontWeight: textBlock.isBold ? 'bold' : 'normal',
							textDecoration:
								textDecorationStyle === 'underline'
									? 'underline'
									: textDecorationStyle === 'strikethrough'
									? 'line-through'
									: 'none',
							textAlign:
								textAlignStyle === 'left'
									? 'left'
									: textAlignStyle === 'center'
									? 'center'
									: 'right',
							width: widthInput + scrollbarWidth,
							height: heightInput,
							color
						}}
						className="certificate__input"
					/>
				) : (
					<div
						className="certificate__text-block"
						onDoubleClick={() => {
							setEditingTextIndex(index);
							setShowProperties(true);
							setActiveTextIndex(index);
							setFontSize(textBlock.fontSize);
							setFont(textBlock.fontFamily);
						}}
						style={{
							fontFamily: textBlock.fontFamily,
							fontSize: textBlock.fontSize,
							fontStyle: textBlock.isItalic ? 'italic' : 'normal',
							fontWeight: textBlock.isBold ? 'bold' : 'normal',
							textDecoration:
								textDecorationStyle === 'underline'
									? 'underline'
									: textDecorationStyle === 'strikethrough'
										? 'line-through'
										: 'none',
							textAlign:
								textAlignStyle === 'left'
									? 'left'
									: textAlignStyle === 'center'
										? 'center'
										: 'right',
							width: widthInput + scrollbarWidth,
							height: heightInput,
							color
						}}
					>
						<p className="certificate__text-paragraph">{textBlock.text}</p>
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
					textBlockStyles={textBlockStyles}
					setTextBlockStyles={setTextBlockStyles}
					setTextAlignStyle={setTextAlignStyle}
					onChangeComplete={handleChangeComplete}
					color={color}
				/>
			</div>
		</Draggable>
	);
}

export default TextBlock;
