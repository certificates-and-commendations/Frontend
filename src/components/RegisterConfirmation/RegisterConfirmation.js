import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Form from '../Form/Form';
import authApi from '../../utils/AuthApi';

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
}) {
	const navigate = useNavigate();

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
				localStorage.setItem('jwt', response.Token);
				setIsLoggedIn(true);
				setFormValue({
					email: '',
					password: '',
					first: '',
					second: '',
					thirst: '',
					fourth: '',
					code: '',
				});
				setInfoToolTip({ text: 'Успешно!', status: true, opened: true });
				onClose();
				// authApi
				// 	.signIn(formValue.password, formValue.email)
				// 	.then((data) => {
				// 		if (data.auth_token) {
				// 			setInfoToolTip({ text: 'Успешно!', status: true, opened: true });
				// 			localStorage.setItem('jwt', data.auth_token);
				// 			setIsLoggedIn(true);
				// 			setFormValue({
				// 				email: '',
				// 				password: '',
				// 				first: '',
				// 				second: '',
				// 				thirst: '',
				// 				fourth: '',
				// 				code: '',
				// 			});
				// 			navigate('/editor', { replace: true });
				// 			return data;
				// 		}
				// 		return console.log(`Ошибка, токена нет! + ${data}`);
				// 	})
				// 	.catch((err) => {});
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
			handleConfirmRegistrarion={() => handleConfirmRegistrarion()}
			isLoading={isLoading}
			setIsLoading={setIsLoading}
			setInfoToolTip={setInfoToolTip}
		/>
	);
}

export default RegisterConfirmation;
