import { FormEvent, useRef, useState } from "react"
import useOutsideClickListener from 'hooks/useOutsideClickListener'
import { searchIcon } from 'assets/icons/icons'
import './search.scss'

export default function Search() {
    const [search, setSearch] = useState<string>('')
    const searchRef = useRef<HTMLFormElement>(null)
    const { isShow, setIsShow } = useOutsideClickListener(searchRef)

    const onHandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setSearch('')
            console.log(search);
        } catch (error) { }
    }

    return (
        <>
            <form
                onSubmit={e => onHandlerSubmit(e)}
                className={`search ${isShow ? 'active' : ''}`}
                ref={searchRef}
            >
                <input
                    type='text'
                    placeholder='Search'
                    id="search"
                    required
                    autoComplete="off"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="search__input"
                />
                <div className="search__icon">{searchIcon}</div>
            </form >
            <button
                className='btn'
                onClick={() => setIsShow(!isShow)}
                aria-label="Search"
            >
                {isShow
                    ? <span className="btn__cancel">+</span>
                    : <>{searchIcon}</>
                }
            </button>
        </>
    )
};
