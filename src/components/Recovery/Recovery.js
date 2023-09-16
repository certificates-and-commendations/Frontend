import Form from '../Form/Form';

function Recovery({
	popupName,
	title,
	isOpened,
	buttonText,
	onClose,
	setIsLoginPopupOpen,
	formValue,
	setFormValue,
	isLoading,
	setIsLoading,
}) {
	function goLogin() {
		onClose();
		setIsLoginPopupOpen(true);
	}

	function handleRecovery() {
		// Пока что нет запроса на восстановление, но скоро будет (ждём бэкенд)
	}

	return (
		<Form
			popupName={popupName}
			title={title}
			isOpened={isOpened}
			buttonText={buttonText}
			onClose={onClose}
			goLogin={() => goLogin()}
			formValue={formValue}
			setFormValue={setFormValue}
			handleSubmittingAForm={() => handleRecovery()}
		/>
	);
}

export default Recovery;
