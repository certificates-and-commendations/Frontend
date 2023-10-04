import React from 'react';
import searchPanelImg from '../../../../images/imageEditor/search-panel__image.svg';
import templatesImage1 from '../../../../images/imageEditor/templatesImage1.png';
import certificateImage1 from '../../../../images/imageEditor/certificateImage1.png';

function TemplatesPanel(props) {
	return (
		<>
			<div className="search-panel">
				<input
					type="text"
					placeholder="Поиск"
					className="search-panel__search-input"
				/>
				<button className="search-panel__search-button">
					<img
						src={searchPanelImg}
						alt="Кнопка поиска по шаблонам."
						className="search-panel__image"
					/>
				</button>
			</div>
			<div className="templates-image">
				<ul className="templates-image__list">
					<li className="templates-image__item">
						<img
							src={templatesImage1}
							alt="Шаблон 1"
							className="templates-image__img"
						/>
					</li>
					<li className="templates-image__item">
						<img
							src={templatesImage1}
							alt="Шаблон 2"
							className="templates-image__img"
						/>
					</li>
					<li className="templates-image__item">
						<img
							src={certificateImage1}
							alt="Сертификат 1"
							className="templates-image__img"
						/>
					</li>
					<li className="templates-image__item">
						<img
							src={certificateImage1}
							alt="Сертификат 2"
							className="templates-image__img"
						/>
					</li>
					<li className="templates-image__item">
						<img
							src={templatesImage1}
							alt="Шаблон 1"
							className="templates-image__img"
						/>
					</li>
					<li className="templates-image__item">
						<img
							src={templatesImage1}
							alt="Шаблон 2"
							className="templates-image__img"
						/>
					</li>
					<li className="templates-image__item">
						<img
							src={certificateImage1}
							alt="Сертификат 1"
							className="templates-image__img"
						/>
					</li>
					<li className="templates-image__item">
						<img
							src={certificateImage1}
							alt="Сертификат 2"
							className="templates-image__img"
						/>
					</li>
				</ul>
			</div>
		</>
	);
}

export default TemplatesPanel;
