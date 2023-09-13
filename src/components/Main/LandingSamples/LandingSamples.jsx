import './LandingSamples.css';
import { Link, useLocation } from 'react-router-dom';
import arr from '../../../images/arrow.svg';
import ex1 from '../../../images/example1.svg';
import ex2 from '../../../images/example2.svg';
import ex3 from '../../../images/example3.svg';

export default function Landingsamples() {
    const location = useLocation();
    const isSamplesPage = location.pathname === '/samples';
  
    return (
      <section className="landing-samples">
        <h2 className="landing-samples__title">
          Наши шаблоны для всех типов документов
        </h2>
        <h3 className="landing-samples__description">
          Выберите макет, заполните индивидуальные данные, отправьте его по почте
          или сохраните
        </h3>
        <div className="landing-samples__container">
          <img
            src={ex1}
            alt="Шаблон грамоты"
            className="landing-samples__image"
          />
          <img
            src={ex2}
            alt="Шаблон грамоты"
            className="landing-samples__image"
          />
          <img
            src={ex3}
            alt="Шаблон грамоты"
            className="landing-samples__image"
          />
        </div>
        <Link className="landing-samples__link" to="/samples">
          <button
            type="button"
            className={`landing-samples__button ${
              isSamplesPage ? 'landing-samples__button_active' : ''
            }`}
          >
            Шаблоны
            <img src={arr} alt="Стрелка" className="landing-samples__item" />
          </button>
        </Link>
      </section>
    );
  }