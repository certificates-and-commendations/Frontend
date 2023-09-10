import React from 'react';

function ElementsPanel() {
    return (
        <div className="elements-panel">
            <div className="elements-panel__block-download">
                <p className="elements-panel__paragraph">
                    Вы можете загрузить подпись, печать в формате JPEG/PNG
                    &nbsp;И&nbsp;таблицу&nbsp;Exel&nbsp;(с ФИО если нужно оформить несколько грамот)
                </p>
                <button className="elements-panel__btn-download">Загрузить файл</button>
            </div>
        </div>
    );
}

export default ElementsPanel;
