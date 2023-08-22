import Form from '../Form/Form';

function Register({ popupName, title, isOpened, buttonText, onClose }) {

    return (
        <Form popupName={popupName} title={title} isOpened={isOpened} buttonText={buttonText} onClose={onClose}/>
    )
}

export default Register;