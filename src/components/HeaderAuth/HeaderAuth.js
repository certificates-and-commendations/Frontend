import '../Header/Header.css';

export default function HeaderAuth({
	setIsLoginPopupOpen,
	setIsRegisterPopupOpen,
}) {
	return (
		<div className="header__column">
			<button
				onClick={() => setIsLoginPopupOpen(true)}
				className="header__item"
				type="button"
			>
				Войти
			</button>
			<button
				onClick={() => setIsRegisterPopupOpen(true)}
				className="header__item header__item_color_yellow"
				type="button"
			>
				Зарегестрироваться
			</button>
		</div>
	);
}
