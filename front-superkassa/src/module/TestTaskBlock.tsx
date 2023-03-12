import React, { FC, MutableRefObject, useEffect, useRef, useState, memo } from 'react';
import cl from './TestTaskBlock.module.css';
import FormSelect from '../components/formSelect/FormSelect';
import { useAppDispatch } from '../hooks/redux';
import { addCounty } from '../store/reducers/codeCountrySlice';
import { URL_ws } from '../constants/api';
import { numberExistenceCheck } from '../helpers/numberExistenceCheck';
import { setPhone } from '../store/reducers/phoneNumberSlice';
import { IMessage } from '../types/types';
import FormContactList from '../components/formContact/FormContactList';

const TestTaskBlock: FC = memo(() => {

    const socket = useRef() as MutableRefObject<WebSocket>;
    const [messages, setMessages] = useState<IMessage[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {

        socket.current = new WebSocket(URL_ws);

        socket.current.onopen = () => {
            const message = { event: 'connection' };
            socket.current.send(JSON.stringify(message));
        }

        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            switch (message.type) {
                case 'config':
                    dispatch(addCounty(JSON.parse(message.data)));
                    break;
                case 'message':
                    setMessages(prev => [...prev, ...message.data]);
                    break;
            }
        }

        socket.current.onclose = () => {
            console.log('Socket закрыт');
        }

        socket.current.onerror = () => {
            console.log('Socket произошла ошибка');
        }
    }, [])

    const handleSubmit = (code: string, phone: string) => {
        if (numberExistenceCheck(messages, code, phone)) {
            alert('Такой номер уже существует');
            return null;
        }
        const message = {
            event: 'message',
            phone,
            code
        }
        socket.current.send(JSON.stringify(message));
        dispatch(setPhone(''));
    }

    return (
        <div className={cl['block']}>
            <div className={[cl['block__container'], '_container'].join(' ')}>
                <FormSelect handleSubmit={handleSubmit} />
                <FormContactList messages={messages ? messages : null} title="Список контактов" />
            </div>
        </div>
    );
})

export default TestTaskBlock;