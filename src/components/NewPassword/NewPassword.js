import authApi from '../../utils/AuthApi';
import Form from '../Form/Form';

function NewPassword({
	popupName,
	title,
	isOpened,
	buttonText,
	onClose,
	formValue,
	setFormValue,
	setIsNewPasswordPopupOpen,
	isLoading,
	setIsLoading,
	setInfoToolTip,
}) {
	async function handleNewPassword() {
		setIsLoading(true);
		return authApi
			.resetPassword(formValue.password, formValue.checkPassword)
			.then((response) => {
				console.log(response);
				onClose();
				setFormValue({
					password: '',
					first: '',
					second: '',
					thirst: '',
					fourth: '',
					code: '',
					checkPassword: '',
				});
				setInfoToolTip({ text: 'Успешно!', status: true, opened: true });
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
			formValue={formValue}
			setFormValue={setFormValue}
			isLoading={isLoading}
			setIsLoading={setIsLoading}
			setInfoToolTip={setInfoToolTip}
			handleSubmittingAForm={() => handleNewPassword()}
		/>
	);
}

export default NewPassword;
