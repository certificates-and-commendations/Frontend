import { useNavigate } from 'react-router-dom';
import authApi from '../../utils/AuthApi';
import Form from '../Form/Form';

function Register({
	popupName,
	title,
	isOpened,
	buttonText,
	onClose,
	setIsLoggedIn,
	formValue,
	setFormValue,
	setTimeoutButton,
	setIsRegisterConfirmationPopupOpen,
	setIsRegisterPopupOpen,
	timer,
}) {
	const navigate = useNavigate();

	async function handleRegistrationUser() {
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
				setIsRegisterPopupOpen(false);
				setIsRegisterConfirmationPopupOpen(true);
				timer();
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
			handleSubmittingAForm={() => handleRegistrationUser()}
			formValue={formValue}
			setFormValue={setFormValue}
		/>
	);
}

export default Register;
