import './Opportunities.css';
import cloud from '../../../images/download-cloud.svg';
import edit from '../../../images/edit.svg';
import list from '../../../images/file-list.svg';
import file from '../../../images/file.svg';
import stamp from '../../../images/stamp.svg';

export default function Opportunities() {
	return (
		<section className="opportunities">
			<h2 className="section-title">Возможности</h2>
			<div className="cards">
				<div className="cards__item">
					<img src={edit} alt="Редактирование" className="cards__image" />
					<h3 className="cards__title">Удобный редактор текста</h3>
					<p className="cards__description">
						Создать грамоту, диплом или сертификат в нашем редакторе так же
						просто, как и написать текст в Word.
					</p>
				</div>
				<div className="cards__item">
					<img src={file} alt="Файл" className="cards__image" />
					<h3 className="cards__title">Много шаблонов</h3>
					<p className="cards__description">
						Вы можете скачать готовый файл, а также отправить на печать, в
						смартфон или Telegram, по электронной почте.
					</p>
				</div>
				<div className="cards__item">
					<img
						src={cloud}
						alt="Облако и стрелка для скачивания"
						className="cards__image"
					/>
					<h3 className="cards__title">Скачивание и отправка</h3>
					<p className="cards__description">
						Вы можете скачать готовый файл, а также отправить на печать, в
						смартфон или Telegram, по электронной почте.
					</p>
				</div>
				<div className="cards__item">
					<img src={stamp} alt="Печать" className="cards__image" />
					<h3 className="cards__title">Подписи и печати</h3>
					<p className="cards__description">
						Вы можете вставить свою подпись или печать организации.
					</p>
				</div>
				<div className="cards__item">
					<img src={list} alt="Список" className="cards__image" />
					<h3 className="cards__title">Создание по списку</h3>
					<p className="cards__description">
						Создавайте сразу несколько файлов с общим шаблоном, текстом с
						разными персональными данными.
					</p>
				</div>
			</div>
		</section>
	);
}
