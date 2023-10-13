import './Form.css';
import { useState } from 'react';
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
	handleSubmittingAForm,
	formValue,
	setFormValue,
	timeoutButton,
	timer,
	setIsLoading,
	isLoading,
	setInfoToolTip,
}) {
	const [formErrorMessage, setFormErrorMessage] = useState({});
	const [passwordShowed, setPasswordShowed] = useState(false);
	const isFormFieldsValid =
		popupName === 'recovery'
			? !formErrorMessage.email &&
			  !(formValue.email === '' || formValue.email === undefined)
			: popupName === 'registerConfirmation'
			? !(formValue.first === '' || formValue.first === undefined) &&
			  !(formValue.second === '' || formValue.second === undefined) &&
			  !(formValue.thirst === '' || formValue.thirst === undefined) &&
			  !(formValue.fourth === '' || formValue.fourth === undefined)
			: popupName === 'NewPassword'
			? !formErrorMessage.password &&
			  !formErrorMessage.checkPassword &&
			  !(formValue.password === '' || formValue.password === undefined) &&
			  !(
					formValue.checkPassword === '' ||
					formValue.checkPassword === undefined
			  )
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
				[name]: isValid ? '' : 'Некорректный формат электронной почты',
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
			const checkPasswords =
				name === 'password'
					? value === formValue.checkPassword
					: value === formValue.password;
			setFormErrorMessage({
				...formErrorMessage,
				password:
					popupName === 'NewPassword'
						? isValid && checkPasswords
							? ''
							: formErrorMessage.password
						: formErrorMessage.password,
				checkPassword:
					popupName === 'NewPassword'
						? isValid && checkPasswords
							? ''
							: formErrorMessage.checkPassword
						: formErrorMessage.checkPassword,
				[name]:
					popupName === 'NewPassword'
						? isValid
							? checkPasswords
								? ''
								: 'Пароли не совпадают.'
							: 'От 8 до 15 символов, цифры, заглавные буквы, строчные буквы.'
						: isValid
						? ''
						: 'От 6 до 8 символов, цифры, заглавные буквы, строчные буквы.',
			});
		}
	}

	function handleChangeNumber(e) {
		const { name, value } = e.target;
		if (!/[^\d]/g.test(value)) {
			if (e.target.nextSibling) {
				e.target.nextSibling.focus();
			}
		}
		setFormValue({
			...formValue,
			[name]: value.substring(0, 1).replace(/[^\d]/g, ''),
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		handleSubmittingAForm();
	}

	function reloadTimer() {
		setIsLoading(true);
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
			.then(() => {
				setInfoToolTip({ text: 'Успешно!', status: true, opened: true });
				timer();
			})
			.catch((err) => {
				setInfoToolTip({ text: err.message, status: false, opened: true });
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	function showPassword() {
		setPasswordShowed(!passwordShowed);
	}

	return (
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
						? 'Введите email, на который придёт код для восстановления'
						: `Введите код, отправленный на почту ${formValue.email}`}
				</p>
				<form
					className={`popup__form popup__form_${popupName}`}
					name={`popup__form_${popupName}`}
					onSubmit={handleSubmit}
				>
					<fieldset
						className={
							popupName === 'registerConfirmation' ||
							popupName === 'NewPassword'
								? 'popup__fieldset popup__fieldset_invisible'
								: 'popup__fieldset'
						}
					>
						<span className="popup__input-text popup__input-text_email">
							Электронная почта
						</span>
						<span
							className={
								formErrorMessage.email === undefined ||
								formErrorMessage.email === ''
									? 'popup__input-error popup__input-error_invisible'
									: 'popup__input-error'
							}
						>{`${formErrorMessage.email || ''}`}</span>
						<input
							type="email"
							name="email"
							className="popup__input popup__input_email"
							id="email"
							minLength="2"
							maxLength="40"
							required={
								popupName !== 'registerConfirmation' &&
								popupName !== 'NewPassword'
							}
							placeholder="Введите корректный формат электронной почты"
							onChange={handleChangeEmail}
							value={formValue.email}
							disabled={isLoading}
						/>
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
						<span
							className={
								formErrorMessage.password === undefined ||
								formErrorMessage.password === ''
									? 'popup__input-error popup__input-error_invisible'
									: 'popup__input-error'
							}
						>{`${formErrorMessage.password || ''}`}</span>
						<div className="popup__input-relative">
							<input
								type={passwordShowed ? 'text' : 'password'}
								name="password"
								className="popup__input popup__input_password"
								id="password"
								minLength="8"
								maxLength="15"
								placeholder="Пароль"
								required={
									!(
										popupName === 'registerConfirmation' ||
										popupName === 'recovery'
									)
								}
								onChange={handleChangePassword}
								value={formValue.password}
								disabled={isLoading}
							/>
							<button
								type="button"
								className={
									passwordShowed
										? 'popup__input-eye popup__input-eye_showed'
										: 'popup__input-eye'
								}
								onClick={showPassword}
							/>
						</div>
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
							popupName === 'NewPassword'
								? 'popup__fieldset'
								: 'popup__fieldset popup__fieldset_invisible'
						}
					>
						<span className="popup__input-text popup__input-text_password">
							Повторите пароль
						</span>
						<span
							className={
								formErrorMessage.checkPassword === undefined ||
								formErrorMessage.checkPassword === ''
									? 'popup__input-error popup__input-error_invisible'
									: 'popup__input-error'
							}
						>{`${formErrorMessage.checkPassword || ''}`}</span>
						<div className="popup__input-relative">
							<input
								type={passwordShowed ? 'text' : 'password'}
								name="checkPassword"
								className="popup__input popup__input_password"
								id="checkPassword"
								minLength="8"
								maxLength="15"
								placeholder="Повторите пароль"
								required={popupName === 'NewPassword'}
								onChange={handleChangePassword}
								value={formValue.checkPassword}
								disabled={isLoading}
							/>
							<button
								type="button"
								className={
									passwordShowed
										? 'popup__input-eye popup__input-eye_showed'
										: 'popup__input-eye'
								}
								onClick={showPassword}
							/>
						</div>
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
							type="text"
							name="first"
							className="popup__input popup__input_number"
							id="first"
							minLength="1"
							maxLength="1"
							required={popupName === 'registerConfirmation'}
							onChange={handleChangeNumber}
							value={formValue.first}
							disabled={isLoading}
						/>
						<input
							type="text"
							name="second"
							className="popup__input popup__input_number"
							id="second"
							minLength="1"
							maxLength="1"
							required={popupName === 'registerConfirmation'}
							onChange={handleChangeNumber}
							value={formValue.second}
							disabled={isLoading}
						/>
						<input
							type="text"
							name="thirst"
							className="popup__input popup__input_number"
							id="thirst"
							minLength="1"
							maxLength="1"
							required={popupName === 'registerConfirmation'}
							onChange={handleChangeNumber}
							value={formValue.thirst}
							disabled={isLoading}
						/>
						<input
							type="text"
							name="fourth"
							className="popup__input popup__input_number"
							id="fourth"
							minLength="1"
							maxLength="1"
							required={popupName === 'registerConfirmation'}
							onChange={handleChangeNumber}
							value={formValue.fourth}
							disabled={isLoading}
						/>
					</fieldset>
					<button
						type="submit"
						className={
							!isFormFieldsValid || isLoading
								? 'popup__submit-button popup__submit-button_disabled'
								: 'popup__submit-button'
						}
						disabled={!isFormFieldsValid || isLoading}
					>
						{buttonText}
					</button>
					<button
						type="button"
						onClick={reloadTimer}
						className={
							popupName === 'registerConfirmation'
								? timeoutButton
									? 'popup__timeout-button popup__timeout-button_active'
									: isLoading
									? 'popup__timeout-button popup__timeout-button_disabled'
									: 'popup__timeout-button'
								: 'popup__timeout-button popup__timeout-button_invisible'
						}
						disabled={timeoutButton || isLoading}
					>
						{timeoutButton || 'Отправить повторно'}
					</button>
				</form>
			</div>
		</section>
	);
}

export default Form;
