import { eyeHideIcon, eyeShowIcon } from 'assets/icons/icons'
import { FieldError } from 'react-hook-form'
import { MouseEvent, memo, useState } from 'react'
import './input.scss'

interface IInputTypes {
    label: string,
    name: string,
    register: any,
    placeholder: string,
    error?: FieldError | undefined,
    required: boolean
}

function Input({ label, name, register, error, placeholder, required }: IInputTypes) {

    const [show, setShow] = useState<boolean>(false)
    const showPassword = show ? 'text' : 'password'
    const showPasswordIcon = show && name === 'password'
        ? eyeShowIcon 
        : eyeHideIcon

    const showHidePassword = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        setShow(!show)
    }

    return (
        <label className="form__label">
            {label}
            <input
                {...register(`${name}`)}
                autoComplete={`new-${name}`}
                placeholder={placeholder}
                className={`form__input ${error ? 'form__input-error' : ''}`}
                type={name === 'password' ? showPassword : name}
                id={name}
                required={required}
            />
            {
                name === 'password'
                    ? <button
                        className="form__input-hide"
                        onClick={(e) => showHidePassword(e)}
                    >
                        {showPasswordIcon}
                    </button>
                    : null
            }
            {error && <span className="form__error ">{error.message || "Error!"}</span>}
        </label>
    )
};

export default memo(Input)