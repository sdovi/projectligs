import React from 'react'
import tg from './img/tg.svg'
import vk from './img/vk.svg'
import './style.css'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <footer className="footer__blocks-common pb-4 pt-4">
        <div className="container-fluid">
        <div className='footer__common-blocks'>
            <div className="footer__block-left">
                <p>Мы в социальных сетях:</p>
                <div className="footer__block-left-logo">
                  
                <img src={tg} alt="" />
                <img src={vk} alt="" />
                </div>
                
            </div>
            <div className="footer__block-right">
              <div className="footer_block-right-txt">
                <Link className='footer__block-right-link'><p>О нас</p></Link>
                <Link className='footer__block-right-link'><p>Авторские права</p></Link>
                
                
              </div>
            </div>
        </div>
        </div>
      </footer>
    </div>
  )
}
