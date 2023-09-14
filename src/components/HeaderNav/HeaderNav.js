import '../Header/Header.css';
import { Link, useLocation } from 'react-router-dom';

export default function HeaderNav() {
	const location = useLocation();
	const isEditorPage = location.pathname === '/editor';
	const isMainPage = location.pathname === '/';

	return (
		<nav>
			<ul className="header__nav">
				<li>
					<Link className="header__link" to="/frontend">
						<p
							className={`header__item ${
								isMainPage ? 'header__item_active' : ''
							}`}
						>
							Главная
						</p>
					</Link>
				</li>
				<li>
					<Link className="header__link" to="/frontend">
						<p className="header__item">Шаблоны</p>
					</Link>
				</li>
				<li>
					<Link className="header__link" to="/frontend/editor">
						<p
							className={`header__item ${
								isEditorPage ? 'header__item_active' : ''
							}`}
						>
							Редактор
						</p>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
