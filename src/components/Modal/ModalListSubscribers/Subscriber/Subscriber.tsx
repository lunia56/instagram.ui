import React from 'react';
import s from './Subscriber.module.scss'
import {Button, Text } from "@chakra-ui/react";

interface ISubscriber {
    id?: string,
    name: string,
    following: boolean
}

const Subscriber: React.FC<ISubscriber> = (
    {
        id,
        name,
        following
    }) => {
    return (
        <div className={s.element}>
            <div className={s.profile}>
                <img className={s.image}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsWpqeievX9w0zWBYJSql3dfwPGpZMqetpwA&usqp=CAU"/>
                <Text ml='10px'>{name}</Text>
            </div>
            <div>
                {following && <Button colorScheme={"facebook"}>Subscribe</Button>}
                <Button ml='10px'>Delete</Button>
            </div>
        </div>
    );
};

export default Subscriber;