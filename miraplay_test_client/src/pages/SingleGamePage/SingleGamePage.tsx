import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import './SingleGamePage.scss'
import { Logo } from 'components';
import { windowIcon, appleIcon, triangleIcon } from 'assets/icons/icons';
import { IGameTypes } from 'types/Types';

interface IGameProps {
    gameData: IGameTypes,
    setIsShow: Dispatch<SetStateAction<boolean>>
    modalRef: RefObject<HTMLDivElement>
}

export default function SingleGamePage({ gameData, setIsShow, modalRef }: IGameProps) {

    const [isVideo, setIsVideo] = useState<string>('video')

    useEffect(() => {
        document.body.classList.add('scrollOff');

        return () => {
            document.body.classList.remove('scrollOff');
        };
    }, [])

    return (
        <section className='game'>
            <button
                className='game__close'
                onClick={() => setIsShow(false)}
            >
                +
            </button>
            <div className='container game__container' ref={modalRef}>

                <div className='game__logo'>
                    <Logo />
                </div>

                <h1 className='game__title'>Head - Games library - <span>{gameData.commonGameName}</span></h1>
                <h2 className='game__name'>{gameData.commonGameName}</h2>
                <p className='game__text'> {gameData.gameDescription}</p>
                <div className='game__content'>
                    <div className='game__left'>
                        <h3 className='game__left-title'>CHARACTERISTICS</h3>
                        <div className='game__left-info'>
                            <label className='game__left-item'>Genre:
                                <p>{gameData.gameLaunchers}</p>
                            </label>
                            <label className='game__left-item'>Publisher:
                                <p>{gameData.publisher === '' ? 'No data' : gameData.publisher}</p>
                            </label>
                            <label className='game__left-item'>Exactingness:
                                <div>
                                    <div>
                                        {gameData.exactingness}
                                    </div>
                                </div>
                            </label>
                            <label className='game__left-item'>
                                <h4>Release data:</h4>
                                <p>{gameData.releaseDate === '' ? 'No data' : gameData.releaseDate} </p>
                            </label>
                            <label className='game__left-item'>
                                <h4>Launcher:</h4>
                                <div className='game__left-launchers'>
                                    {gameData.gameLaunchers.map(launcher => {
                                        return (
                                            <p key={launcher}>{launcher}</p>
                                        )
                                    })}
                                </div>
                            </label>
                        </div>
                        <button
                            className='btn btn__active btn__game'
                            type='button'
                        >
                            Play in miraplay cloud
                        </button>
                        <button className='game__download'>
                            {windowIcon}
                            {appleIcon}
                            download client
                        </button>
                        {gameData.inTop && <p className='game__top card__top-item card__top-first'>TOP</p>}
                    </div>
                    <div className='game__right'>
                        <div className='game__video'>
                            {isVideo === 'video'
                                ? <iframe frameBorder="0" allowFullScreen={true} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="Origin Access Premier: Official Reveal Trailer, EA PLAY 2018" width="100%" height="100%" src={gameData.gameVideoUrl} id="widget2" data-gtm-yt-inspected-7="true">
                                </iframe>
                                : <div className='game__pictures'>
                                    {gameData.gameImages.length !== 0
                                        ? <>
                                            </>
                                    : null
                                    }

                                </div>
                            }

                        </div>
                        <div className='game__action'>
                            <button
                                className={`game__action-btn ${isVideo === 'video' ? 'game__action-active' : ''}`}
                                onClick={() => setIsVideo('video')}
                            >
                                <div className='game__action-play'>
                                    <div className='game__action-video'>
                                        {triangleIcon}
                                    </div>
                                </div>
                            </button>
                            <button
                                className={`game__action-btn ${isVideo !== 'video' ? 'game__action-active' : ''}`}
                                onClick={() => setIsVideo('pictures')}
                            >
                                <img src="https://electromotive.com/wp-content/uploads/2015/05/not-available.png" alt="game" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};
