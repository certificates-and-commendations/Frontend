import React from 'react';
import downloadIcon from '../../../../images/imageEditor/download-icon.png';

function TextPanel(props) {
    return (
        <div className="text-panel">
            <div className="text-panel__block-button">
                <button className="text-panel_button">Текст</button>
                <button className="text-panel_button">Мои шрифты</button>
            </div>
            <div className="text-panel__block-result">
                <button className="text-panel__h1">Создать заголовок</button>
                <button className="text-panel__h2">Создать заголовок</button>
                <button className="text-panel__paragraph">Создать заголовок</button>
            </div>
            <div className="text-panel__block-result">
                <button className="text-panel__download-font">
                    <img src={downloadIcon} alt="" className="text-panel__download-icon"/>
                    Создать заголовок
                </button>
            </div>
        </div>
    );
}

export default TextPanel;
