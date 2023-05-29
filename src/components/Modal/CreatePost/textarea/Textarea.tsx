import React, { ChangeEvent, FC, ForwardedRef, forwardRef } from 'react'

import { FieldValues } from 'react-hook-form'

import styles from './Textarea.module.css'

type TextareaType = {
  value: string
  label: string
  textAreaClassName: any
  error: string | FieldValues | any
  ref: ForwardedRef<any>
  defaultValue: string | undefined
  rows: number
  cols: number
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  maxLength?: number
  disabled?: boolean
}

// eslint-disable-next-line react/display-name
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
          style={{
            width: "100%",
            resize: "none",
            border: "1px solid #718096",
            outline:"none"
          }}
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

        <div style={{height: "6px"}}>
          <span className={styles.error}>{error ? error : ''}</span>
        </div>
      </div>
    )
  }
)
