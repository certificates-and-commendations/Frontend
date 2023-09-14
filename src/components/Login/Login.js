import { useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import authApi from '../../utils/AuthApi';

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
}) {
	const navigate = useNavigate();

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
					if (data.token) {
						localStorage.setItem('jwt', data.token);
						setIsLoggedIn(true);
						setFormValue({ email: '', password: '' });
						navigate('/editor', { replace: true });
						return data;
					}
				})
				.catch((err) => {
					console.log(err);
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
