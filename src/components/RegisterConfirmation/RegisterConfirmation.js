import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import Form from '../Form/Form';
import authApi from '../../utils/AuthApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function RegisterConfirmation({
	popupName,
	title,
	isOpened,
	buttonText,
	onClose,
	setIsLoggedIn,
	formValue,
	setFormValue,
	setTimeoutButton,
	timeoutButton,
	timer,
	isLoading,
	setIsLoading,
	setInfoToolTip,
	setIsNewPasswordPopupOpen,
	itsResetPassword,
}) {
	const navigate = useNavigate();

	const setCurrentUser = useContext(CurrentUserContext);

	useEffect(() => {
		setFormValue({
			...formValue,
			code:
				formValue.first +
				formValue.second +
				formValue.thirst +
				formValue.fourth,
		});
	}, [formValue.first, formValue.second, formValue.thirst, formValue.fourth]);

	async function handleConfirmRegistrarion() {
		setIsLoading(true);
		return authApi
			.registerConfirm(formValue.email, formValue.code)
			.then((response) => {
				if (itsResetPassword) {
					onClose();
					setIsNewPasswordPopupOpen(true);
				} else {
					localStorage.setItem('jwt', response.Token);
					setIsLoggedIn(true);
					setCurrentUser({
						email: formValue.email,
					});
					setInfoToolTip({ text: 'Успешно!', status: true, opened: true });
					onClose();
					navigate('/', { replace: true });
				}
				setFormValue({
					email: '',
					password: '',
					first: '',
					second: '',
					thirst: '',
					fourth: '',
					code: '',
					checkPassword: '',
				});
			})
			.catch((err) => {
				setInfoToolTip({ text: err.message, status: false, opened: true });
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	return (
		<Form
			popupName={popupName}
			title={title}
			isOpened={isOpened}
			buttonText={buttonText}
			onClose={onClose}
			handleSubmittingAForm={() => handleConfirmRegistrarion()}
			formValue={formValue}
			setFormValue={setFormValue}
			setTimeoutButton={setTimeoutButton}
			timeoutButton={timeoutButton}
			timer={() => timer()}
			setIsLoggedIn={setIsLoggedIn}
			isLoading={isLoading}
			setIsLoading={setIsLoading}
			setInfoToolTip={setInfoToolTip}
		/>
	);
}

export default RegisterConfirmation;
