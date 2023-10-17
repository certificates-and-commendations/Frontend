import React, { useState } from 'react';
import templateImage from '../../../images/imageEditor/templateImage.svg';
import textImage from '../../../images/imageEditor/textImage.svg';
import textImageNoActive from '../../../images/imageEditor/textImage_no-active.svg';
import elementImage from '../../../images/imageEditor/elementImage.svg';
import elementImageNoActive from '../../../images/imageEditor/elementImage_no-active.svg';
import downloadImage from '../../../images/imageEditor/downloadImage.svg';
import TemplatesPanel from './TemplatesPanel/TemplatesPanel';
import TextPanel from './TextPanel/TextPanel';
import ElementsPanel from './ElementsPanel/ElementsPanel';
import DownloadsPanel from './DownloadsPanel/DownloadsPanel';

function SidebarEditor({
	setPanelSidebarActive,
	panelSidebarActive,
	setUploadedCertificate,
	setElement,
	element,
	setElementVisibility,
	elementVisibility,
	positions,
	setPositions,
	onTextClick,
	fontResult,
	setFontResult,
	samples,
	setImageURLsDownloads,
	imageURLsDownloads,
	setImageURLsElements,
	imageURLsElements,
	setBackground,
	setSquareStatesElementsPanel,
	squareStatesElementsPanel,
	setSquareStatesDownloadPanel,
	squareStatesDownloadPanel,
	setIsTablePopupOpen,
	background,
	setShouldUpdateFontResult,
}) {
	const [activePanel, setActivePanel] = useState('panelTemplates');
	const [activeClass, setActiveClass] = useState('panelTemplates');

	const renderPanel = () => {
		switch (activePanel) {
			case 'panelTemplates':
				return <TemplatesPanel samples={samples} />;
			case 'panelText':
				return (
					<TextPanel
						onTextClick={onTextClick}
						setFontResult={setFontResult}
						fontResult={fontResult}
						setShouldUpdateFontResult={setShouldUpdateFontResult}
					/>
				);
			case 'panelElements':
				return (
					<ElementsPanel
						setElement={setElement}
						element={element}
						setElementVisibility={setElementVisibility}
						elementVisibility={elementVisibility}
						positions={positions}
						setPositions={setPositions}
						setImageURLsElements={setImageURLsElements}
						imageURLsElements={imageURLsElements}
						setSquareStatesElementsPanel={setSquareStatesElementsPanel}
						squareStatesElementsPanel={squareStatesElementsPanel}
						setIsTablePopupOpen={setIsTablePopupOpen}
					/>
				);
			case 'panelDownloads':
				return (
					<DownloadsPanel
						setPanelSidebarActive={setPanelSidebarActive}
						setUploadedCertificate={setUploadedCertificate}
						setImageURLsDownloads={setImageURLsDownloads}
						imageURLsDownloads={imageURLsDownloads}
						setBackground={setBackground}
						setSquareStatesDownloadPanel={setSquareStatesDownloadPanel}
						squareStatesDownloadPanel={squareStatesDownloadPanel}
						background={background}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<aside className="sidebar">
			<nav className="sidebar-navigate">
				<ul className="sidebar-navigate__items">
					<li
						className={`sidebar-navigate__item ${
							activeClass === 'panelTemplates'
								? 'sidebar-navigate__item_active'
								: ''
						}`}
					>
						<button
							className="sidebar-navigate__button"
							onClick={() => {
								setActivePanel('panelTemplates');
								setActiveClass('panelTemplates');
							}}
						>
							<img
								src={templateImage}
								alt=" Кнопка для открытия панели с шаблонами."
								className="sidebar-navigate__icon"
							/>
							Шаблоны
						</button>
					</li>
					<li
						className={`sidebar-navigate__item ${
							activeClass === 'panelText' ? 'sidebar-navigate__item_active' : ''
						}`}
					>
						<button
							className={
								!panelSidebarActive
									? 'sidebar-navigate__button_no-active'
									: 'sidebar-navigate__button'
							}
							onClick={() => {
								setActivePanel('panelText');
								setActiveClass('panelText');
							}}
							disabled={!panelSidebarActive}
						>
							<img
								src={!panelSidebarActive ? textImageNoActive : textImage}
								alt=" Кнопка для открытия панели для создания текста."
								className="sidebar-navigate__icon"
							/>
							Текст
						</button>
					</li>
					<li
						className={`sidebar-navigate__item ${
							activeClass === 'panelElements'
								? 'sidebar-navigate__item_active'
								: ''
						}`}
					>
						<button
							className={
								!panelSidebarActive
									? 'sidebar-navigate__button_no-active'
									: 'sidebar-navigate__button'
							}
							onClick={() => {
								setActivePanel('panelElements');
								setActiveClass('panelElements');
							}}
							disabled={!panelSidebarActive}
						>
							<img
								src={!panelSidebarActive ? elementImageNoActive : elementImage}
								alt=" Кнопка для открытия панели с элементами."
								className="sidebar-navigate__icon"
							/>
							Элементы
						</button>
					</li>
					<li
						className={`sidebar-navigate__item ${
							activeClass === 'panelDownloads'
								? 'sidebar-navigate__item_active'
								: ''
						}`}
					>
						<button
							className="sidebar-navigate__button"
							onClick={() => {
								setActivePanel('panelDownloads');
								setActiveClass('panelDownloads');
							}}
						>
							<img
								src={downloadImage}
								alt=" Кнопка открытия панели загрузок."
								className="sidebar-navigate__icon"
							/>
							Загрузки
						</button>
					</li>
				</ul>
			</nav>
			<section className="panel-container">{renderPanel()}</section>
		</aside>
	);
}

export default SidebarEditor;
