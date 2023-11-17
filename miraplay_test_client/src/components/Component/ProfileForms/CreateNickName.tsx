import { Input, SubmitButton } from 'components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { nicknameCreateSchema } from 'schemas/profileSchema'
import { useCreateNickNameMutation } from 'redux/api/profileApi'
import { errorToast, successToast } from 'utils/toast'
import { useCallback, useEffect } from 'react'
import { useAppSelector } from 'redux/store'
import { useParams } from 'react-router-dom'
import { TUserInfo } from 'types/AuthTypes'

const userStorage = process.env.REACT_APP_LOCAL_USER as string

export default function CreateNickName() {
    const userInfo = JSON.parse(localStorage.getItem(userStorage) as string) as TUserInfo
    const { accessToken } = useAppSelector((state) => state.authState)
    const isNickName = userInfo?.nickName === ""
    const userId = useParams().id as string

    const [createNickName, {
        isError,
        isSuccess,
        isLoading,
    }] = useCreateNickNameMutation()

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
            mode: "onChange",
            resolver: yupResolver(nicknameCreateSchema)
        }
    )

    useEffect(() => {
        if (isError) {
            errorToast('User with same nickname already exist')
        }
        if (isSuccess) {
            successToast('Success')
            reset()
        }
    }, [isError, isSuccess])

    const onNickNameHandleSubmit = async () => {
        try {
            const nickName = getValues()

            await createNickName({ nickName, id: userId, accessToken })
        } catch (error) { }
    }

    return (
        <form
            onSubmit={handleSubmit(onNickNameHandleSubmit)}
            className='form__create'
        >
            <h2 className='profile__form-title'>{`${isNickName ? 'CREATE' : 'UPDATE'} NICKNAME:`} </h2>
            <div className='form__name'>
                <Input
                    label='enter your nickname:'
                    name='nickName'
                    register={register}
                    placeholder="your nickname"
                    error={errors.nickName}
                    required={true}
                />
            </div>
            <div className='form__profile-submit'>
                <div className='form__profile-btn'>
                    <SubmitButton
                        label={isNickName ? 'CREATE' : 'UPDATE'}
                        onHandleSubmit={onNickNameHandleSubmit}
                        isValid={isValid}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </form>
    )
};
