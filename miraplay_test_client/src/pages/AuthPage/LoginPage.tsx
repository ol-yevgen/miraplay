import { FormEvent, memo, useCallback, useEffect } from "react"
import {useLoginUserMutation,} from 'redux/api/authApi'
import { successToast, errorToast } from 'utils/toast'
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from 'schemas/authSchema'
import { Input, SubmitButton} from 'components';
import { useForm } from "react-hook-form";

function LoginPage() {

    const [loginUser, {
        isError,
        isSuccess,
        isLoading,
        data,
    }] = useLoginUserMutation()

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
            mode: "onChange",
            resolver: yupResolver(loginSchema)
        }
    )

    useEffect(() => {
        if (isError) {
            errorToast('Check all fields or user is not found')
        }
        if (isSuccess) {
            successToast(data?.message as string)
            reset()
        }
    }, [isError, isSuccess])

    const onLoginHandleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            await loginUser(getValues())
        } catch (error) { }
    }, [getValues, loginUser])

    return (
        <section className='auth'>
            <h3 className="auth__title">Experience new sensations</h3>
            <p className="auth__text">
                Register to play your favorite games at max settings
            </p>

            <form className='auth__form auth__form-login' autoComplete='off'>
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
                    label='login'
                    onHandleSubmit={onLoginHandleSubmit}
                    isValid={isValid}
                    isLoading={isLoading}
                />
            </form>
        </section>
    );
}

export default memo(LoginPage)