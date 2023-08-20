import React from 'react';
import Draggable from 'react-draggable';
import PropertiesPanel from "../PropertiesPanel/PropertiesPanel";

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
                       setShowProperties
                   }) {

    return (
        <Draggable bounds="parent">
            <div
                className="certificate__text-field"
                style={{
                    top: textBlock.y,
                    left: textBlock.x,
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
                            cursor: 'pointer',
                            fontFamily: textBlock.fontFamily,
                            fontSize: textBlock.fontSize,
                        }}
                    >
                        {textBlock.text}
                    </div>
                )}
                <PropertiesPanel
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
                />
            </div>
        </Draggable>
    );
}

export default TextBlock;
