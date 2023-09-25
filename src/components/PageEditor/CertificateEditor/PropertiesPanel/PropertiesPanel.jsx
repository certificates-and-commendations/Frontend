import React, {useState} from 'react';
import './PropertiesPanel.css';

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
                             editingTextIndex
                         }) {
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

    const handleTextDecorationChange = (currentIndex, style) => {
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

    const handleTextAlignChange = (currentIndex, style) => {
        const updatedStyles = [...textBlockStyles];
        updatedStyles[currentIndex] = {...updatedStyles[currentIndex]};
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
                        <button
                            className="functions__button_align-center"
                            type="button"
                            aria-label="Кнопка для удаления"
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
