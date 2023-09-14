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
				try {
					if (response.status === 200) {
						return response;
					}
				} catch (e) {
					return e;
				}
			})
			.then((response) => {
				authApi
					.signIn(formValue.password, formValue.email)
					.then((data) => {
						if (data.auth_token) {
							localStorage.setItem('jwt', data.auth_token);
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
							navigate('/frontend/editor', { replace: true });
							return data;
						}
						return console.log(`Ошибка, токена нет! + ${data}`);
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
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
		/>
	);
}

export default RegisterConfirmation;
