import './Promo.css';
import { Link } from 'react-router-dom';
import mac from '../../../images/macBook.svg';
import dipl from '../../../images/before-word-diplomas.svg';
import sert from '../../../images/after-word-sertificates.svg';

export default function Promo() {
	return (
		<section className="promo">
			<h1 className="promo__title">
				Онлайн-редактор
				<img src={mac} alt="Шаблон грамоты" className="promo__image" />
				грамот,
				<img src={dipl} alt="Шаблон грамоты" className="promo__image" />
				дипломов и сертификатов
				<img src={sert} alt="Шаблон грамоты" className="promo__image" />
			</h1>
			<Link className="promo__link" to="/editor">
				<button className="promo__button" type="button">
					Онлайн-редактор
				</button>
			</Link>
		</section>
	);
}
