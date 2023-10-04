import React, {useState} from 'react';
import downloadIcon from '../../../../images/imageEditor/download-icon.png';
import trashFont from '../../../../images/IconsFunctionsText/text-panel__trash-font.svg';

function TextPanel({
                       onTextClick,
                       activeTextIndex
                   }) {

    const [btnClick, setBtnClick] = useState(true);
    const [fontFiles, setFontFiles] = useState([]);

    const onClickBtnActive = () => {
        setBtnClick(false);
    }

    const onClickBtnNotActive = () => {
        setBtnClick(true);
    }

    const handleFontFileChange = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            const newFontFiles = [...fontFiles];

            // Проверяем, нет ли уже файла с таким именем в списке
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                const isDuplicate = newFontFiles.some((existingFile) => existingFile.name === file.name);

                if (!isDuplicate) {
                    newFontFiles.push(file);
                } else {
                    console.log(`Файл с именем ${file.name} уже существует.`);
                    // Здесь можно вывести сообщение об ошибке или выполнить другие действия
                }
            }

            setFontFiles(newFontFiles);
        }
    };



    const handleRemoveFont = (index) => {
        const updatedFontFiles = [...fontFiles];
        updatedFontFiles.splice(index, 1);
        setFontFiles(updatedFontFiles);
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
                    <button
                        className="text-panel__h1"
                        onClick={onTextClick}
                    >
                        Создать заголовок
                    </button>
                    <button className="text-panel__h2">Создать подзаголовок</button>
                    <button className="text-panel__paragraph">Создать основной текст</button>
                </div>
                :
                <div className="text-panel__block-download">
                    <label
                        className="text-panel__download-font"
                        htmlFor="fontUpload"
                    >
                        <img src={downloadIcon} alt="" className="text-panel__download-icon" />
                        Загрузить шрифт
                        <input
                            type="file"
                            id="fontUpload"
                            accept=".ttf"
                            style={{ display: 'none' }}
                            onChange={handleFontFileChange}
                            multiple
                        />
                    </label>
                    {fontFiles.length > 0 && (
                        <div className="text-panel__font-block">
                            {fontFiles.map((file, index) => (
                                <div className="text-panel__wrapper" key={index}>
                                    <p className="text-panel__paragraph-font">{file.name}</p>
                                    <img
                                        src={trashFont}
                                        alt="Кнопка удаления шрифта."
                                        className="text-panel__trash-font"
                                        onClick={() => handleRemoveFont(index)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            }
        </div>
    );
}

export default TextPanel;
