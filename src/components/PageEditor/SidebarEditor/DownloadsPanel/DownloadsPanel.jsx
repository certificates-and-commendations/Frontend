import React from 'react';

function DownloadsPanel() {
    return (
        <div className="elements-panel">
            <div className="elements-panel__block-download">
                <p className="elements-panel__paragraph">
                    Вы можете загрузить собственный шаблон в формате JPEG/PNG: 600x850 px
                </p>
                <button className="elements-panel__btn-download">Загрузить свой шаблон</button>
            </div>
        </div>
    );
}

export default DownloadsPanel;
