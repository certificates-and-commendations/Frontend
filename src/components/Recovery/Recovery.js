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
}) {
	function goLogin() {
		onClose();
		setIsLoginPopupOpen(true);
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
		/>
	);
}

export default Recovery;
