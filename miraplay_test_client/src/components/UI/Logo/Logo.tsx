import { Link } from "react-router-dom"
import './logo.scss'

export default function Logo() {
    return (
        <div className='logo'>
            <Link to='/' className='logo__link'>
                <div className='logo__icon'>
                </div>
                <div className='logo__icon-inner'></div>

                <div className='logo__text'>
                    <span className='logo__name'>miraplay</span>
                    <p className='logo__info'>Cloud Gaming</p>
                </div>
            </Link>
        </div>
    )
};
