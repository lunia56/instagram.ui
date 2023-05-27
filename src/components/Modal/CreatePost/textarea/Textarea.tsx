import React, { ChangeEvent, FC, ForwardedRef, forwardRef } from 'react'

import { FieldValues } from 'react-hook-form'

import styles from './Textarea.module.css'

type TextareaType = {
  value: string
  label: string
  textAreaClassName: string
  error: string | FieldValues | any
  ref: ForwardedRef<any>
  defaultValue: string | undefined
  rows: number
  cols: number
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  maxLength?: number
  disabled?: boolean
}

export const Textarea: FC<Partial<TextareaType>> = forwardRef(
  (
    {
      value,
      label,
      onChange,
      error,
      rows = 3,
      cols = 30,
      textAreaClassName,
      defaultValue,
      maxLength,
      disabled = false,
      ...restProps
    },
    ref: ForwardedRef<any>
  ) => {
    const textareaStyles = `${styles.textarea} ${textAreaClassName} 
    ${error ? styles.textareaError : ''} ${disabled ? styles.textareaDisabled : ''}`

    return (
      <div>
        {label && <label className={styles.label}>{label}</label>}

        <textarea
          className={textareaStyles}
          onChange={onChange}
          value={value}
          rows={rows}
          cols={cols}
          defaultValue={defaultValue}
          disabled={disabled}
          {...restProps}
          ref={ref}
          maxLength={maxLength}
        />

        <div className={'h-6'}>
          <span className={styles.error}>{error ? error : ''}</span>
        </div>
      </div>
    )
  }
)
