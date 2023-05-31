import React from 'react'
import s from './ModalListSubscribers.module.scss'
import MyButton from '@/components/common/MyButton/MyButton'
import Modal from '@/components/Modal/Modal'
import {useLogOutMutation} from '@/services/API-hooks'
import {Subscribers} from "@/components/Modal/ModalListSubscribers/Subscribers";
import Subscriber from "@/components/Modal/ModalListSubscribers/Subscriber/Subscriber";

interface IModalLogout {
    modalOnClick: () => void;
}

const ModalListSubscribers: React.FC<IModalLogout> = ({modalOnClick}) => {

    const {mutate: logout} = useLogOutMutation()

    const setTrue = () => {
        modalOnClick()
        logout()
    };
    const setFalse = () => {
        modalOnClick()
    };


    return (
        <>
            <Modal
                backgroundOnClick={setFalse}
                modalOnClick={setFalse}
                title='Subscribers'
                size={s.mainSize}
            >
                <div >
                    {Subscribers.map(el => <Subscriber
                        name={el.name}
                        following={el.following}/> )}

                </div>
            </Modal>
        </>
    );
};

export default ModalListSubscribers;