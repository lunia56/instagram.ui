import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './MyButton.module.scss'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
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
    ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
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
      onClick={() => callback}
      {...restProps}
    />
  )
}

export default MyButton