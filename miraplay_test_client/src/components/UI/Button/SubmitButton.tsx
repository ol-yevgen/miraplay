import { Spinner } from 'components/index';

interface ISubmitButton {
    label: string,
    onHandleSubmit: any,
    isValid: boolean,
    isLoading: boolean,
}

export default function SubmitButton({ label, onHandleSubmit, isValid, isLoading }: ISubmitButton) {
    
    return (
        <button
            className='btn btn__submit btn__active'
            type='submit'
            onClick={(e) => onHandleSubmit(e)}
            disabled={!isValid}
        >
            {isLoading && <Spinner bg='btn__loading' size='30' color="#eaeaea" />}
            {label}
        </button>
    )
};
