import React, {useState} from 'react';
import downloadIcon from '../../../../images/imageEditor/download-icon.png';

function TextPanel() {

    const [btnClick, setBtnClick] = useState(true);

    const onClickBtnActive = () => {
        setBtnClick(false);
    }

    const onClickBtnNotActive = () => {
        setBtnClick(true);
    }

    return (
        <div className="text-panel">
            <div className="text-panel__block-button">
                <button
                    className={`text-panel__button ${btnClick ? "text-panel__button_active" : ""}`}
                    onClick={onClickBtnNotActive}
                >
                    Текст
                </button>
                <button
                    className={`text-panel__button ${!btnClick ? "text-panel__button_active" : ""}`}
                    onClick={onClickBtnActive}>Мои шрифты
                </button>
            </div>
            {btnClick ?
                <div className="text-panel__block-result">
                    <button className="text-panel__h1">Создать заголовок</button>
                    <button className="text-panel__h2">Создать подзаголовок</button>
                    <button className="text-panel__paragraph">Создать основной текст</button>
                </div>
                :
                <div className="text-panel__block-download">
                    <button className="text-panel__download-font">
                        <img src={downloadIcon} alt="" className="text-panel__download-icon"/>
                        Загрузить шрифт
                    </button>
                </div>
            }
        </div>
    );
}

export default TextPanel;
