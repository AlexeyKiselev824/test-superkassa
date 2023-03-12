import React, { FC, memo } from 'react';
import { IMessage } from '../../types/types';
import cl from './FormContactList.module.css';

interface IFormContactListProps {
    messages: IMessage[] | null;
    title: string;
}

const FormContactList: FC<IFormContactListProps> = memo(({ messages, title }) => {

    return (
        <div className={cl['form']}>
            <div className={cl['form__container']}>
                <h1 className={cl['form__title']}>{title}</h1>
                {messages &&
                    messages.map(item =>
                        <ul className={cl['form__list']} key={item.id}>
                            <li className={cl['form__list__item']}>+{item.code}{item.phone}</li>
                        </ul>
                    )
                }
            </div>
        </div>
    );
});

export default FormContactList;
