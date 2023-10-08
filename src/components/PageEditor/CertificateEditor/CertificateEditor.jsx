import React from 'react';
import TextBlock from './TextBlock/TextBlock';
import ElementFiles from './ElementFiles/ElementFiles';

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
                               onInputKeyDown,
                               textBlocks,
                               setTextBlocks,
                               certificateRef,
                               isVisible,
                               setActiveTextIndex,
                               activeTextIndex,
                               setShowProperties,
                               setTextDecorationStyle,
                               setTextPosition,
                               textPosition,
                               onTextClick,
                               textBlockStyles,
                               setTextBlockStyles,
                               setTextAlignStyle,
                               uploadedCertificate,
                               element,
                               elementPosition,
                               onElementDrag,
                               elementVisibility,
                               setSquareStates,
                               squareStates,
                               positions,
                               setPositions,
                               setStylePanelActive,
                               textBlockColors,
                               setClickTextBlockActive,
                               clickTextBlockActive,
                               setIsDedicated,
                               setBorderTextIndex,
                               fontResult
                           }) {
    return (
        <div className="certificate">
            {uploadedCertificate && (
                <img
                    src={uploadedCertificate}
                    alt="Uploaded Certificate"
                    className="certificate__image"
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
                    onInputKeyDown={(e) => onInputKeyDown(e, index)}
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
                    setStylePanelActive={setStylePanelActive}
                    textBlockColors={textBlockColors}
                    setClickTextBlockActive={setClickTextBlockActive}
                    clickTextBlockActive={clickTextBlockActive}
                    setIsDedicated={setIsDedicated}
                    setBorderTextIndex={setBorderTextIndex}
                    setPositions={setPositions}
                    positions={positions}
                    textPosition={textPosition}
                    fontResult={fontResult}
                />
            ))}
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
