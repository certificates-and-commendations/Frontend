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
		/>
	);
}

export default NewPassword;
