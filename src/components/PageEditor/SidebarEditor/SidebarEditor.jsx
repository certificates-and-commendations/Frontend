import React, {useState} from 'react';
import templateImage from '../../../images/imageEditor/templateImage.svg'
import textImage from '../../../images/imageEditor/textImage.svg'
import textImageNoActive from '../../../images/imageEditor/textImage_no-active.svg'
import elementImage from '../../../images/imageEditor/elementImage.svg'
import elementImageNoActive from '../../../images/imageEditor/elementImage_no-active.svg'
import downloadImage from '../../../images/imageEditor/downloadImage.svg'
import TemplatesPanel from "./TemplatesPanel/TemplatesPanel";
import TextPanel from "./TextPanel/TextPanel";
import ElementsPanel from "./ElementsPanel/ElementsPanel";
import DownloadsPanel from "./DownloadsPanel/DownloadsPanel";

function SidebarEditor({
                           setTextPanelActive,
                           textPanelActive,
                           setUploadedCertificate
                       }) {

    const [activePanel, setActivePanel] = useState('panelTemplates');
    const [activeClass, setActiveClass] = useState('panelTemplates');

    const renderPanel = () => {
        switch (activePanel) {
            case 'panelTemplates':
                return <TemplatesPanel/>;
            case 'panelText':
                return <TextPanel/>;
            case 'panelElements':
                return <ElementsPanel/>;
            case 'panelDownloads':
                return <DownloadsPanel
                    setTextPanelActive={setTextPanelActive}
                    setUploadedCertificate={setUploadedCertificate}
                />;
            default:
                return null;
        }
    };

    return (
        <aside className="sidebar">
            <nav className="sidebar-navigate">
                <ul className="sidebar-navigate__items">
                    <li className={`sidebar-navigate__item ${activeClass === 'panelTemplates' ? "sidebar-navigate__item_active" : ""}`}>
                        <button
                            className="sidebar-navigate__button"
                            onClick={() => {
                                setActivePanel('panelTemplates');
                                setActiveClass('panelTemplates')
                            }
                            }
                        >
                            <img src={templateImage} alt=" Кнопка для открытия панели с шаблонами."
                                 className="sidebar-navigate__icon"/>
                            Шаблоны
                        </button>
                    </li>
                    <li className={`sidebar-navigate__item ${activeClass === 'panelText' ? "sidebar-navigate__item_active" : ""}`}>
                        <button
                            className={!textPanelActive ? "sidebar-navigate__button_no-active" : "sidebar-navigate__button"}
                            onClick={() => {
                                setActivePanel('panelText');
                                setActiveClass('panelText');
                            }}
                            disabled={!textPanelActive}
                        >
                            <img
                                src={!textPanelActive ? textImageNoActive : textImage}
                                alt=" Кнопка для открытия панели для создания текста."
                                className='sidebar-navigate__icon'
                            />
                            Текст
                        </button>
                    </li>
                    <li className={`sidebar-navigate__item ${activeClass === 'panelElements' ? "sidebar-navigate__item_active" : ""}`}>
                        <button
                            className={!textPanelActive ? "sidebar-navigate__button_no-active" : "sidebar-navigate__button"}
                            onClick={() => {
                                setActivePanel('panelElements');
                                setActiveClass('panelElements');
                            }}
                            disabled={!textPanelActive}
                        >
                            <img
                                src={!textPanelActive ? elementImageNoActive : elementImage}
                                alt=" Кнопка для открытия панели с элементами."
                                className="sidebar-navigate__icon"
                            />
                            Элементы
                        </button>
                    </li>
                    <li className={`sidebar-navigate__item ${activeClass === 'panelDownloads' ? "sidebar-navigate__item_active" : ""}`}>
                        <button
                            className="sidebar-navigate__button"
                            onClick={() => {
                                setActivePanel('panelDownloads');
                                setActiveClass('panelDownloads');
                            }}
                        >
                            <img src={downloadImage} alt=" Кнопка открытия панели загрузок."
                                 className="sidebar-navigate__icon"/>
                            Загрузки
                        </button>
                    </li>
                </ul>
            </nav>
            <section className="panel-container">
                {renderPanel()}
            </section>
        </aside>
    );
}

export default SidebarEditor;
