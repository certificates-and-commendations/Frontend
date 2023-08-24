/* eslint-disable no-console */
/* eslint-disable consistent-return */
import Form from '../Form/Form';
import authApi from '../../utils/AuthApi';

function Register({ popupName, title, isOpened, buttonText, onClose }) {

	async function handleRegistrationUser(formValue, setFormValue) {
		return authApi.signUp(formValue.password, formValue.email)
			.then((response) => {
				try {
					if (response.status === 200) {
						return response.json();
					}
				} catch (e) {
					return (e)
				}
			})
			.catch((err) => {
				console.log(err);
			})
	}


	return (
		<Form
			popupName={popupName}
			title={title}
			isOpened={isOpened}
			buttonText={buttonText}
			onClose={onClose}
			handleSubmittingAForm={(formValue, setFormValue) => handleRegistrationUser(formValue, setFormValue)}
		/>
	);
}

export default Register;
