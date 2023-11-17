import { Fragment, lazy, useEffect, useState, Suspense } from "react"
import { IActiveFilterState, IGamesListTypes } from "types/Types"
import { useGamesRequestMutation } from 'redux/api/gamesApi'
import { Filters, Spinner } from 'components/index'
import { useAppSelector } from 'redux/store'
import heroImg from '../../assets/hero.webp'
import './gameLibPage.scss'

const GameCard = lazy(() => import('components/Component/GameCard/GameCard'))

export default function GamesLibPage() {
    
    const data = useAppSelector((state) => state.gamesState.gamesReq) as IGamesListTypes
    const { activeFilter, sort } = useAppSelector((state) => state.activeFilterState) as IActiveFilterState

    const [gamesRequest, { isLoading }] = useGamesRequestMutation()

    const [page, setPage] = useState<number>(1)

    const gamesLength = data?.games.length as number
    const allGamesLength = data?.gamesListLength as number

    const reqBody = {
        "page": page,
        "isFreshGamesFirst": sort,
        "genre": activeFilter === "ALL" ? false : activeFilter,
        "gamesToShow": 9,
    }

    useEffect(() => {
        gamesRequest(reqBody)
    }, [page, activeFilter, sort])

    return (
        <>
            <section className="hero">
                <div className="hero__container">
                    <div className="hero__content">
                        <p className="hero__subtitle"> Home - Library of games</p>
                        <h1 className="hero__title">
                            Our library of top games
                        </h1>
                        <p className="hero__text">Choose a game from our library and start playing for
                            <span> free for 30 minutes</span>
                        </p>
                    </div>
                    <img src={heroImg} alt="hero" className="hero__image" width={600} height={500}/>
                </div>
            </section>

            <section className="games">
                <h2>ALL GAMES</h2>
                <Filters />

                <Suspense fallback={<Spinner bg='games__loading' size='100px' color="#3f9c14" />}>
                    <ul className="games__list">
                        {isLoading &&
                            <Spinner bg='games__list-loading' size='100px' color="#3f9c14" />
                        }
                        
                        {data?.games.map(game => {
                            return (
                                <Fragment key={game._id}>
                                    <GameCard data={game} />
                                </Fragment>
                            )
                        })}
                    </ul>
                </Suspense>

                {(gamesLength < allGamesLength) &&
                    <button
                        className='btn btn__more'
                        onClick={() => setPage(page + 1)}
                    >
                        {isLoading && <Spinner bg='btn__loading' size='20px' color="#eaeaea" />}
                        show more
                    </button>}
            </section>
        </>

    )
}