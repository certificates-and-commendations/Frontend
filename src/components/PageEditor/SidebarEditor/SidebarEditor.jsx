import React from 'react';
import templateImage from '../../../images/imageEditor/templateImage.svg'
import textImage from '../../../images/imageEditor/textImage.svg'
import elementImage from '../../../images/imageEditor/elementImage.svg'
import downloadImage from '../../../images/imageEditor/downloadImage.svg'

function SidebarEditor(props) {
    return (
        <aside className="sidebar">
            <nav className="sidebar-navigate">
                <ul className="sidebar-navigate__items">
                    <li className="sidebar-navigate__item sidebar-navigate__item_active">
                        <button className="sidebar-navigate__button">
                            <img src={templateImage} alt="" className="sidebar-navigate__icon"/>
                            Шаблоны
                        </button>
                    </li>
                    <li className="sidebar-navigate__item">
                        <button className="sidebar-navigate__button">
                            <img src={textImage} alt="" className="sidebar-navigate__icon"/>
                            Текст
                        </button>
                    </li>
                    <li className="sidebar-navigate__item">
                        <button className="sidebar-navigate__button">
                            <img src={elementImage} alt="" className="sidebar-navigate__icon"/>
                            Элементы
                        </button>
                    </li>
                    <li className="sidebar-navigate__item">
                        <button className="sidebar-navigate__button">
                            <img src={downloadImage} alt="" className="sidebar-navigate__icon"/>
                            Загрузки
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default SidebarEditor;
