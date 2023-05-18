import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import style from "./GlobalButton.module.css"
type ButtonVariant = 'default' | 'white' | 'transparent' | 'black'

interface PropsType {
  callback?: () => void
  children: ReactNode
  className?: string | React.CSSProperties
  type: ButtonHTMLAttributes<HTMLButtonElement>['type']
  disabled?: boolean
  variant?: ButtonVariant
}

type variantClassNameType = { [Key in ButtonVariant]: Key }
const variantClassName: variantClassNameType = {
  black: 'black',
  default: 'default',
  transparent: 'transparent',
  white: 'white',
}

export const GlobalButton: FC<PropsType> = ({
                                              children,
                                              callback,
                                              type = 'button',
                                              disabled,
                                              variant = 'default',
                                              className,
                                              ...restProps
                                            }) => {
  return (
    <button
      style={{fontSize: "16px", marginTop: "60px", marginBottom: "60px", fontWeight: "600"}}
      onClick={callback}
      type={type}
      disabled={disabled}
      {...restProps}
      className={`${style.mainBtn} ${variantClassName[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
