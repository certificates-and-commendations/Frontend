import Form from '../Form/Form';

function Recovery({ popupName, title, isOpened, buttonText, onClose, setIsLoginPopupOpen}) {

    function goLogin() {
        onClose();
        setIsLoginPopupOpen(true);
    }

    return (
        <Form popupName={popupName} title={title} isOpened={isOpened} buttonText={buttonText} onClose={onClose} goLogin={()=> goLogin()}/>
    )
}

export default Recovery;