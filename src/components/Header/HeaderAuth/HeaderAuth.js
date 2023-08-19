import '../Header.css';

export default function HeaderAuth() {
	return (
		<div className="header__column">
			<button className="header__item" type="button">
				Войти
			</button>
			<button className="header__item header__item_color_yellow" type="button">
				Зарегестрироваться
			</button>
		</div>
	);
}
