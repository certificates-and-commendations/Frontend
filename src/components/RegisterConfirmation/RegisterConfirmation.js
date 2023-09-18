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
				console.log('Ответ на Confirm', response)
				console.log('Response.Token', response.Token)
				localStorage.setItem('jwt', response.Token);
				setIsLoggedIn(true);
				console.log('Перевели стейт')
				setFormValue({
					email: '',
					password: '',
					first: '',
					second: '',
					thirst: '',
					fourth: '',
					code: '',
				});
				console.log('Обнулили поля')
				setInfoToolTip({ text: 'Успешно!', status: true, opened: true });
				console.log('вывели Успешно в туллтип')
				onClose();
				console.log('Закрыли')
				navigate('/', { replace: true })
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
