import React, { FC, InputHTMLAttributes, memo } from 'react';
import cl from './InputPhone.module.css';

interface IInputPhoneProps extends InputHTMLAttributes<HTMLInputElement> {
    validation: boolean;
}

const InputPhone: FC<IInputPhoneProps> = memo(({ validation, ...props }) => {

    const rootClass = [cl['input-phone']];

    !validation && rootClass.push(cl['not-valid']);

    return (
        <div className={cl['input-block']}>
            <input className={rootClass.join(' ')} {...props} />
            <label className={cl['label']}>Phone number</label>
            {!validation &&
                <label className={cl['message']}>Only numbers!!!</label>
            }
        </div>
    )
});

export default InputPhone;