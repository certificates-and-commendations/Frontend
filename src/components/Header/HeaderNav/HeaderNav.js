import '../Header.css';

export default function HeaderNav() {
	return (
		<nav>
			<ul className="header__nav">
				<li>
					<a className="header__item" href="1">
						Главная
					</a>
				</li>
				<li>
					<a className="header__item" href="1">
						Шаблоны
					</a>
				</li>
				<li>
					<a className="header__item" href="1">
						Редактор
					</a>
				</li>
			</ul>
		</nav>
	);
}
