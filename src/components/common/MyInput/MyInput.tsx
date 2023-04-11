import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './MyButton.module.scss'
import {Input, Text} from '@chakra-ui/react';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement>

type MyInputPropsType = DefaultButtonPropsType & {
  callback?: () => void
  value: string
}

const MyInput: React.FC<MyInputPropsType> = ({value, callback}) => {

  return (<>
      <Text mb="8px">Value: {value}</Text>
      <Input
        value={value}
        onChange={handleChange}
        variant="flushed"
        placeholder="Here is a sample placeholder"
        size="sm"
      />
    </>
  )
}

export default MyInput