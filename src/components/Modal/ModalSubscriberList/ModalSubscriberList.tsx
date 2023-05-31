import React, { useState} from 'react';
import s from './ModalSubscriberList.module.scss'
import MyButton from '@/components/common/MyButton/MyButton';
import Modal from '@/components/Modal/Modal';

interface IModalSendEmail {
  email?: string;
  modalOnClick: () => void;
}
const subscriberList = [
    {id: 1,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFBa3G11OUBYADP7ouSBgwiiRzSYorF4dfg&usqp=CAU",
    name: 'Alex',
    subscribe: true,
},
    {id: 1,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFBa3G11OUBYADP7ouSBgwiiRzSYorF4dfg&usqp=CAU",
    name: 'John',
    subscribe: true,
},
    {id: 1,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFBa3G11OUBYADP7ouSBgwiiRzSYorF4dfg&usqp=CAU",
    name: 'Scot',
    subscribe: true,
},
    {id: 1,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFBa3G11OUBYADP7ouSBgwiiRzSYorF4dfg&usqp=CAU",
    name: 'Antony',
    subscribe: true,
},
    {id: 1,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFBa3G11OUBYADP7ouSBgwiiRzSYorF4dfg&usqp=CAU",
    name: 'Innoketiy',
    subscribe: true,
}]
const ModalSubscriberList: React.FC<IModalSendEmail> =  ({email,modalOnClick}) =>{
const setTrue = () => {
  modalOnClick()
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
    >
        {subscriberList.map(el=><div>
            <p>{el.name}</p>
            

        </div>)}

    </Modal>
  </>
);
};

export default ModalSubscriberList;