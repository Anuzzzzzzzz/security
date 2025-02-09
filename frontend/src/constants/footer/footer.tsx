import React from 'react'
import { AiFillYoutube, AiOutlineInstagram } from 'react-icons/ai'
import { BiLogoFacebook } from 'react-icons/bi'
import { BsPinterest } from 'react-icons/bs'
import { RiTwitterXLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import './footer.scss'
import img from './img/1.png'

type Props = {}

const Footer: React.FC<Props> = ({}) => {
  return (
    <div className="footer-container">
        <div className="footer-upside">
            <div className="column">
                <h3>Contact us</h3>
                <ul>
                    <Link to="tel:+12142412" className='li'>1-214-2412</Link>
                    <Link to="/help-center" className='li'>Help Center</Link>
                    <Link to="/live-chat" className='li'>Live Chat</Link>
                    <Link to="/faqs" className='li'>FAQs</Link>
                </ul>
            </div>
            <div className="column">
                <h3>Resources</h3>
                <ul>
                    <Link className='li' to="/flights">Flights</Link>
                    <Link className='li' to="/hotels">Hotels</Link>
                    <Link className='li' to="/car-rentals">Car Rentals</Link>
                    <Link className='li' to="/travel-insurance">Travel Insurance</Link>
                </ul>
            </div>
            <div className="column">
                <h3>Our company</h3>
                <ul>
                    <Link className='li' to="/about">About</Link>
                    <Link className='li' to="/press">Press</Link>
                    <Link className='li' to="/careers">Careers</Link>
                    <Link className='li' to="/investors">Investors</Link>
                </ul>
            </div>
            <div className="column">
                <h3>Other Tour brands</h3>
                <ul>
                    <Link className='li' to="/go-ahead-tours">Go Ahead Tours</Link>
                    <Link className='li' to="/city-tours">City Tours</Link>
                    <Link className='li' to="/grand-circle-cruise-line">Grand Circle Cruise Line</Link>
                    <Link className='li' to="/gap-year">Gap Year</Link>
                    <Link className='li' to="/ultimate-break">Ultimate Break</Link>
                </ul>
            </div>
        </div>
        <div className="footer-middle-side">
            <div className="inner-footer-middle-side">
                <div className="img">
                    <img src={img} alt="Footer Image" />
                </div>
                <div className="social-media-icons">
                    <Link to="https://www.facebook.com" target='_blank' className="icon"><BiLogoFacebook size={25}/></Link>
                    <Link to="https://twitter.com" target='_blank' className="icon"><RiTwitterXLine size={25}/></Link>
                    <Link to="https://www.instagram.com" target='_blank' className="icon"><AiOutlineInstagram size={25}/></Link>
                    <Link to="https://www.pinterest.com" target='_blank' className="icon"><BsPinterest size={25}/></Link>
                    <Link to="https://www.youtube.com" target='_blank' className="icon"><AiFillYoutube size={25}/></Link>
                </div>
            </div>
        </div>
        <div className="footer-downside">
            <div className="inner-footer-downside">
                <div className="footer-downside-left">
                    <p>© 2023 Tour, Inc. All rights reserved.</p>
                </div>
                <div className="footer-downside-right">
                    <Link className='p' to="/terms-and-conditions">Terms & Conditions</Link>
                    |
                    <Link className='p' to="/privacy-policy">Privacy Policy</Link>
                    |
                    <Link className='p' to="/site-map">Site Map</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer
