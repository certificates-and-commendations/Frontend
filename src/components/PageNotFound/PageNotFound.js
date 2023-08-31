import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image404 from '../../images/404.png';
import './PageNotFound.css';

function PageNotFound({ setIsPageNotFoundOpen }) {
	useEffect(() => {
		setIsPageNotFoundOpen(true);
	});

	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	};

	return (
		<section className="notFound">
			<img src={image404} alt="Страница не найдена" />
			<button className="notFound__title" type="button" onClick={goBack}>
				Вернуться назад
			</button>
		</section>
	);
}

export default PageNotFound;
