import { setActiveFilter, setSort } from 'redux/features/activeFilterSlice';
import useOutsideClickListener from 'hooks/useOutsideClickListener';
import { triangleDownIcon, triangleUpIcon } from 'assets/icons/icons'
import { useAppDispatch, useAppSelector } from 'redux/store';
import { IActiveFilterState, IFiltersList } from 'types/Types';
import { FilterButton, MobileFilters } from 'components/index';
import { useCallback, useRef, useState } from 'react';
import { filtersList } from '../filtersData';
import './filters.scss'
import { useResize } from 'hooks/useResize';

export default function Filters() {

    const { activeFilter: currentFilter, sort } = useAppSelector((state) => state.activeFilterState) as IActiveFilterState
    const dispatch = useAppDispatch()
    const sortRef = useRef<HTMLDivElement>(null)
    const { isShow, setIsShow } = useOutsideClickListener(sortRef)
    const [filters, setFilters] = useState<IFiltersList[]>(filtersList)
    const windowWidth = useResize()

    const onChangeSortSelect = () => {
        dispatch(setSort())
        setIsShow(!isShow)
    }

    const onHandleEvent = useCallback((activeFilter: string) => {

        dispatch(setActiveFilter(activeFilter));

    }, [currentFilter])

    return (
        <div className='filters'>
            {windowWidth.isScreenLg
                ? <div className='filters__list'>
                    {filters.map(filter => {
                        return (
                            <FilterButton
                                key={filter.id}
                                label={filter.label}
                                onHandleEvent={onHandleEvent}
                                active={currentFilter}
                            />
                        )
                    })}

                </div>
                : < MobileFilters />
            }

            <div className='filters__sort'>
                <div
                    className='filters__sort'
                    ref={sortRef}
                >
                    <span>Sort:</span>
                    <div
                        className='filters__sort-item'
                        onClick={() => setIsShow(!isShow)}
                    >
                        <p>{sort ? "new first" : 'old first'}</p>
                        {isShow ? <>{triangleUpIcon}</> : <>{triangleDownIcon}</>}
                    </div>

                    {isShow &&
                        <div
                            className='filters__sort-item filters__sort-select'
                            onClick={onChangeSortSelect}
                        >
                            <p>{sort ? "old first" : 'new first'}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};
