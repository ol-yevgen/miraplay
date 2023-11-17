import useOutsideClickListener from 'hooks/useOutsideClickListener'
import { setActiveFilter } from 'redux/features/activeFilterSlice';
import { filtersList } from '../filtersData';
import { useRef, useState } from 'react';
import { useAppDispatch } from 'redux/store';
import { IFiltersList } from 'types/Types';

import './mobileFilters.scss'

export default function MobileFilters() {
    const userRef = useRef<HTMLUListElement>(null)
    const dispatch = useAppDispatch()

    const { isShow, setIsShow } = useOutsideClickListener(userRef)
    const [filters, setFilters] = useState<IFiltersList[]>(filtersList)

    const changeSelector = (activeFilter: IFiltersList) => () => {
        const remainSelectors = filters.filter(filter => activeFilter.label !== filter.label)
        setFilters([activeFilter, ...remainSelectors])
        setIsShow(!isShow)
        dispatch(setActiveFilter(activeFilter.label))
        setIsShow(false)
    }

    return (
        <div className='selector'>
            <button
                className={`btn btn__selector ${isShow && "btn__selector-active"}`}
                onClick={() => setIsShow(!isShow)}
            >
                {filters[0]?.label}
            </button>
            {isShow &&
                <ul
                    className='selector__list'
                    ref={userRef}
                >

                    {filters.slice(1).map(filter => {
                        return (
                            <li
                                key={filter.id}
                                className='selector__item'
                                onClick={changeSelector(filter)}
                            >
                                <div className='userMenu__link userMenu__profile'>
                                    <span>{filter.label}</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            }
        </div>
    )
};