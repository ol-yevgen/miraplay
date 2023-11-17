import { useRegistrationUserMutation, } from 'redux/api/authApi'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { FormEvent, memo, useCallback, useEffect } from "react"
import { registrationSchema } from 'schemas/authSchema'
import { successToast, errorToast } from 'utils/toast'
import { Input, SubmitButton } from 'components';
import { useNavigate } from 'react-router-dom';

export default function RegistrationPage() {
    const navigate = useNavigate()

    const [registrationUser, {
        isError,
        isSuccess,
        isLoading,
        data,
        error 
    }] = useRegistrationUserMutation()

    const {
        register,
        getValues,
        formState: {
            errors,
            isValid,
        },
        reset
    } = useForm(
        {
            defaultValues: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            },
            mode: "onChange",
            resolver: yupResolver(registrationSchema)
        }
    )

    const onRegistrationHandleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            await registrationUser(getValues())
        } catch (error) { }
    }, [getValues, registrationUser])

    useEffect(() => {
        if (isError) {
            errorToast("User with same email already exist")
        }
        if (isSuccess) {
            successToast(data?.message as string)
            navigate('/')
            reset()
        }
    }, [isError, isSuccess])

    return (
        <section className='auth'>
            <h3 className="auth__title">Experience new sensations</h3>
            <p className="auth__text">
                Register to play your favorite games at max settings
            </p>

            <form className='auth__form' autoComplete='off'>

                <div className='form__name'>
                    <Input
                        label='enter your first name:'
                        name='firstName'
                        register={register}
                        placeholder="your first name"
                        error={errors.firstName}
                        required={true}
                    />
                    <Input
                        label='enter your last name:'
                        name='lastName'
                        register={register}
                        placeholder="your last name"
                        error={errors.lastName}
                        required={true}
                    />
                </div>

                <Input
                    label='enter your email:'
                    name='email'
                    register={register}
                    placeholder="youremail@miraplay.com"
                    error={errors.email}
                    required={true}
                />
                <Input
                    label='enter password:'
                    name='password'
                    register={register}
                    placeholder="your password"
                    error={errors.password}
                    required={true}
                />

                <SubmitButton
                    label='registration'
                    onHandleSubmit={onRegistrationHandleSubmit}
                    isValid={isValid}
                    isLoading={isLoading}
                />
            </form>
        </section>
    );
};

