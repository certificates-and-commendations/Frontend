import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';

function TextBlock({
	index,
	setCurrentIndex,
	textBlock,
	editingTextIndex,
	onTextChange,
	onInputKeyDown,
	setEditingTextIndex,
	setFont,
	setFontSize,
	setActiveTextIndex,
	setShowProperties,
	setTextPosition,
	textPosition,
	textDecorationStyle,
	textAlignStyle,
	setStylePanelActive,
	textBlockColors,
	activeTextIndex,
	textBlocks,
	setTextBlocks,
	setIsDedicated,
	setBorderTextIndex,
	setPositions,
	positions,
}) {
	const [widthInput, setWidthInput] = useState(209);
	const [heightInput, setHeightInput] = useState(17);
	const [isDragging, setIsDragging] = useState(false);
	const textareaRef = useRef(null);
	const scrollbarWidth = 20;

	const handleResizeMouseDown = (e) => {
		e.stopPropagation();
	};

	const handleDragStop = (e, data) => {
		const newPositionText = [...textPosition];
		const copyTextBlocks = [...textBlocks];

		newPositionText[index] = {
			id: copyTextBlocks[index].id,
			x: data.x,
			y: data.y,
		};

		setTextPosition(newPositionText);

		const newTextBlocks = [...textBlocks];
		newTextBlocks[index].x = data.x;
		newTextBlocks[index].y = data.y;
		setTextBlocks(newTextBlocks);
	};

	const handleTextareaClick = () => {
		if (textareaRef.current) {
			setWidthInput(textareaRef.current.clientWidth);
			setHeightInput(textareaRef.current.clientHeight);
		}
		setCurrentIndex(index);
	};

	const handleClickBlockText = (blockId) => {
		// Создаем копию textBlocks для изменений
		const updatedTextBlocks = textBlocks.map((block) => {
			if (block.id === blockId) {
				setBorderTextIndex(block.id);
				// Устанавливаем isBorder в противоположное значение для выбранного блока
				return { ...block, isBorder: !block.isBorder };
			}
			return block;
		});

		// Обновляем состояние textBlocks
		setTextBlocks(updatedTextBlocks);

		// Устанавливаем isDedicated в противоположное значение
		setIsDedicated(!textBlock.isBorder);

		console.log(textBlocks);
	};

	return (
		// <Draggable bounds="parent" defaultPosition={{ x: 0, y: 0 }} onStop={handleDragStop}>
		<Draggable
			bounds="parent"
			onStop={(e, data) => {
				// eslint-disable-next-line no-undef
				handleDragStop(e, data);
				e.stopPropagation();
			}}
			position={textPosition[index]}
			onDrag={(e, { x, y }) => {
				const newPositions = [...textPosition];
				newPositions[index] = { x, y };
				setPositions(newPositions);
			}}
		>
			<div className="certificate__text-field">
				{editingTextIndex === index ? (
					<>
						<textarea
							value={textBlock.text}
							onMouseDown={handleResizeMouseDown}
							onChange={(e) => onTextChange(e, index)}
							onKeyDown={(e) => onInputKeyDown(e, index)}
							onClick={(e) => {
								e.stopPropagation();
								handleTextareaClick();
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
										: textAlignStyle === 'right'
										? 'right'
										: 'justify',
								width: widthInput + scrollbarWidth,
								height: heightInput,
								color: textBlockColors[index].color,
							}}
							className="certificate__input"
						/>
						<button className="properties__button-move">Двигать панель</button>
					</>
				) : (
					<div
						className="certificate__text-block"
						role="button"
						tabIndex="0"
						onDoubleClick={() => {
							setEditingTextIndex(index);
							setShowProperties(true);
							setStylePanelActive(true);
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
							// width: widthInput + scrollbarWidth,
							// height: heightInput,
							color: textBlockColors[index].color,
							border: textBlock.isBorder ? '3px solid #C3BEFF' : 'none',
						}}
					>
						<p
							className="certificate__text-paragraph"
							onContextMenu={(e) => {
								e.preventDefault();
								handleClickBlockText(textBlock.id);
							}}
						>
							{textBlock.text}
						</p>
					</div>
				)}
			</div>
		</Draggable>
	);
}

export default TextBlock;
