import React, { FC, useEffect, useState, memo } from 'react';
import cl from './FormSelect.module.css';
import { SelectCountry } from '../UI/select/SelectCountry';
import InputPhone from '../UI/input/InputPhone';
import { ButtonSubmit } from '../UI/button/ButtonSubmit';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setPhone } from '../../store/reducers/phoneNumberSlice';

interface IFormSelectProps {
    handleSubmit: (code: string, phone: string) => void;
}

const FormSelect: FC<IFormSelectProps> = memo(({ handleSubmit }) => {
    const dispatch = useAppDispatch();
    const phone = useAppSelector(state => state.phoneNumber.phone);
    const code = useAppSelector(state => state.phoneNumber.code);
    const [valid, setValid] = useState(true);

    function handleClick(e: React.FormEvent) {
        e.preventDefault();
        valid &&
            handleSubmit(code, phone);
    }

    useEffect(() => {
        (/[^0-9]/gi).test(phone)
            ? setValid(false)
            : setValid(true);
    }, [phone])

    return (
        <div className={cl['form']}>
            <form className={cl['form__container']} onSubmit={handleClick}>
                <SelectCountry />
                <InputPhone
                    required
                    validation={valid}
                    value={phone}
                    onChange={e => dispatch(setPhone(e.target.value))}
                    type="text"
                    placeholder='Phone number'
                    maxLength={10}
                    minLength={3}
                />
                <ButtonSubmit type='submit' />
            </form>
        </div>
    );
});

export default FormSelect;