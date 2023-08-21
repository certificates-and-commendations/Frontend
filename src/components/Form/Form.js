import './Form.css';
import { useState } from 'react';
import { EMAIL_CHECKER } from '../../constants/constants';
import x from '../../images/x.svg';

function Form({ popupName, title, isOpened, buttonText, onClose, goRecovery, goLogin}) {

    const [formValue, setFormValue] = useState({});
    const [formErrorMessage, setFormErrorMessage] = useState({});
    const isFormFieldsValid = (popupName === "recovery") ? (!formErrorMessage.email && !(formValue.email === '' || (formValue.email === undefined))) : (!formErrorMessage.email && !formErrorMessage.password && !(formValue.email === '' || (formValue.email === undefined)) && !(formValue.password === '' || (formValue.password === undefined)));

    function handleChangeEmail(e) {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });

        if (value.length > 0) {
            const isValid = EMAIL_CHECKER.test(value);
            setFormErrorMessage({
                ...formErrorMessage,
                [name]: isValid ? '' : 'Некорректный формат email'
            });
        }
    };

    function handleChangePassword(e) {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });

        setFormErrorMessage({
            ...formErrorMessage,
            [name]: e.target.validationMessage
        })
    };


    function handleSubmit (e) {
        e.preventDefault();
        // Вся информация из инпутов хранится в переменной "formValue", будем её передавать уже в запросы
        // Узнаем пути у бэкендеров, затем продолжим
    }

    return (
        <section className={isOpened ? `popup popup_${popupName} popup_opened` : `popup popup_${popupName}`}>
            <div className="popup__container">
                <div className='popup__navigation'>
                    <h1 className='popup__title'>
                        {title}
                    </h1>
                    <button className='popup__close-button' onClick={onClose}><img src={x} alt='Закрыть' /></button>
                </div>
                <p className={(popupName === "recovery" ? "popup__text" : "popup__text popup__text_invisible")}>Введите email, связанный с вашим аккаунтом, и мы отправим инструкцию для восстановления пароля.</p>
                <form className={`popup__form popup__form_${popupName}`} name={`popup__form_${popupName}`} onSubmit={handleSubmit}>
                    <fieldset className="popup__fieldset">
                        <span className='popup__input-text popup__input-text_email'>Email</span>
                        <input type="email" name="email" className="popup__input popup__input_email"
                            id="email" minLength="2" maxLength="40" required placeholder='Введите корректный email' onChange={handleChangeEmail} />
                        <span className={((formErrorMessage.email === undefined) || (formErrorMessage.email === '')) ? 'popup__input-error popup__input-error_invisible' : 'popup__input-error'}>{`*${formErrorMessage.email || ''}`}</span>
                    </fieldset>
                    <fieldset className={(popupName === "recovery") ? "popup__fieldeset popup__fieldset_invisible" : "popup__fieldset"}>
                        <span className='popup__input-text popup__input-text_password'>Пароль</span>
                        <input type="password" name="password" className="popup__input popup__input_password"
                            id="password" minLength="8" maxLength="50" required placeholder='Пароль' onChange={handleChangePassword} />
                        <span className={((formErrorMessage.password === undefined) || (formErrorMessage.password === '')) ? 'popup__input-error popup__input-error_invisible' : 'popup__input-error'}>{`*${formErrorMessage.password || ''}`}</span>
                        <button type='button' onClick={goRecovery} className={popupName === "login" ? "popup__clue" : "popup__clue popup__clue_invisible"}>Забыли пароль?</button>
                    </fieldset>
                    <button type="submit" className={isFormFieldsValid ? 'popup__submit-button' : 'popup__submit-button popup__submit-button_disabled'} disabled={!isFormFieldsValid}>{buttonText}</button>
                    <button type="button" onClick={goLogin} className={(popupName === "recovery" ? "popup__back-button" : "popup__back-button popup__back-button_invisible")}>Назад к странице «Вход»</button>
                </form>
            </div>
        </section>
    );
}

export default Form;