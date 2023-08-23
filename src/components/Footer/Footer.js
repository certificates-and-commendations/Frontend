import Logo from "../Logo/Logo";
import "./Footer.css";
import Telegram from "../../images/telegram.svg"

export default function Footer() {
  return(
    <footer className="footer">
      <div className="footer__column">
        <Logo />
        <div className="footer__info">
          <p className="footer__text footer__text_margin_bottom">© 2023 IT сообщество</p>
          <p className="footer__text">Напишите нам</p>
          <p className="footer__text">Обратная связь и предложения</p>
        </div>
      </div>
      <a className="footer__link" href="p" target="_blank">
        <img className="footer__link-img" src={Telegram} alt="Логотип телеграмма" />
      </a>
    </footer>
  )
}