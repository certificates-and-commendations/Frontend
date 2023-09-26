import React, {useState} from 'react';
import './PropertiesPanel.css';
import alignLeftIcon from '../../../../images/IconsFunctionsText/align-left-icon.svg';
import alignCenterIcon from '../../../../images/IconsFunctionsText/align-center-icon.svg';
import alignRightIcon from '../../../../images/IconsFunctionsText/align-right-icon.svg';
import alignJustifyIcon from '../../../../images/IconsFunctionsText/align-justify-icon.svg';

function PropertiesPanel({
                             textPanelActive,
                             index,
                             font,
                             fontSize,
                             setFontSize,
                             textBlocks,
                             setTextBlocks,
                             isVisible,
                             activeTextIndex,
                             setTextDecorationStyle,
                             textBlockStyles,
                             setTextBlockStyles,
                             setTextAlignStyle,
                             onChangeComplete,
                             color,
                             setFont,
                             editingTextIndex,
                             currentIndex
                         }) {

    const [align, setAlign] = useState('left');

    const handleFontChange = (e) => {
        setFont(e.target.value);
        if (editingTextIndex !== null) {
            const updatedTextBlocks = [...textBlocks];
            updatedTextBlocks[editingTextIndex].fontFamily = e.target.value;
            setTextBlocks(updatedTextBlocks);
        }
    };

    const handleFontSizeChange = (e) => {
        const updatedTextBlocks = [...textBlocks];

        if (parseInt(e.target.value, 10) > 50) {
            setFontSize(50);
            updatedTextBlocks[editingTextIndex].fontSize = 50;
        } else if (parseInt(e.target.value, 10) < 0) {
            setFontSize(1);
            updatedTextBlocks[editingTextIndex].fontSize = 1;
        } else {
            setFontSize(parseInt(e.target.value, 10));

            if (editingTextIndex !== null) {
                updatedTextBlocks[editingTextIndex].fontSize = parseInt(
                    e.target.value,
                    10
                );

                setTextBlocks(updatedTextBlocks);
            }
        }
    };

    const handleFontSizeIncrease = () => {
        const updatedTextBlocks = [...textBlocks];
        const newFontSize = Math.min(updatedTextBlocks[editingTextIndex].fontSize + 1, 50);
        setFontSize(newFontSize);

        if (editingTextIndex !== null) {
            updatedTextBlocks[editingTextIndex].fontSize = newFontSize;
            setTextBlocks(updatedTextBlocks);
        }
    };

    const handleFontSizeReduce = () => {
        const updatedTextBlocks = [...textBlocks];
        const newFontSize = Math.max(updatedTextBlocks[editingTextIndex].fontSize - 1, 1);
        setFontSize(newFontSize);

        if (editingTextIndex !== null) {
            updatedTextBlocks[editingTextIndex].fontSize = newFontSize;
            setTextBlocks(updatedTextBlocks);
        }
    };

    const handleItalicChange = () => {
        const updatedTextBlocks = [...textBlocks];
        updatedTextBlocks[index] = {...updatedTextBlocks[index]};
        updatedTextBlocks[index].isItalic = !updatedTextBlocks[index].isItalic;
        setTextBlocks(updatedTextBlocks);
    };

    const handleTextDecorationChange = (style) => {
        const updatedStyles = [...textBlockStyles];
        updatedStyles[currentIndex] = {...updatedStyles[currentIndex]};
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

    const handleTextAlignChange = (indexText) => {
        const updatedStyles = [...textBlockStyles];
        updatedStyles[indexText] = { ...updatedStyles[indexText] };

        switch (updatedStyles[indexText].isAlign) {
            case 'left':
                updatedStyles[indexText].isAlign = 'center';
                setAlign('center');
                break;
            case 'center':
                updatedStyles[indexText].isAlign = 'right';
                setAlign('right');
                break;
            case 'right':
                updatedStyles[indexText].isAlign = 'justify';
                setAlign('justify');
                break;
            case 'justify':
                updatedStyles[indexText].isAlign = 'left';
                setAlign('left');
                break;
            default:
                updatedStyles[indexText].isAlign = 'left'; // Если значение неизвестно, вернем в начальное состояние
                break;
        }

        setTextBlockStyles(updatedStyles);
        setTextAlignStyle(updatedStyles[indexText].isAlign);
    };

    const collectionPositionIcons = () => {
        if (align === 'left') {
            return alignLeftIcon;
        }

        if (align === 'center') {
            return alignCenterIcon;
        }

        if (align === 'right') {
            return alignRightIcon;
        }

        if (align === 'justify') {
            return alignJustifyIcon;
        }
    }

    const handleBoldChange = () => {
        const updatedTextBlocks = [...textBlocks];
        updatedTextBlocks[index] = {...updatedTextBlocks[index]};
        updatedTextBlocks[index].isBold = !updatedTextBlocks[index].isBold;
        setTextBlocks(updatedTextBlocks);
    };

    return (
        <section className="functions">
            <ul className="functions_content">
                <li className="functions__button functions__button-nav">
                    <button
                        className="functions__button_back"
                        type="button"
                        aria-label="Кнопка для перехода назад"
                    />
                    <button
                        className="functions__button_forward"
                        type="button"
                        aria-label="Кнопка для перехода вперед"
                    />
                </li>

                {textPanelActive &&
                    <li className="functions__button functions__button-nav1">
                        <button
                            className="functions__button_color"
                            type="button"
                            aria-label="Кнопка для удаления"
                        />
                        <select
                            id={`fontSelect-${index}`}
                            value={font}
                            onChange={handleFontChange}
                            className="functions__list"
                        >
                            <option value="Arial">Arial</option>
                            <option value="Times New Roman">Times New Roman</option>
                        </select>
                        <label
                            className="functions-quantity-block"
                            htmlFor={`fontSizeSelect-${index}`}
                        >
                            <input
                                className="functions-quantity-num"
                                id={`fontSizeSelect-${index}`}
                                type="number"
                                value={fontSize}
                                min={1}
                                onChange={handleFontSizeChange}
                            />
                            <div className="functions-quantity-block_arrow">
                                <button
                                    className="functions-quantity-arrow-minus"
                                    type="button"
                                    aria-label="Кнопка увеличить"
                                    onClick={handleFontSizeIncrease}
                                />
                                <button
                                    className="functions-quantity-arrow-plus"
                                    type="button"
                                    aria-label="Кнопка уменьшить"
                                    onClick={handleFontSizeReduce}
                                />
                            </div>
                        </label>
                        <img
                            className="functions__button_align-center"
                            src={collectionPositionIcons()}
                            aria-label=" Кнопка для расположения текста."
                            onClick={() => handleTextAlignChange(currentIndex)}
                        />
                        <button
                            className="functions__button_bold"
                            type="button"
                            aria-label="Кнопка для удаления"
                        />
                        <button
                            className="functions__button_italic"
                            type="button"
                            aria-label="Кнопка для удаления"
                        />
                        <button
                            className="functions__button_underline"
                            type="button"
                            aria-label="Кнопка для удаления"
                        />
                        <button
                            className="functions__button_strikethrough"
                            type="button"
                            aria-label="Кнопка для удаления"
                        />
                    </li>
                }

                <li className="functions__button">
                    {textPanelActive &&
                        <button
                            className="functions__button_check"
                            type="button"
                            aria-label="Кнопка для проверки"
                        />
                    }
                    <button
                        className="functions__button_delete"
                        type="button"
                        aria-label="Кнопка для удаления"
                    />
                </li>
            </ul>
        </section>
    );
}

export default PropertiesPanel;
