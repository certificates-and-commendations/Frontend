import React from 'react';
import './PropertiesPanel.css';

function TextFunctions({
                           textPanelActive
                       }) {
    return (
        <section className="functions">
            <ul className="functions_content">
                <li className="functions__button functions__button-nav">
                    <button
                        className="functions__button_back"
                        type="button"
                        aria-label="Кнопка для перехода назад"
                    />
                    <button
                        className="functions__button_forward"
                        type="button"
                        aria-label="Кнопка для перехода вперед"
                    />
                </li>

                {textPanelActive &&
                    <li className="functions__button functions__button-nav1">
                        <button
                            className="functions__button_color"
                            type="button"
                            aria-label="Кнопка для удаления"
                        />
                        <select className="functions__list">
                            <option value="s1">Wix Madefor Display</option>
                            <option value="s2">Arial</option>
                            <option value="s3">Times New Roman</option>
                            <option value="s4">Roboto</option>
                        </select>
                        <div className="functions-quantity-block">
                            <input className="functions-quantity-num" type="number" value="1"/>
                            <div className="functions-quantity-block_arrow">
                                <button className="functions-quantity-arrow-minus" type="button"
                                        aria-label="Кнопка увеличить"/>
                                <button className="functions-quantity-arrow-plus" type="button"
                                        aria-label="Кнопка уменьшить"/>
                            </div>
                        </div>
                        <button
                            className="functions__button_align-center"
                            type="button"
                            aria-label="Кнопка для удаления"
                        />
                        <button
                            className="functions__button_bold"
                            type="button"
                            aria-label="Кнопка для удаления"
                        />
                        <button
                            className="functions__button_italic"
                            type="button"
                            aria-label="Кнопка для удаления"
                        />
                        <button
                            className="functions__button_underline"
                            type="button"
                            aria-label="Кнопка для удаления"
                        />
                        <button
                            className="functions__button_strikethrough"
                            type="button"
                            aria-label="Кнопка для удаления"
                        />
                    </li>
                }

                <li className="functions__button">
                    {textPanelActive &&
                        <button
                            className="functions__button_check"
                            type="button"
                            aria-label="Кнопка для проверки"
                        />
                    }
                    <button
                        className="functions__button_delete"
                        type="button"
                        aria-label="Кнопка для удаления"
                    />
                </li>
            </ul>
        </section>
    );
}

export default TextFunctions;
