import Form from '../Form/Form';

function Login({ popupName, title, isOpened, buttonText, onClose, setIsRecoveryPopupOpen }) {

    function goRecovery() {
        onClose();
        setIsRecoveryPopupOpen(true);
    }

    return (
        <Form popupName={popupName} title={title} isOpened={isOpened} buttonText={buttonText} onClose={onClose} goRecovery={()=> goRecovery()}/>
    )
}

export default Login;