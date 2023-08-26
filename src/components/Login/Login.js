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
}) {
	const navigate = useNavigate();

	function goRecovery() {
		onClose();
		setIsRecoveryPopupOpen(true);
	}

	async function handleLoginUser(formValue, setFormValue) {
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
			handleSubmittingAForm={(formValue, setFormValue) =>
				handleLoginUser(formValue, setFormValue)
			}
		/>
	);
}

export default Login;
