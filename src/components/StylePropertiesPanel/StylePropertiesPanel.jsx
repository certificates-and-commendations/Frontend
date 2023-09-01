import React  from 'react';
import { GithubPicker } from 'react-color';

function StylePropertiesPanel({
	index,
	font,
	fontSize,
	onFontChange,
	onFontSizeChange,
	textBlocks,
	setTextBlocks,
	isVisible,
	activeTextIndex,
	setTextDecorationStyle,
	textBlockStyles,
	setTextBlockStyles,
  	setTextAlignStyle,
  	onChangeComplete,
  	color
}) {

	const handleItalicChange = () => {
		const updatedTextBlocks = [...textBlocks];
		updatedTextBlocks[index] = { ...updatedTextBlocks[index] };
		updatedTextBlocks[index].isItalic = !updatedTextBlocks[index].isItalic;
		setTextBlocks(updatedTextBlocks);
	};

	const handleTextDecorationChange = (currentIndex, style) => {
		const updatedStyles = [...textBlockStyles];
		updatedStyles[currentIndex] = { ...updatedStyles[currentIndex] };
		if (style === 'none') {
			updatedStyles[currentIndex].isDecoration = 'none';
		} else if (style === 'underline') {
			updatedStyles[currentIndex].isDecoration = 'underline';
		} else if (style === 'strikethrough') {
			updatedStyles[currentIndex].isDecoration = 'strikethrough';
		}

		setTextBlockStyles(updatedStyles);
		setTextDecorationStyle(style);
	};

	const handleTextAlignChange = (currentIndex, style) => {
		const updatedStyles = [...textBlockStyles];
		updatedStyles[currentIndex] = { ...updatedStyles[currentIndex] };
		if (style === 'left') {
			updatedStyles[currentIndex].isAlign = 'left';
		} else if (style === 'center') {
			updatedStyles[currentIndex].isAlign = 'center';
		} else if (style === 'right') {
			updatedStyles[currentIndex].isAlign = 'right';
		}

		setTextBlockStyles(updatedStyles);
		setTextAlignStyle(style);
	};

	const handleBoldChange = () => {
		const updatedTextBlocks = [...textBlocks];
		updatedTextBlocks[index] = { ...updatedTextBlocks[index] };
		updatedTextBlocks[index].isBold = !updatedTextBlocks[index].isBold;
		setTextBlocks(updatedTextBlocks);
	};

	return (
		<div
			className={`properties ${
				isVisible && activeTextIndex === index
					? 'properties_visible'
					: 'properties_hidden'
			}`}
		>
			<button className="properties__button-move">Двигать панель</button>
			<label
				className="properties__label properties__label_fonts"
				htmlFor={`fontSelect-${index}`}
			>
				<span className="properties__span-text">Font:</span>
				<select
					id={`fontSelect-${index}`}
					value={font}
					onChange={onFontChange}
					className="properties__select"
				>
					<option value="Arial">Arial</option>
					<option value="Times New Roman">Times New Roman</option>
				</select>
			</label>
			<label
				className="properties__label properties__label_font-size"
				htmlFor={`fontSizeSelect-${index}`}
			>
				<span className="properties__span-text">Font Size:</span>
				<input
					id={`fontSizeSelect-${index}`}
					type="number"
					min={1}
					value={fontSize}
					onChange={onFontSizeChange}
					className="properties__input properties__input_font-size"
				/>
			</label>
			<label
				className="properties__label properties__label_italic"
				htmlFor={`italicCheckbox-${index}`}
			>
				<input
					id={`italicCheckbox-${index}`}
					type="checkbox"
					checked={textBlocks[index].isItalic}
					onChange={handleItalicChange}
				/>
				<span className="properties__span-text">Курсив</span>
			</label>
			<label
				className="properties__label properties__label_bold"
				htmlFor={`boldCheckbox-${index}`}
			>
				<input
					id={`boldCheckbox-${index}`}
					type="checkbox"
					checked={textBlocks[index].isBold}
					onChange={handleBoldChange}
				/>
				<span className="properties__span-text">Полужирный</span>
			</label>
			<label
				className="properties__label properties__label_text-decoration"
				htmlFor={`underlineRadio-${index}`}
			>
				<input
					id={`underlineRadio-${index}`}
					type="radio"
					name={`textDecoration-${index}`}
					value="underline"
					checked={textBlockStyles[index].isDecoration === 'underline'}
					onChange={() => handleTextDecorationChange(index, 'underline')}
				/>
				<span className="properties__span-text">Подчеркнутый</span>
			</label>

			<label
				className="properties__label properties__label_text-decoration"
				htmlFor={`strikethroughRadio-${index}`}
			>
				<input
					id={`strikethroughRadio-${index}`}
					type="radio"
					name={`textDecoration-${index}`}
					value="strikethrough"
					checked={textBlockStyles[index].isDecoration === 'strikethrough'}
					onChange={() => handleTextDecorationChange(index, 'strikethrough')}
				/>
				<span className="properties__span-text">Зачеркнутый</span>
			</label>

			<label
				className="properties__label properties__label_text-decoration"
				htmlFor={`noneRadio-${index}`}
			>
				<input
					id={`noneRadio-${index}`}
					type="radio"
					name={`textDecoration-${index}`}
					value="none"
					checked={textBlockStyles[index].isDecoration === 'none'}
					onChange={() => handleTextDecorationChange(index, 'none')}
				/>
				<span className="properties__span-text">Нет</span>
			</label>

			<div className="properties__block-text-align">
				<p className="properties__name">Расположение текста</p>
				<label
					className="properties__label properties__label_text-align"
					htmlFor={`text-align-left-${index}`}
				>
					<input
						id={`text-align-left-${index}`}
						type="radio"
						name={`text-align-left-${index}`}
						value="none"
						checked={textBlockStyles[index].isAlign === 'left'}
						onChange={() => handleTextAlignChange(index, 'left')}
					/>
					<span className="properties__span-text">Лево</span>
				</label>

				<label
					className="properties__label properties__label_text-align"
					htmlFor={`text-align-center-${index}`}
				>
					<input
						id={`text-align-center-${index}`}
						type="radio"
						name={`text-align-center-${index}`}
						value="none"
						checked={textBlockStyles[index].isAlign === 'center'}
						onChange={() => handleTextAlignChange(index, 'center')}
					/>
					<span className="properties__span-text">Центр</span>
				</label>

				<label
					className="properties__label properties__label_text-align"
					htmlFor={`text-align-right-${index}`}
				>
					<input
						id={`text-align-right-${index}`}
						type="radio"
						name={`text-align-right-${index}`}
						value="none"
						checked={textBlockStyles[index].isAlign === 'right'}
						onChange={() => handleTextAlignChange(index, 'right')}
					/>
					<span className="properties__span-text">Право</span>
				</label>
			</div>
			<div className="properties__block-text-align">
				<p className="properties__name">Цвет текста</p>
				<GithubPicker
					color={color}
					onChangeComplete={onChangeComplete}
				/>
			</div>
		</div>
	);
}

export default StylePropertiesPanel;
