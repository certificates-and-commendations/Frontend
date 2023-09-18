import React from 'react';
import TextBlock from './TextBlock/TextBlock';
import Signature from './Signature/Signature';
import Stamp from './Stamp/Stamp';
import LateralPropertiesPanel from './LateralPropertiesPanel/LateralPropertiesPanel';
import TextFunctions from "./PropertiesPanel/PropertiesPanel";

function CertificateEditor({
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
                               onSignatureUpload,
                               onSavePDF,
                               onCertificateUpload,
                               showTable,
                               setShowTable,
                               tableData,
                               setTableData,
                               onStampUpload,
                               onCreateJson,
                               uploadedCertificate,
                               signature,
                               signaturePosition,
                               onSignatureDrag,
                               stamp,
                               stampPosition,
                               onStampDrag
                           })

{
    return (
        <section className="certificate-main" ref={certificateRef}>
            <TextFunctions/>
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
                    />
                ))}

                <div className="properties__container">
                    <LateralPropertiesPanel
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
                        activeTextIndex={activeTextIndex}
                        setActiveTextIndex={setActiveTextIndex}
                        onCreateJson={onCreateJson}
                    />
                </div>

                {signature && (
                    <Signature
                        signature={signature}
                        position={signaturePosition}
                        onDrag={onSignatureDrag}
                    />
                )}
                {stamp && (
                    <Stamp
                        stampImage={stamp}
                        position={stampPosition}
                        onDrag={onStampDrag}
                    />
                )}
            </div>
        </section>
    );
}

export default CertificateEditor;
