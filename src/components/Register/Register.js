import { useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import authApi from '../../utils/AuthApi';

function Register({
	popupName,
	title,
	isOpened,
	buttonText,
	onClose,
	setIsLoggedIn,
}) {
	const navigate = useNavigate();

	async function handleRegistrationUser(formValue, setFormValue) {
		return authApi
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
				authApi
					.signIn(formValue.password, formValue.email)
					.then((data) => {
						if (data.auth_token) {
							localStorage.setItem('jwt', data.auth_token);
							setIsLoggedIn(true);
							setFormValue({ email: '', password: '' });
							navigate('/editor', { replace: true });
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
			});
	}

	return (
		<Form
			popupName={popupName}
			title={title}
			isOpened={isOpened}
			buttonText={buttonText}
			onClose={onClose}
			handleSubmittingAForm={(formValue, setFormValue) =>
				handleRegistrationUser(formValue, setFormValue)
			}
		/>
	);
}

export default Register;
