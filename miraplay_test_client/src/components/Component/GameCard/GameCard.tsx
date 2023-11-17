import './gameCard.scss'
import { IGameTypes } from 'types/Types'
import { electronicIcon, wargamingIcon, steamIcon, battleNetIcon, epicIcon } from 'assets/icons/icons'

interface IProps {
    data: IGameTypes
}

export default function GameCard({ data }: IProps) {
    
    return (
        <li className='card'>
            <img
                src={data.gameImage}
                loading="lazy"
                className='card__image'
                width={350}
                height={350}
                alt="card"
            />
            <div className='card__content'>
                <h4 className='card__title'>{data.commonGameName}</h4>
                <p className='card__text'>{data.gameDescription}</p>
            </div>
            <div className='card__top'>
                <div className='card__top-left'>
                    {data.inTop && <p className='card__top-item card__top-first'>TOP</p> }
                    <p className='card__top-item card__top-second'>{data.genre}</p>
                </div>
                <p className='card__top-item card__top-right'>FREE</p>
            </div>
            <ul className='card__launchers'>
                {data.gameLaunchers.map((launcher, index) => {
                    const launcherIcon = () => {
                        switch (launcher) {
                            case 'EA':
                                return electronicIcon
                            case 'Steam':
                                return steamIcon
                            case 'Epic Games':
                                return epicIcon
                            case 'battle.net':
                                return battleNetIcon
                            case 'Wargaming':
                                return wargamingIcon
                        }
                    }

                    return (
                        <li
                            key={data._id + index}
                            className='card__launchers-item'>
                            {launcherIcon()}
                        </li>
                    )
                })}

            </ul>
        </li>
    )
};


