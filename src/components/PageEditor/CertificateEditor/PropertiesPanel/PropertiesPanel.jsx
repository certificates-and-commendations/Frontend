import React, { useState, useEffect, useRef } from 'react';
import { SketchPicker } from 'react-color';
import './PropertiesPanel.css';
import alignLeftIcon from '../../../../images/IconsFunctionsText/align-left-icon.svg';
import alignCenterIcon from '../../../../images/IconsFunctionsText/align-center-icon.svg';
import alignRightIcon from '../../../../images/IconsFunctionsText/align-right-icon.svg';
import alignJustifyIcon from '../../../../images/IconsFunctionsText/align-justify-icon.svg';
import buttonBold from '../../../../images/IconsFunctionsText/functions__button_bold.svg';
import buttonItalic from '../../../../images/IconsFunctionsText/functions__button_italic.svg';
import buttonUnderline from '../../../../images/IconsFunctionsText/functions__button_underline.svg';
import buttonStrikethrough from '../../../../images/IconsFunctionsText/functions__button_strikethrough.svg';
import buttonArrowUp from '../../../../images/IconsFunctionsText/chevron-up.svg';
import buttonArrowUpActive from '../../../../images/IconsFunctionsText/chevron-up-active.svg';
import buttonArrowDown from '../../../../images/IconsFunctionsText/chevron-down.svg';
import buttonArrowDownActive from '../../../../images/IconsFunctionsText/chevron-down-active.svg';
import buttonArrowUpFont from '../../../../images/IconsFunctionsText/chevron-up-font.svg';
import buttonArrowDownFont from '../../../../images/IconsFunctionsText/chevron-down-font.svg';
import FontFaceStyles from '../../SidebarEditor/TextPanel/FontFaceStyles/FontFaceStyles';

function PropertiesPanel({

                             stylePanelActive,
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
                             setFont,
                             editingTextIndex,
                             currentIndex,
                             onInputClickAccept,
                             textBlockColors,
                             setShowColorPanel,
                             showColorPanel,
                             setAlign,
                             align,
                             setTextBoldActiveMenu,
                             textBoldActiveMenu,
                             setTextItalicActiveMenu,
                             textItalicActiveMenu,
                             setTextUnderlineActiveMenu,
                             textUnderlineActiveMenu,
                             setTextStrikethroughActiveMenu,
                             textStrikethroughActiveMenu,
                             isDedicated,
                             onDeleteTextBlock,
                             setIsDedicated,
                             borderTextIndex,
                             fontResult
                         }) {
    const [fontSizeIncrease, setFontSizeIncrease] = useState(false);
    const [fontSizeReduce, setFontSizeReduce] = useState(false);
    const [fontOpen, setFontOpen] = useState(false);
    const fontSelectRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                fontSelectRef.current &&
                !fontSelectRef.current.contains(event.target)
            ) {
                setFontOpen(false);
            }
        }

        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickColorPanel = () => {
        setShowColorPanel(!showColorPanel);
    };

    const handleFontChange = (e) => {
        setFont(e.target.value);
        if (editingTextIndex !== null) {
            const updatedTextBlocks = [...textBlocks];
            updatedTextBlocks[editingTextIndex].fontFamily = e.target.value;
            setTextBlocks(updatedTextBlocks);
        }
    };

    const handleOpenFontList = (fontIndex) => {
        setFontOpen(!fontOpen);
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
        setFontSizeIncrease(true);
        const updatedTextBlocks = [...textBlocks];
        const newFontSize = Math.min(
            updatedTextBlocks[editingTextIndex].fontSize + 1,
            50
        );
        setFontSize(newFontSize);

        if (editingTextIndex !== null) {
            updatedTextBlocks[editingTextIndex].fontSize = newFontSize;
            setTextBlocks(updatedTextBlocks);
        }
        setTimeout(() => {
            setFontSizeIncrease(false);
        }, 150);
    };

    const handleFontSizeReduce = () => {
        setFontSizeReduce(true);
        const updatedTextBlocks = [...textBlocks];
        const newFontSize = Math.max(
            updatedTextBlocks[editingTextIndex].fontSize - 1,
            1
        );
        setFontSize(newFontSize);

        if (editingTextIndex !== null) {
            updatedTextBlocks[editingTextIndex].fontSize = newFontSize;
            setTextBlocks(updatedTextBlocks);
        }
        setTimeout(() => {
            setFontSizeReduce(false);
        }, 150);
    };

    const handleTextAlignChange = (indexText) => {
        const updatedStyles = [...textBlockStyles];
        updatedStyles[indexText] = {...updatedStyles[indexText]};

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
    };

    const handleBoldChange = () => {
        const updatedTextBlocks = [...textBlocks];
        updatedTextBlocks[currentIndex] = {...updatedTextBlocks[currentIndex]};
        updatedTextBlocks[currentIndex].isBold =
            !updatedTextBlocks[currentIndex].isBold;
        setTextBlocks(updatedTextBlocks);
        setTextBoldActiveMenu(!textBoldActiveMenu);
    };

    const handleItalicChange = () => {
        const updatedTextBlocks = [...textBlocks];
        updatedTextBlocks[currentIndex] = {...updatedTextBlocks[currentIndex]};
        updatedTextBlocks[currentIndex].isItalic =
            !updatedTextBlocks[currentIndex].isItalic;
        setTextBlocks(updatedTextBlocks);
        setTextItalicActiveMenu(!textItalicActiveMenu);
    };

    const handleTextDecorationUnderline = () => {
        const updatedStyles = [...textBlockStyles];
        updatedStyles[currentIndex] = {...updatedStyles[currentIndex]};

        updatedStyles[currentIndex].isDecoration =
            updatedStyles[currentIndex].isDecoration === 'underline'
                ? 'none'
                : 'underline';

        setTextBlockStyles(updatedStyles);
        setTextUnderlineActiveMenu(!textUnderlineActiveMenu);
        if (textStrikethroughActiveMenu) {
            setTextStrikethroughActiveMenu(false);
        }
    };

    const handleTextDecorationStrikethrough = () => {
        const updatedStyles = [...textBlockStyles];
        updatedStyles[currentIndex] = {...updatedStyles[currentIndex]};

        updatedStyles[currentIndex].isDecoration =
            updatedStyles[currentIndex].isDecoration === 'strikethrough'
                ? 'none'
                : 'strikethrough';

        setTextBlockStyles(updatedStyles);
        setTextStrikethroughActiveMenu(!textStrikethroughActiveMenu);
        if (textUnderlineActiveMenu) {
            setTextUnderlineActiveMenu(false);
        }
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

                {stylePanelActive && (
                    <li className="functions__button functions__button-nav1">
                        <button
                            className="functions__button_color"
                            type="button"
                            aria-label="Кнопка для удаления"
                            onClick={handleClickColorPanel}
                            style={{
                                backgroundColor: textBlockColors[activeTextIndex].color,
                            }}
                        />
                        {showColorPanel && (
                            <div className="functions__block-color">
                                <SketchPicker
                                    color={textBlockColors[activeTextIndex].color}
                                    onChangeComplete={onChangeComplete}
                                />
                            </div>
                        )}
                        <div className="function__block-font" ref={fontSelectRef}>
                            <select
                                id={`fontSelect-${activeTextIndex}`}
                                value={font}
                                onChange={handleFontChange}
                                onClick={handleOpenFontList}
                                className="functions__list"
                                style={{background: fontOpen ? '#C3BEFF' : '#FFFFFF'}}
                            >
                                <option
                                    value="Arial"
                                    className="function__option"
                                >
                                    Arial
                                </option>
                                <option
                                    value="Times New Roman"
                                    className="function__option"
                                >
                                    Times New Roman
                                </option>
                                {
                                    fontResult.map(elem => (
                                        <option
                                            value={fontResult.font}
                                            className="function__option"
                                        >
                                            { elem.font.length > 15 ? `${elem.font.slice(0, 15)}...` : elem.font }
                                        </option>
                                    ))
                                }
                                <FontFaceStyles fontResult={fontResult}/>
                            </select>
                            <img
                                className="functions__img-arrow-up-font"
                                src={fontOpen ? buttonArrowUpFont : buttonArrowDownFont}
                                alt=" Кнопка для открытия с выбором шрифтов."
                                style={{background: fontOpen ? '#C3BEFF' : '#FFFFFF'}}
                            />
                        </div>
                        <label
                            className="functions-quantity-block"
                            htmlFor={`fontSizeSelect-${activeTextIndex}`}
                        >
                            <input
                                className="functions-quantity-num"
                                id={`fontSizeSelect-${activeTextIndex}`}
                                type="number"
                                value={fontSize}
                                min={1}
                                onChange={handleFontSizeChange}
                            />
                            <div className="functions-quantity-block_arrow">
                                <img
                                    className="functions__img-arrow-up"
                                    src={fontSizeIncrease ? buttonArrowUpActive : buttonArrowUp}
                                    alt=" Кнопка для увеличения размера шрифта."
                                    onClick={handleFontSizeIncrease}
                                />

                                <img
                                    className="functions-quantity-arrow-down"
                                    src={fontSizeReduce ? buttonArrowDownActive : buttonArrowDown}
                                    alt=" Кнопка для уменьшения размера шрифта."
                                    onClick={handleFontSizeReduce}
                                />
                            </div>
                        </label>
                        <img
                            className="functions__button_align-center"
                            src={collectionPositionIcons()}
                            alt=" Кнопка для определения расположения текста."
                            aria-label=" Кнопка для расположения текста."
                            onClick={() => handleTextAlignChange(currentIndex)}
                        />
                        <button
                            className="functions__button_bold"
                            type="button"
                            aria-label=" Кнопка для добавления стиля полужирный к тексту."
                            onClick={handleBoldChange}
                            style={{
                                backgroundColor: textBoldActiveMenu ? '#C3BEFF' : '#FFFFFF',
                            }}
                        >
                            <img
                                className="functions__img-bold"
                                src={buttonBold}
                                alt=" Картинка для выбора жирного текста."
                            />
                        </button>
                        <button
                            className="functions__button_italic"
                            type="button"
                            aria-label="Кнопка для удаления"
                            onClick={handleItalicChange}
                            style={{
                                backgroundColor: textItalicActiveMenu ? '#C3BEFF' : '#FFFFFF',
                            }}
                        >
                            <img
                                className="functions__img-italic"
                                src={buttonItalic}
                                alt=" Картинка для выбора курсива для текста."
                            />
                        </button>
                        <button
                            className="functions__button_underline"
                            type="button"
                            aria-label=" Кнопка для подчёркивания текста."
                            onClick={handleTextDecorationUnderline}
                            style={{
                                backgroundColor: textUnderlineActiveMenu
                                    ? '#C3BEFF' : '#FFFFFF',
                            }}
                        >
                            <img
                                className="functions__img-underline"
                                src={buttonUnderline}
                                alt=" Картинка для подчёркнутого текста."
                            />
                        </button>
                        <button
                            className="functions__button_strikethrough"
                            type="button"
                            aria-label="Кнопка для зачеркивания текста."
                            onClick={handleTextDecorationStrikethrough}
                            style={{
                                backgroundColor: textStrikethroughActiveMenu
                                    ? '#C3BEFF' : '#FFFFFF',
                            }}
                        >
                            <img
                                className="functions__img-strikethrough"
                                src={buttonStrikethrough}
                                alt=" Картинка для зачёркнутого текста."
                            />
                        </button>
                    </li>
                )
                }

                <li className="functions__button">
                    {stylePanelActive && (
                        <button
                            className="functions__button_accept"
                            type="button"
                            aria-label=" Кнопка для принятие текста."
                            onClick={(e) => onInputClickAccept(activeTextIndex)}
                        />
                    )}
                    {isDedicated && (
                        <button
                            className="functions__button_delete"
                            type="button"
                            aria-label="Кнопка для удаления"
                            onClick={() => {
                                onDeleteTextBlock(borderTextIndex);
                                setIsDedicated(false);
                            }}
                        />
                    )}
                </li>
            </ul>
        </section>
    )
        ;
}

export default PropertiesPanel;
