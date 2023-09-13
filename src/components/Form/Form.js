import './Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EMAIL_CHECKER, PASSWORD_CHECKER } from '../../constants/constants';
import x from '../../images/x.svg';
import authApi from '../../utils/AuthApi';

function Form({
	popupName,
	title,
	isOpened,
	buttonText,
	onClose,
	goRecovery,
	goLogin,
	handleSubmittingAForm,
	formValue,
	setFormValue,
	timeoutButton,
	timer,
}) {
	const navigate = useNavigate();
	const [formErrorMessage, setFormErrorMessage] = useState({});
	const isFormFieldsValid =
		popupName === 'recovery'
			? !formErrorMessage.email &&
			  !(formValue.email === '' || formValue.email === undefined)
			: popupName === 'registerConfirmation'
			? !(formValue.first === '' || formValue.first === undefined) &&
			  !(formValue.second === '' || formValue.second === undefined) &&
			  !(formValue.thirst === '' || formValue.thirst === undefined) &&
			  !(formValue.fourth === '' || formValue.fourth === undefined)
			: !formErrorMessage.email &&
			  !formErrorMessage.password &&
			  !(formValue.email === '' || formValue.email === undefined) &&
			  !(formValue.password === '' || formValue.password === undefined);

	function handleChangeEmail(e) {
		const { name, value } = e.target;
		setFormValue({
			...formValue,
			[name]: value,
		});

		if (value.length > 0) {
			const isValid = EMAIL_CHECKER.test(value);
			setFormErrorMessage({
				...formErrorMessage,
				[name]: isValid ? '' : 'Некорректный формат email',
			});
		}
	}

	function handleChangePassword(e) {
		const { name, value } = e.target;
		setFormValue({
			...formValue,
			[name]: value,
		});

		if (value.length > 0) {
			const isValid = PASSWORD_CHECKER.test(value);
			setFormErrorMessage({
				...formErrorMessage,
				[name]: isValid
					? ''
					: 'Пароль должен содержать одно число, один спецсимвол, одну букву в нижнем и верхнем регистре, а также он должен быть не менее 8 символов',
			});
		}
	}

	function handleChangeNumber(e) {
		const { name, value } = e.target;
		setFormValue({
			...formValue,
			[name]: String(value).substring(0, 1),
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		// На восстановление пароля нету метода на сервере, поэтому функции на отправку формы Recovery нет
		handleSubmittingAForm().catch((err) => {
			console.log(err);
		});
	}

	function reloadTimer() {
		authApi
			.signUp(formValue.password, formValue.email)
			.then((response) => {
				try {
					if (response.status === 200) {
						return response;
					}
				} catch (e) {
					return e;
				}
			})
			.then((response) => {
				timer();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function closeByOverlay() {
		onClose();
	}

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<section
			className={
				isOpened
					? `popup popup_${popupName} popup_opened`
					: `popup popup_${popupName}`
			}
		>
			<div className="popup__container">
				<div className="popup__navigation">
					<h1 className="popup__title">{title}</h1>
					<button className="popup__close-button" onClick={onClose}>
						<img src={x} alt="Закрыть" />
					</button>
				</div>
				<p
					className={
						popupName === 'recovery' || popupName === 'registerConfirmation'
							? popupName === 'registerConfirmation'
								? 'popup__text popup__text_confirmation'
								: 'popup__text'
							: 'popup__text popup__text_invisible'
					}
				>
					{popupName === 'recovery'
						? 'Введите email, связанный с вашим аккаунтом, и мы отправим инструкцию для восстановления пароля.'
						: `Введите код, отправленный на почту ${formValue.email}`}
				</p>
				<form
					className={`popup__form popup__form_${popupName}`}
					name={`popup__form_${popupName}`}
					onSubmit={handleSubmit}
				>
					<fieldset
						className={
							popupName === 'registerConfirmation'
								? 'popup__fieldset popup__fieldset_invisible'
								: 'popup__fieldset'
						}
					>
						<span className="popup__input-text popup__input-text_email">
							Email
						</span>
						<input
							type="email"
							name="email"
							className="popup__input popup__input_email"
							id="email"
							minLength="2"
							maxLength="40"
							required={popupName !== 'registerConfirmation'}
							placeholder="Введите корректный email"
							onChange={handleChangeEmail}
							value={formValue.email}
						/>
						<span
							className={
								formErrorMessage.email === undefined ||
								formErrorMessage.email === ''
									? 'popup__input-error popup__input-error_invisible'
									: 'popup__input-error'
							}
						>{`*${formErrorMessage.email || ''}`}</span>
					</fieldset>
					<fieldset
						className={
							popupName === 'recovery' || popupName === 'registerConfirmation'
								? 'popup__fieldset popup__fieldset_invisible'
								: 'popup__fieldset'
						}
					>
						<span className="popup__input-text popup__input-text_password">
							Пароль
						</span>
						<input
							type="password"
							name="password"
							className="popup__input popup__input_password"
							id="password"
							minLength="8"
							maxLength="50"
							placeholder="Пароль"
							required={
								!(
									popupName === 'registerConfirmation' ||
									popupName === 'recovery'
								)
							}
							onChange={handleChangePassword}
							value={formValue.password}
						/>
						<span
							className={
								formErrorMessage.password === undefined ||
								formErrorMessage.password === ''
									? 'popup__input-error popup__input-error_invisible'
									: 'popup__input-error'
							}
						>{`*${formErrorMessage.password || ''}`}</span>
						<button
							type="button"
							onClick={goRecovery}
							className={
								popupName === 'login'
									? 'popup__clue'
									: 'popup__clue popup__clue_invisible'
							}
						>
							Забыли пароль?
						</button>
					</fieldset>
					<fieldset
						className={
							popupName === 'registerConfirmation'
								? 'popup__fieldset popup__fieldset-confirmation'
								: 'popup__fieldset popup__fieldset_invisible'
						}
					>
						{/* <span className="popup__input-text popup__input-text_password">
							Пароль
						</span> */}
						<input
							type="number"
							name="first"
							className="popup__input popup__input_number"
							id="first"
							minLength="1"
							maxLength="1"
							required={!(popupName === 'register' || popupName === 'login')}
							onChange={handleChangeNumber}
							value={formValue.first}
						/>
						<input
							type="number"
							name="second"
							className="popup__input popup__input_number"
							id="second"
							minLength="1"
							maxLength="1"
							required={!(popupName === 'register' || popupName === 'login')}
							onChange={handleChangeNumber}
							value={formValue.second}
						/>
						<input
							type="number"
							name="thirst"
							className="popup__input popup__input_number"
							id="thirst"
							minLength="1"
							maxLength="1"
							required={!(popupName === 'register' || popupName === 'login')}
							onChange={handleChangeNumber}
							value={formValue.thirst}
						/>
						<input
							type="number"
							name="fourth"
							className="popup__input popup__input_number"
							id="fourth"
							minLength="1"
							maxLength="1"
							required={!(popupName === 'register' || popupName === 'login')}
							onChange={handleChangeNumber}
							value={formValue.fourth}
						/>
					</fieldset>
					<button
						type="submit"
						className={
							isFormFieldsValid
								? 'popup__submit-button'
								: 'popup__submit-button popup__submit-button_disabled'
						}
						disabled={!isFormFieldsValid}
					>
						{buttonText}
					</button>
					<button
						type="button"
						onClick={goLogin}
						className={
							popupName === 'recovery'
								? 'popup__back-button'
								: 'popup__back-button popup__back-button_invisible'
						}
					>
						Назад к странице «Вход»
					</button>
					<button
						type="button"
						onClick={reloadTimer}
						className={
							popupName === 'registerConfirmation'
								? timeoutButton
									? 'popup__timeout-button popup__timeout-button_active'
									: 'popup__timeout-button'
								: 'popup__timeout-button popup__timeout-button_invisible'
						}
						disabled={timeoutButton}
					>
						{timeoutButton || 'Отправить повторно'}
					</button>
				</form>
			</div>
		</section>
	);
}

export default Form;
