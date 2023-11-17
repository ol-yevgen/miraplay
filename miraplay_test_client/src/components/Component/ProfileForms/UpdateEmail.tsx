import { Input, SubmitButton } from 'components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { emailUpdateSchema } from 'schemas/profileSchema'
import { useCreateNickNameMutation, useUpdateEmailsMutation } from 'redux/api/profileApi'
import { errorToast, successToast } from 'utils/toast'
import { useCallback, useEffect } from 'react'
import { useAppSelector } from 'redux/store'
import { useParams } from 'react-router-dom'

interface IUpdateEmailProps {
    currEmail: string
}

export default function UpdateEmail({ currEmail }: IUpdateEmailProps) {
    const { accessToken } = useAppSelector((state) => state.authState)

    const [updateEmails, {
        isError,
        isSuccess,
        isLoading,
        data,
    }] = useUpdateEmailsMutation()

    const {
        register,
        getValues,
        handleSubmit,
        formState: {
            errors,
            isValid,
        },
        reset
    } = useForm(
        {
            defaultValues: {
                oldEmail: currEmail,
            },
            mode: "onChange",
            resolver: yupResolver(emailUpdateSchema)
        }
    )

    useEffect(() => {
        if (isError) {
            errorToast('Something went wrong')
        }
        if (isSuccess) {
            successToast(data?.message as string)
            reset()
        }
    }, [isError, isSuccess])

    const onEmailUpdateHandleSubmit = async () => {
        try {
            const updateEmail = getValues()


            if (updateEmail.newEmail === currEmail) {
                errorToast('This account is register on same email')
            }

            console.log((updateEmail.oldEmail === currEmail) && (updateEmail.newEmail !== currEmail));


            if ((updateEmail.oldEmail === currEmail) && (updateEmail.newEmail !== currEmail)) {

                await updateEmails({ updateEmail, accessToken })

            } else {
                errorToast('Something wrong, check required fields')
            }

        } catch (error) { }
    }

    return (
        <form
            onSubmit={handleSubmit(onEmailUpdateHandleSubmit)}
            className='form__update'
        >
            <h2 className='profile__form-title'>UPDATE EMAIL:</h2>
            <div className='form__update-email'>
                <Input
                    label='enter your old email:'
                    name='oldEmail'
                    register={register}
                    placeholder="your old email"
                    error={errors.oldEmail}
                    required={true}
                />
                <Input
                    label='enter your new email:'
                    name='newEmail'
                    register={register}
                    placeholder="your new email"
                    error={errors.newEmail}
                    required={true}
                />
            </div>
            
            <SubmitButton
                label='UPDATE'
                onHandleSubmit={() => { }}
                isValid={isValid}
                isLoading={isLoading}
            />

        </form>
    )
};
