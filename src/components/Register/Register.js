import authApi from '../../utils/AuthApi';
import Form from '../Form/Form';

function Register({
	popupName,
	title,
	isOpened,
	buttonText,
	onClose,
	formValue,
	setFormValue,
	setIsRegisterConfirmationPopupOpen,
	setIsRegisterPopupOpen,
	timer,
	isLoading,
	setIsLoading,
}) {
	async function handleRegistrationUser() {
		setIsLoading(true);
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
			handleSubmittingAForm={() => handleRegistrationUser()}
			formValue={formValue}
			setFormValue={setFormValue}
			isLoading={isLoading}
			setIsLoading={setIsLoading}
		/>
	);
}

export default Register;
