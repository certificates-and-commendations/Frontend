import { useNavigate } from 'react-router-dom';
import React from 'react';
import Form from '../Form/Form';
import authApi from '../../utils/AuthApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Login({
	popupName,
	title,
	isOpened,
	buttonText,
	onClose,
	setIsRecoveryPopupOpen,
	setIsLoggedIn,
	formValue,
	setFormValue,
	isLoading,
	setIsLoading,
	setInfoToolTip,
}) {
	const navigate = useNavigate();

	const setCurrentUser = React.useContext(CurrentUserContext);

	function goRecovery() {
		onClose();
		setIsRecoveryPopupOpen(true);
	}

	async function handleLoginUser() {
		setIsLoading(true);
		return (
			authApi
				.signIn(formValue.password, formValue.email)
				// eslint-disable-next-line consistent-return
				.then((data) => {
					if (data.auth_token) {
						setInfoToolTip({ text: 'Успешно!', status: true, opened: true });
						localStorage.setItem('jwt', data.auth_token);
						setIsLoggedIn(true);
						setCurrentUser({
							email: formValue.email,
						});
						setFormValue({ email: '', password: '' });
						onClose();
						navigate('/editor', { replace: true });
						return data;
					}
				})
				.catch((err) => {
					setInfoToolTip({ text: err.message, status: false, opened: true });
				})
				.finally(() => {
					setIsLoading(false);
				})
		);
	}

	return (
		<Form
			popupName={popupName}
			title={title}
			isOpened={isOpened}
			buttonText={buttonText}
			onClose={onClose}
			goRecovery={() => goRecovery()}
			handleSubmittingAForm={() => handleLoginUser()}
			formValue={formValue}
			setFormValue={setFormValue}
			isLoading={isLoading}
			setIsLoading={setIsLoading}
		/>
	);
}

export default Login;
