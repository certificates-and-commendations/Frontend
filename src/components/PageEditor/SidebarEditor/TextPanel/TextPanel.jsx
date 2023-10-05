import React, {useState} from 'react';
import downloadIcon from '../../../../images/imageEditor/download-icon.png';
import trashFont from '../../../../images/IconsFunctionsText/text-panel__trash-font.svg';
import authApi from '../../../../utils/AuthApi';
import FontFaceStyles from "./FontFaceStyles/FontFaceStyles";

function TextPanel({
                       onTextClick,
                       activeTextIndex,
                       setFontResult,
                       fontResult
                   }) {
    const [btnClick, setBtnClick] = useState(true);
    const [fontFiles, setFontFiles] = useState([]);

    const onClickBtnActive = () => {
        setBtnClick(false);
    };

    const onClickBtnNotActive = () => {
        setBtnClick(true);
    };

    const handleFontPost = (formData) => {
        return authApi
            .handleFontFamily(formData)
            .then((res) => {
                console.log(res)
                setFontResult((prevFontResult) => [...prevFontResult, res]);
            })
            .catch((err) => console.log(err));
    };


    const handleFontFileChange = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            const newFontFiles = [...fontFiles];

            // Проверяем, нет ли уже файла с таким именем в списке
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                const isDuplicate = newFontFiles.some(
                    (existingFile) => existingFile.name === file.name
                );
                if (!isDuplicate) {
                    newFontFiles.push(file);
                    handleFontPost(file)
                        .catch((err) => console.log(err))
                } else {
                    console.log(`Файл с именем ${file.name} уже существует.`);
                }
            }

            setFontFiles(newFontFiles);
        }
    };


    const handleRemoveFont = (index) => {
        const updatedFontFiles = [...fontResult];
        updatedFontFiles.splice(index, 1);
        setFontResult(updatedFontFiles);
    };

    return (
        <div className="text-panel">
            <div className="text-panel__block-button">
                <button
                    className={`text-panel__button ${
                        btnClick ? 'text-panel__button_active' : ''
                    }`}
                    onClick={onClickBtnNotActive}
                >
                    Текст
                </button>
                <button
                    className={`text-panel__button ${
                        !btnClick ? 'text-panel__button_active' : ''
                    }`}
                    onClick={onClickBtnActive}
                >
                    Мои шрифты
                </button>
            </div>
            {btnClick ? (
                <div className="text-panel__block-result">
                    <button className="text-panel__h1" onClick={onTextClick}>
                        Создать заголовок
                    </button>
                    <button className="text-panel__h2">Создать подзаголовок</button>
                    <button className="text-panel__paragraph">
                        Создать основной текст
                    </button>
                </div>
            ) : (
                <div className="text-panel__block-download">
                    <label className="text-panel__download-font" htmlFor="fontUpload">
                        <img
                            src={downloadIcon}
                            alt=""
                            className="text-panel__download-icon"
                        />
                        Загрузить шрифт
                        <input
                            type="file"
                            id="fontUpload"
                            name="font_file"
                            accept=".ttf"
                            style={{display: 'none'}}
                            onChange={handleFontFileChange}
                            multiple
                        />
                    </label>
                    {fontFiles.length > 0 && (
                        <div className="text-panel__font-block">
                            {fontResult.map((file, index) => (
                                <div className="text-panel__wrapper" key={file.id}>
                                    <p
                                        className="text-panel__paragraph-font"
                                        style={{
                                            fontFamily: `${file.font}, Arial`,
                                        }}
                                    >
                                        {file.font}
                                    </p>
                                    <img
                                        src={trashFont}
                                        alt="Кнопка удаления шрифта."
                                        className="text-panel__trash-font"
                                        onClick={() => handleRemoveFont(index)}
                                    />
                                    <FontFaceStyles fontResult={fontResult}/>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default TextPanel;
