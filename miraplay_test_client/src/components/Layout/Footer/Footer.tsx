// import { FaYoutube, FaFacebookF, FaInstagram, FaPhoneAlt, FaMapMarkerAlt, FaWindows } from 'react-icons/fa';
// import { IoMail } from "react-icons/io5";
import { phoneIcon, mailIcon, mapIcon, windowIcon, youtubeIcon, facebookIcon, instagramIcon } from 'assets/icons/icons'
import { Logo } from 'components/index'

import Cards from 'assets/cards.webp'
import Platon from 'assets/platon.webp'
import { Link } from 'react-router-dom'
import './footer.scss'

export default function Footer() {
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='footer__wrapper'>
                    <ul className='footer__first footer__list'>
                        <li className='footer__first-logo'><Logo /></li>
                        <li className='footer__first-payment'>
                            <img src={Cards} alt='card' className='footer__first-pay' width={45} height={35}/>
                            <img src={Platon} alt='pay' className='footer__first-pay' width={45} height={35} />
                        </li>
                        <li className='footer__first-social'>
                            <Link
                                to='https://www.youtube.com/@MIRAPLAYofficial' target='_blank'
                                className='social'
                                aria-label="Subscribe on youtube"
                            >
                                {youtubeIcon}
                            </Link>
                            <Link
                                to='https://www.youtube.com/@MIRAPLAYofficial' target='_blank'
                                className='social'
                                aria-label="Subscribe on facebook"
                            >
                                {facebookIcon}
                            </Link>
                            <Link
                                to='https://www.instagram.com/miraplaycloudgame/' target='_blank'
                                className='social'
                                aria-label="Subscribe on instagram"
                            >
                                {instagramIcon}
                            </Link>
                        </li>
                        <li className='footer__item'>
                            <Link to='#'>User agreement</Link>
                        </li>
                        <li className='footer__item'>
                            <p>ТОВ Дока Проект ЄДРПОУ 41204288</p>
                        </li>
                        <li className='footer__item footer__copyrighting'>
                            <p>Copyright © 2023 Miraplay</p>
                        </li>
                    </ul>

                    <div className='footer__second'>
                        <h4 className='footer__list-title'>Categories</h4>
                        <ul className='footer__second footer__list'>
                            <li className='footer__list-link'>
                                <Link to='#' >
                                    Games
                                </Link>
                            </li>
                            <li className='footer__list-link'>
                                <Link to='#'>
                                    About platform
                                </Link>
                            </li>
                            <li className='footer__list-link'>
                                <Link to='#'>
                                    Rent out your PC
                                </Link>
                            </li>
                            <li className='footer__list-link'>
                                <Link to='#'>
                                    News
                                </Link>
                            </li>
                            <li className='footer__list-link'>
                                <Link to='#'>
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className='footer__third'>
                        <h4 className='footer__list-title'>PERSONAL INFO</h4>
                        <ul className='footer__second footer__list'>
                            <li className='footer__list-link'>
                                <Link to='#' >
                                    Personal info
                                </Link>
                            </li>
                            <li className='footer__list-link'>
                                <Link to='#'>
                                    Tariff
                                </Link>
                            </li>
                            <li className='footer__list-link'>
                                <Link to='#'>
                                    My balance
                                </Link>
                            </li>
                            <li className='footer__list-link'>
                                <Link to='#'>
                                    Referrals
                                </Link>
                            </li>
                            <li className='footer__list-link'>
                                <Link to='#'>
                                    Rent PC
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className='footer__fourth'>
                        <h4 className='footer__list-title'>OUR INFORMATION</h4>
                        <ul className='footer__list'>
                            <li className='footer__item'>
                                <Link
                                    to="tel:+380688338888"
                                    target="_blank"
                                    rel="noreferrer"
                                    className='footer__contact'
                                >
                                    <div className='footer__contact-icon'>
                                        {phoneIcon}
                                    </div>
                                    <span>+380688338888</span>
                                </Link>
                            </li>
                            <li className='footer__item'>
                                <Link
                                    to="mailto:support@miraplay.cloud"
                                    target="_blank"
                                    rel="noreferrer"
                                    className='footer__contact'
                                >
                                    <div className='footer__contact-icon'>
                                        {mailIcon}
                                    </div>
                                    <span>support@miraplay.cloud</span>
                                </Link>
                            </li>
                            <li className='footer__item'>
                                <Link
                                    to="https://goo.gl/maps/9MpDrbtuJ5QrM5oH8" target="_blank"
                                    rel="noreferrer"
                                    className='footer__contact'
                                >
                                    <div className='footer__contact-icon'>
                                        {mapIcon}
                                    </div>
                                    <span>02142 Kyiv city, Larisi Rudenko street 6А, office 534</span>
                                </Link>
                            </li>
                            <li className='footer__item'>
                                <Link
                                    to="https://miraplay.cloud/download/Install-Miraplay.pkg"
                                    target="_blank"
                                    rel="noreferrer"
                                    className='footer__contact'
                                >
                                    <div className='footer__contact-icon'>
                                        {windowIcon}
                                    </div>
                                    <span className='footer__contact-client'>download client</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className='footer__copyrighting-mobile'>
                        <p>Copyright © 2023 Miraplay</p>
                    </div>

                </div>
            </div>
        </footer>
    )
};
