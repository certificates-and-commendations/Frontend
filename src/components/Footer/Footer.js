import './Footer.css';
import Logo from '../Logo/Logo';
import Telegram from '../../images/telegram.svg';
import Twitter from '../../images/twitter.svg';
import Facebook from '../../images/facebook.svg';

export default function Footer() {
	return (
	  <footer className="footer">
		<div className="footer__container">
		  <div className="footer__column">
			<Logo />
			<div className="footer__info">
			  <p className="footer__text">&#169;2023</p>
			  <p className="footer__text">IT сообщество</p>
			</div>
		  </div>
		  <ul className="footer__list">
			<li className="footer__item">
			  <a className="footer__link" href="p" target="_blank">
				<img
				  className="footer__link-img"
				  src={Telegram}
				  alt="Логотип телеграма"
				/>
				<span className="footer__link-text">Telegram</span>
			  </a>
			</li>
			<li className="footer__item">
			  <a className="footer__link" href="p" target="_blank">
				<img
				  className="footer__link-img"
				  src={Twitter}
				  alt="Логотип телеграма"
				/>
				<span className="footer__link-text">Twitter</span>
			  </a>
			</li>
			<li className="footer__item">
			  <a className="footer__link" href="p" target="_blank">
				<img
				  className="footer__link-img"
				  src={Facebook}
				  alt="Логотип телеграма"
				/>
				<span className="footer__link-text">Facebook</span>
			  </a>
			</li>
		  </ul>
		</div>
	  </footer>
	);
  }
