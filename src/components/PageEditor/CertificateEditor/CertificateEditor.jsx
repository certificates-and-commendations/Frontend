import React from 'react';
import TextBlock from './TextBlock/TextBlock';
import LateralPropertiesPanel from './LateralPropertiesPanel/LateralPropertiesPanel';
import ElementFiles from "./ElementFiles/ElementFiles";

function CertificateEditor({
                               setCurrentIndex,
                               setEditingTextIndex,
                               editingTextIndex,
                               font,
                               setFont,
                               fontSize,
                               setFontSize,
                               onFontChange,
                               onFontSizeChange,
                               handleTextChange,
                               handleInputKeyDown,
                               textBlocks,
                               setTextBlocks,
                               certificateRef,
                               isVisible,
                               setActiveTextIndex,
                               activeTextIndex,
                               setShowProperties,
                               setTextDecorationStyle,
                               setTextPosition,
                               onTextClick,
                               textBlockStyles,
                               setTextBlockStyles,
                               setTextAlignStyle,
                               onSavePDF,
                               onCertificateUpload,
                               showTable,
                               setShowTable,
                               tableData,
                               setTableData,
                               onStampUpload,
                               onCreateJson,
                               uploadedCertificate,
                               element,
                               elementPosition,
                               onElementDrag,
                               elementVisibility,
                               setSquareStates,
                               squareStates,
                               positions,
                               setPositions,
                               color
                           }) {
    return (
        <div className="certificate">
            {uploadedCertificate && (
                <img
                    src={uploadedCertificate}
                    alt="Uploaded Certificate"
                    className="certificate__image"
                    onClick={onTextClick}
                />
            )}
            {textBlocks.map((textBlock, index) => (
                <TextBlock
                    key={index}
                    index={index}
                    setCurrentIndex={setCurrentIndex}
                    textBlock={textBlock}
                    setEditingTextIndex={setEditingTextIndex}
                    editingTextIndex={editingTextIndex}
                    onTextChange={(e) => handleTextChange(e, index)}
                    onInputKeyDown={(e) => handleInputKeyDown(e, index)}
                    font={font}
                    setFont={setFont}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    onFontChange={onFontChange}
                    onFontSizeChange={onFontSizeChange}
                    textBlocks={textBlocks}
                    setTextBlocks={setTextBlocks}
                    certificateRef={certificateRef}
                    isVisible={isVisible}
                    setActiveTextIndex={setActiveTextIndex}
                    activeTextIndex={activeTextIndex}
                    setShowProperties={setShowProperties}
                    setTextDecorationStyle={setTextDecorationStyle}
                    textDecorationStyle={textBlockStyles[index].isDecoration}
                    setTextPosition={setTextPosition}
                    onTextClick={onTextClick}
                    textBlockStyles={textBlockStyles}
                    setTextBlockStyles={setTextBlockStyles}
                    textAlignStyle={textBlockStyles[index].isAlign}
                    setTextAlignStyle={setTextAlignStyle}
                    color={color}
                />
            ))}

            <div className="properties__container">
                <LateralPropertiesPanel
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
                    activeTextIndex={activeTextIndex}
                    setActiveTextIndex={setActiveTextIndex}
                    onCreateJson={onCreateJson}
                />
            </div>
            {element && (
                <ElementFiles
                    element={element}
                    elementPosition={elementPosition}
                    onDrag={onElementDrag}
                    elementVisibility={elementVisibility}
                    setSquareStates={setSquareStates}
                    squareStates={squareStates}
                    positions={positions}
                    setPositions={setPositions}
                />
            )}
        </div>
    );
}

export default CertificateEditor;
