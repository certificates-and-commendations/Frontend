import React, { useEffect, useState } from 'react';
import SidebarEditor from './SidebarEditor/SidebarEditor';
import CertificateEditor from './CertificateEditor/CertificateEditor';
import PropertiesPanel from './CertificateEditor/PropertiesPanel/PropertiesPanel';

function PageEditor({
	samples,
	certificateRef,
	setTextBlocks,
	textBlocks,
	setImageURLsDownloads,
	imageURLsDownloads,
	setImageURLsElements,
	imageURLsElements,
	setUploadedCertificate,
	uploadedCertificate,
	setTextPosition,
	textPosition,
	setTextBlockStyles,
	textBlockStyles,
	setTextBlockColors,
	textBlockColors,
	setBackground,
	setIsTablePopupOpen,
	documentById,
	background,
}) {
	const [currentIndex, setCurrentIndex] = useState(null);
	const [font, setFont] = useState('Arial');
	const [fontSize, setFontSize] = useState(14);
	const [showProperties, setShowProperties] = useState(false);
	const [editingTextIndex, setEditingTextIndex] = useState(null);
	const [signature, setSignature] = useState(null);
	const [showTable, setShowTable] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [element, setElement] = useState([]);
	const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });

	const [activeTextIndex, setActiveTextIndex] = useState(null);
	const [borderTextIndex, setBorderTextIndex] = useState(null);
	const [textDecorationStyle, setTextDecorationStyle] = useState('none');
	const [textAlignStyle, setTextAlignStyle] = useState('left');
	const [pdfData, setPdfData] = useState(null);
	const [panelSidebarActive, setPanelSidebarActive] = useState(false);
	const [stylePanelActive, setStylePanelActive] = useState(false);
	const [elementVisibility, setElementVisibility] = useState([]);
	const [showColorPanel, setShowColorPanel] = useState(false);
	const [align, setAlign] = useState('left');
	const [textBoldActiveMenu, setTextBoldActiveMenu] = useState(false);
	const [textItalicActiveMenu, setTextItalicActiveMenu] = useState(false);
	const [textUnderlineActiveMenu, setTextUnderlineActiveMenu] = useState(false);
	const [textStrikethroughActiveMenu, setTextStrikethroughActiveMenu] =
		useState(false);
	const [isDedicated, setIsDedicated] = useState(false);
	const [fontResult, setFontResult] = useState([]);
	const [shouldUpdateFontResult, setShouldUpdateFontResult] = useState(false);
	const [squareStatesElementsPanel, setSquareStatesElementsPanel] = useState(
		[]
	);
	const [squareStatesDownloadPanel, setSquareStatesDownloadPanel] = useState(
		[]
	);

	const initialPositions = element.map(() => ({ x: 0, y: 0 }));
	const [positions, setPositions] = useState(initialPositions);

	function generateUniqueId() {
		return Math.random().toString(36).substr(2, 9);
	}

	useEffect(() => {
		if (shouldUpdateFontResult) {
			const newFontResult = fontResult.map((elem) => {
				const updatedFontFile = elem.font_file.replace(/^http:/, 'https:');
				return { ...elem, font_file: updatedFontFile };
			});
			setFontResult(newFontResult);
			console.log(newFontResult);
			setShouldUpdateFontResult(false); // Сброс флага
		}
	}, [fontResult, shouldUpdateFontResult]);

	useEffect(() => {
		if (documentById) {
			const initialTextBlocks = documentById.texts.map((textData) => ({
				id: textData.id,
				text: textData.text,
				fontFamily: textData.font.font,
				fontSize: textData.font_size,
				x: textData.coordinate_x,
				y: textData.coordinate_y,
			}));

			const initialTextBlockColors = documentById.texts.map((textData) => ({
				id: textData.id,
				color: textData.font_color,
			}));

			const initialTextBlockStyles = documentById.texts.map((textData) => ({
				id: textData.id,
				isItalic: textData.font.is_italic,
				isBold: textData.font.is_bold,
				isDecoration: textData.text_decoration,
				isAlign: textData.align,
			}));

			const initialTextPosition = documentById.texts.map((textData) => ({
				id: textData.id,
				x: textData.coordinate_x,
				y: textData.coordinate_y,
			}));

			const initialElementPosition = documentById.elements.map((elem) => ({
				x: elem.coordinate_x,
				y: elem.coordinate_y,
			}));

			const initialElement = [];
			const initialElementImagePanel = [];

			documentById.elements.forEach((elem) => {
				const newId = generateUniqueId();

				initialElement.push({
					id: newId,
					url: elem.image,
				});

				initialElementImagePanel.push({
					id: newId,
					url: elem.image,
					position: {
						x: elem.coordinate_x,
						y: elem.coordinate_y,
					},
				});
			});

			setTextBlocks(initialTextBlocks);
			setTextBlockColors(initialTextBlockColors);
			setTextBlockStyles(initialTextBlockStyles);
			setTextPosition(initialTextPosition);
			setPositions(initialElementPosition);
			setElement(initialElement);
			setImageURLsElements(initialElementImagePanel);
			setSquareStatesElementsPanel(
				Array(documentById.elements.length).fill(true)
			);
		}
	}, [documentById]);

	useEffect(() => {
		if (documentById) {
			setImageURLsDownloads([documentById]);
			setUploadedCertificate([documentById]);
			const newCertificates = [documentById.background];
			setSquareStatesDownloadPanel(() => newCertificates.map(() => true));
			setPanelSidebarActive(true);
		}
	}, [documentById]);

	const handleTextClick = (size) => {
		setFontSize(size);
		setFont('Arial');
		setShowColorPanel(false);
		setAlign('left');
		setTextBoldActiveMenu(false);
		setTextItalicActiveMenu(false);
		setTextUnderlineActiveMenu(false);
		setTextStrikethroughActiveMenu(false);

		const blockId = generateUniqueId();

		if (!editingTextIndex) {
			setTextBlockColors([
				...textBlockColors,
				{
					id: blockId,
					color: '#000000',
				},
			]);

			setTextBlocks([
				...textBlocks,
				{
					id: blockId,
					text: '',
					x: '',
					y: '',
					fontFamily: 'Arial',
					fontSize: size,
				},
			]);
			setTextBlockStyles([
				...textBlockStyles,
				{
					id: blockId,
					isItalic: false,
					isBold: false,
					isDecoration: 'none',
					isAlign: 'left',
					isBorder: false,
				},
			]);

			setTextPosition([...textPosition, { x: 0, y: 0 }]);

			setEditingTextIndex(textBlocks.length);
			setActiveTextIndex(textBlocks.length);
			setShowProperties(true);
			setStylePanelActive(true);
		}
	};

	const handleTextChange = (e, index) => {
		const updatedTextBlocks = [...textBlocks];
		updatedTextBlocks[index].text = e.target.value;
		setTextBlocks(updatedTextBlocks);
	};

	const handleDeleteTextBlock = (idToDelete) => {
		const updatedTextBlocks = textBlocks.filter(
			(block) => block.id !== idToDelete
		);
		setTextBlocks(updatedTextBlocks);

		const updatedTextBlockStyles = updatedTextBlocks.map((block) => {
			const styleIndex = textBlockStyles.findIndex(
				(styleBlock) => styleBlock.id === block.id
			);
			return textBlockStyles[styleIndex];
		});
		setTextBlockStyles(updatedTextBlockStyles);

		const updatedPositions = textPosition.filter(
			(position) => position.id !== idToDelete
		);

		const recalculatedPositions = updatedPositions.map((position) => {
			return {
				id: position.id,
				x: position.x,
				y: position.y,
			};
		});
		setTextPosition(recalculatedPositions);
		const updatedTextBlockColors = textBlockColors.filter(
			(color) => color.id !== idToDelete
		);
		setTextBlockColors(updatedTextBlockColors);
	};

	const handleInputAccept = (index) => {
		setEditingTextIndex(null);
		const updatedTextBlocks = [...textBlocks];
		const blockId = updatedTextBlocks[index].id;
		const blockIndex = updatedTextBlocks.findIndex(
			(block) => block.id === blockId
		);
		if (blockIndex !== -1) {
			updatedTextBlocks[blockIndex].text = textBlocks[index].text;
			updatedTextBlocks[blockIndex].x = textPosition.x;
			updatedTextBlocks[blockIndex].y = textPosition.y;
			setTextBlocks(updatedTextBlocks);
		}
		setShowProperties(false);
		setActiveTextIndex(null);
	};

	const handleInputKeyDown = (e, index) => {
		if (e.key === 'Enter') {
			setStylePanelActive(false);
			handleInputAccept(index);
		}
	};

	const handleInputClickAccept = (index) => {
		setStylePanelActive(false);
		handleInputAccept(index);
	};

	const handleElementDrag = (e, data) => {
		setElementPosition({ x: data.x, y: data.y });
	};

	const handleChangeComplete = (newColor) => {
		const updatedTextBlockColors = [...textBlockColors];
		updatedTextBlockColors[activeTextIndex].color = newColor.hex;
		setTextBlockColors(updatedTextBlockColors);
	};

	const updateElementPosition = (id, newPosition) => {
		const updatedElements = imageURLsElements.map((elem) => {
			if (elem.id === id) {
				return { ...elem, position: newPosition };
			}
			return elem;
		});

		setImageURLsElements(updatedElements);
	};

	return (
		<main className="main-content-editor">
			<SidebarEditor
				setPanelSidebarActive={setPanelSidebarActive}
				panelSidebarActive={panelSidebarActive}
				setUploadedCertificate={setUploadedCertificate}
				setElement={setElement}
				element={element}
				setElementVisibility={setElementVisibility}
				elementVisibility={elementVisibility}
				positions={positions}
				setPositions={setPositions}
				onTextClick={handleTextClick}
				setFontResult={setFontResult}
				fontResult={fontResult}
				samples={samples}
				setIsTablePopupOpen={setIsTablePopupOpen}
				setImageURLsDownloads={setImageURLsDownloads}
				imageURLsDownloads={imageURLsDownloads}
				setImageURLsElements={setImageURLsElements}
				imageURLsElements={imageURLsElements}
				setBackground={setBackground}
				background={background}
				setSquareStatesElementsPanel={setSquareStatesElementsPanel}
				squareStatesElementsPanel={squareStatesElementsPanel}
				setSquareStatesDownloadPanel={setSquareStatesDownloadPanel}
				squareStatesDownloadPanel={squareStatesDownloadPanel}
				setShouldUpdateFontResult={setShouldUpdateFontResult}
			/>
			<section className="certificate-main">
				<PropertiesPanel
					stylePanelActive={stylePanelActive}
					font={font}
					setFont={setFont}
					fontSize={fontSize}
					setFontSize={setFontSize}
					editingTextIndex={editingTextIndex}
					showTable={showTable}
					setShowTable={setShowTable}
					tableData={tableData}
					setTableData={setTableData}
					textBlocks={textBlocks}
					setTextBlocks={setTextBlocks}
					isVisible={elementVisibility}
					activeTextIndex={activeTextIndex}
					setActiveTextIndex={setActiveTextIndex}
					setTextDecorationStyle={setTextDecorationStyle}
					textBlockStyles={textBlockStyles}
					setTextBlockStyles={setTextBlockStyles}
					setTextAlignStyle={setTextAlignStyle}
					onChangeComplete={handleChangeComplete}
					textBlockColors={textBlockColors}
					currentIndex={currentIndex}
					onInputClickAccept={handleInputClickAccept}
					setShowColorPanel={setShowColorPanel}
					showColorPanel={showColorPanel}
					setAlign={setAlign}
					align={align}
					setTextBoldActiveMenu={setTextBoldActiveMenu}
					textBoldActiveMenu={textBoldActiveMenu}
					setTextItalicActiveMenu={setTextItalicActiveMenu}
					textItalicActiveMenu={textItalicActiveMenu}
					setTextUnderlineActiveMenu={setTextUnderlineActiveMenu}
					textUnderlineActiveMenu={textUnderlineActiveMenu}
					setTextStrikethroughActiveMenu={setTextStrikethroughActiveMenu}
					textStrikethroughActiveMenu={textStrikethroughActiveMenu}
					isDedicated={isDedicated}
					setIsDedicated={setIsDedicated}
					onDeleteTextBlock={handleDeleteTextBlock}
					borderTextIndex={borderTextIndex}
					fontResult={fontResult}
					setShouldUpdateFontResult={setShouldUpdateFontResult}
				/>
				<CertificateEditor
					setCurrentIndex={setCurrentIndex}
					setEditingTextIndex={setEditingTextIndex}
					editingTextIndex={editingTextIndex}
					font={font}
					setFont={setFont}
					fontSize={fontSize}
					setFontSize={setFontSize}
					textBlocks={textBlocks}
					setTextBlocks={setTextBlocks}
					isVisible={showProperties}
					setActiveTextIndex={setActiveTextIndex}
					activeTextIndex={activeTextIndex}
					setShowProperties={setShowProperties}
					setTextDecorationStyle={setTextDecorationStyle}
					setTextPosition={setTextPosition}
					onTextClick={handleTextClick}
					textBlockStyles={textBlockStyles}
					setTextBlockStyles={setTextBlockStyles}
					setTextAlignStyle={setTextAlignStyle}
					handleTextChange={handleTextChange}
					onInputKeyDown={handleInputKeyDown}
					showTable={showTable}
					setShowTable={setShowTable}
					tableData={tableData}
					setTableData={setTableData}
					uploadedCertificate={uploadedCertificate}
					signature={signature}
					element={element}
					elementPosition={elementPosition}
					onElementDrag={handleElementDrag}
					elementVisibility={elementVisibility}
					positions={positions}
					setPositions={setPositions}
					setStylePanelActive={setStylePanelActive}
					textBlockColors={textBlockColors}
					setIsDedicated={setIsDedicated}
					setBorderTextIndex={setBorderTextIndex}
					textPosition={textPosition}
					fontResult={fontResult}
					certificateRef={certificateRef}
					updateElementPosition={updateElementPosition}
				/>
			</section>
		</main>
	);
}

export default PageEditor;
