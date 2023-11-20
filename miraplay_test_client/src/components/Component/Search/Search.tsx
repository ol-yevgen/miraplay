import { FormEvent, MouseEvent, lazy, useCallback, useEffect, useRef, useState } from "react"
import useOutsideClickListener from 'hooks/useOutsideClickListener'
import { searchIcon } from 'assets/icons/icons'
import './search.scss'
import { useLazyAllGamesRequestQuery } from "redux/api/gamesApi"
import { IGameTypes } from "types/Types"

const SingleGamePage = lazy(() => import('pages/SingleGamePage/SingleGamePage'))

export default function Search() {
    const [allGamesRequest, { data, isLoading }] = useLazyAllGamesRequestQuery()

    const [filteredData, setFilteredData] = useState<IGameTypes[]>([])
    const [singleGamePage, setSingleGamePage] = useState<IGameTypes[]>()
    const [search, setSearch] = useState<string>('')

    const searchRef = useRef<HTMLFormElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)

    const { isShow, setIsShow } = useOutsideClickListener(searchRef)
    const { isShow: isShowModal, setIsShow: setIsShowModal } = useOutsideClickListener(modalRef)

    const onHandlerSubmit = async (e: MouseEvent) => {
        e.preventDefault()
        setIsShow(!isShow)
        try {
            await allGamesRequest({})
        } catch (error) { }
    }

    const onHandlerSearch = useCallback(() => {
        const filteredData = data?.filter((game) =>
            game.commonGameName.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(filteredData as IGameTypes[])
    }, [data, search])

    const onOpenSinglePage = (label: string) => {
        const singlePageData = data?.filter(game => game.commonGameName === label)

        setSingleGamePage(singlePageData)
        setIsShowModal(true)
        setSearch('')
    }

    useEffect(() => {
        onHandlerSearch()
    }, [search])

    return (
        <div className="search">
            {isShow &&
                <form
                    onSubmit={e => e.preventDefault()}
                    className='search__form'
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
                    <button
                        type="button"
                        className="search__icon"
                    >{searchIcon}</button>
                    {search.length > 1 &&
                        <ul className="search__results">
                            {filteredData.length === 0 &&
                                <h3 className="search__notFound">
                                    Nothing was found
                                </h3>
                            }
                            {filteredData.map(game => {
                                return (
                                    <li
                                        key={game._id}
                                        className="search__results-item"
                                        onClick={() => onOpenSinglePage(game.commonGameName)}
                                    >
                                        {game.commonGameName}
                                    </li>
                                )
                            })}
                        </ul>
                    }
                </form >
            }

            {(isShowModal && singleGamePage) &&
                <SingleGamePage
                    gameData={singleGamePage[0]}
                    isShow={isShowModal}
                    setIsShow={setIsShow}
                    modalRef={modalRef}
                />}

            <button
                className='btn'
                onClick={(e) => onHandlerSubmit(e)}
                aria-label="Search"
            >
                {isShow
                    ? <span className="btn__cancel">+</span>
                    : <>{searchIcon}</>
                }
            </button>
        </div>
    )
};
