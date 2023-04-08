import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './MyButton.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement>

type MyButtonPropsType = DefaultButtonPropsType & {
  callback: () => void
  variant?: string
}

const MyButton: React.FC<MyButtonPropsType> = (
  {
    variant,
    className,
    disabled,
    callback,
    ...restProps
  }
) => {
  const finalClassName = s.button
    + (disabled ? ' ' + s.disabled : '')
    + (variant === 'empty' ? ' ' + s.empty : '')
    + (variant === 'secondary' ? ' ' + s.secondary : '')
    + (variant === 'text' ? ' ' + s.text : '')
    + (variant ? ' ' + className : '')
  return (
    <button
      disabled={disabled}
      className={finalClassName}
      onClick={() => callback()}
      {...restProps}
    />
  )
}

export default MyButton