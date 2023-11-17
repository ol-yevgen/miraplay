interface IButton {
    label: string,
    onHandleEvent: any,
    // isLoading: boolean,
    active: string,
}

export default function FilterButton({ label, onHandleEvent, active}: IButton) {

    return (
        <button
            className={`btn btn__filter ${active === label ? 'btn__active' : ''}`}
            type='submit'
            onClick={() => onHandleEvent(label)}
        >
            {label}
        </button>
    )
};
