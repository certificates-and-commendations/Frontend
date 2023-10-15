import Form from '../Form/Form';
import authApi from '../../utils/AuthApi';

function Recovery({
	popupName,
	title,
	isOpened,
	buttonText,
	onClose,
	setIsRegisterConfirmationPopupOpen,
	formValue,
	setFormValue,
	isLoading,
	setIsLoading,
	setInfoToolTip,
	setItsResetPassword,
}) {
	async function handleRecovery() {
		setIsLoading(true);
		return authApi
			.sendResetCode(formValue.email)
			.then((response) => {
				setItsResetPassword(true);
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
				setIsRegisterConfirmationPopupOpen(true);
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
			handleSubmittingAForm={() => handleRecovery()}
		/>
	);
}

export default Recovery;
