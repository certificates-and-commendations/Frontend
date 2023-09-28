import React, {useState, useRef} from 'react';
import Draggable from 'react-draggable';
import StylePropertiesPanel from '../StylePropertiesPanel/StylePropertiesPanel';

function TextBlock({
                       index,
                       setCurrentIndex,
                       textBlock,
                       editingTextIndex,
                       onTextChange,
                       onInputAccept,
                       setEditingTextIndex,
                       setFont,
                       setFontSize,
                       color,
                       setActiveTextIndex,
                       setShowProperties,
                       setTextPosition,
                       textDecorationStyle,
                       textAlignStyle
                   }) {
    const [widthInput, setWidthInput] = useState(209);
    const [heightInput, setHeightInput] = useState(17);
    const textareaRef = useRef(null);
    const scrollbarWidth = 20;

    const handleResizeMouseDown = (e) => {
        e.stopPropagation(); // Предотвращаем всплытие события
    };

    const handleDragStop = (e, data) => {
        setTextPosition({x: data.x, y: data.y});
        // data.x и data.y содержат конечные координаты блока после перемещения
        // console.log('Конечные координаты x:', data.x);
        // console.log('Конечные координаты y:', data.y);
        // Здесь вы можете выполнить дополнительные действия с полученными координатами
    };

    const handleTextareaClick = () => {
        if (textareaRef.current) {
            setWidthInput(textareaRef.current.clientWidth);
            setHeightInput(textareaRef.current.clientHeight);
        }
        setCurrentIndex(index);
    };

    return (
        // <Draggable bounds="parent" defaultPosition={{ x: 0, y: 0 }} onStop={handleDragStop}>
        <Draggable bounds="parent" onStop={handleDragStop}>
            <div className="certificate__text-field">
                {editingTextIndex === index ? (
                    <>
                        <textarea
                            value={textBlock.text}
                            onMouseDown={handleResizeMouseDown}
                            onChange={(e) => onTextChange(e, index)}
                            onKeyDown={(e) => onInputAccept(e, index)}
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
                                color,
                            }}
                            className="certificate__input"
                        />
                        <button className="properties__button-move">Двигать панель</button>
                    </>
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
                            // width: widthInput + scrollbarWidth,
                            // height: heightInput,
                            color,
                        }}
                    >
                        <p className="certificate__text-paragraph">{textBlock.text}</p>
                    </div>
                )}
            </div>
        </Draggable>
    );
}

export default TextBlock;
