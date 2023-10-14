import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import SidebarEditor from './SidebarEditor/SidebarEditor';
import CertificateEditor from './CertificateEditor/CertificateEditor';
import PropertiesPanel from './CertificateEditor/PropertiesPanel/PropertiesPanel';

function PageEditor({ samples, setIsTablePopupOpen }) {
	const [currentIndex, setCurrentIndex] = useState(null);
	const [font, setFont] = useState('Arial');
	const [fontSize, setFontSize] = useState(14);
	const [showProperties, setShowProperties] = useState(false);
	const [textBlocks, setTextBlocks] = useState([]);
	const [editingTextIndex, setEditingTextIndex] = useState(null);
	const [signature, setSignature] = useState(null);
	const [uploadedCertificate, setUploadedCertificate] = useState(null);
	const [showTable, setShowTable] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [textBlockColors, setTextBlockColors] = useState([]);
	const [element, setElement] = useState([]);
	const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });
	const [textPosition, setTextPosition] = useState([]);

	const [activeTextIndex, setActiveTextIndex] = useState(null);
	const [borderTextIndex, setBorderTextIndex] = useState(null);
	const [textDecorationStyle, setTextDecorationStyle] = useState('none');
	const [textAlignStyle, setTextAlignStyle] = useState('left');
	const [pdfData, setPdfData] = useState(null);
	const [textBlockStyles, setTextBlockStyles] = useState([]);
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

	const initialPositions = element.map(() => ({ x: 0, y: 0 }));
	const [positions, setPositions] = useState(initialPositions);

	const certificateRef = useRef(null);

	function generateUniqueId() {
		return Math.random().toString(36).substr(2, 9);
	}

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

	const handleCreateJson = () => {
		// Создание JSON объекта
		const jsonToSave = {
			text_field: textBlocks.map((block) => ({
				text: block.text,
				x: block.x,
				y: block.y,
				fontFamily: block.fontFamily,
				fontSize: block.fontSize,
				italic: block.isItalic,
				textDecoration: block.isDecoration,
				fontWeight: block.isBold,
			})),
			background: {
				width: 600,
				height: 850,
			}, // Подставьте URL фона
			Element: {
				url: element,
				x: elementPosition.x,
				y: elementPosition.y,
			},
		};
		// console.log(jsonToSave)
		setPdfData(jsonToSave);
	};

	const handleSavePDF = async () => {
		handleCreateJson();
		const scale = 3; // Увеличение разрешения в 3 раза
		const canvas = await html2canvas(certificateRef.current, { scale });
		const imgData = canvas.toDataURL('image/png');
		const pdf = new JsPDF();
		pdf.addImage(imgData, 'PNG', 0, 0, 210, 300, '', 'FAST');
		pdf.save('certificate.pdf');
	};

	const handleChangeComplete = (newColor) => {
		const updatedTextBlockColors = [...textBlockColors];
		updatedTextBlockColors[activeTextIndex].color = newColor.hex;
		setTextBlockColors(updatedTextBlockColors);
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
			/>
			<section className="certificate-main">
				<PropertiesPanel
					stylePanelActive={stylePanelActive}
					font={font}
					setFont={setFont}
					fontSize={fontSize}
					setFontSize={setFontSize}
					onSavePDF={handleSavePDF}
					editingTextIndex={editingTextIndex}
					showTable={showTable}
					setShowTable={setShowTable}
					tableData={tableData}
					setTableData={setTableData}
					textBlocks={textBlocks}
					setTextBlocks={setTextBlocks}
					certificateRef={certificateRef}
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
					certificateRef={certificateRef}
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
					onSavePDF={handleSavePDF}
					showTable={showTable}
					setShowTable={setShowTable}
					tableData={tableData}
					setTableData={setTableData}
					onCreateJson={handleCreateJson}
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
				/>
			</section>
		</main>
	);
}

export default PageEditor;
