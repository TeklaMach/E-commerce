import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="footerWrapper">
      <div className="contact-section">      
        <h3 className='contact'>{t("global.contact")}</h3>
        <h2 className='email'>Email: info@wall.ge</h2>
        <h2 className='phone'>Phone:  *7007 / +995 (32) 2 60 30 60</h2>
        <Link className='link' to="/aboutUs">{t("global.aboutButton")}</Link>
      </div>
      <div className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387293.89778130144!2d-74.25986473089088!3d40.69714942209614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f173e0db53%3A0x57bd40b16952b03d!2sTbilisi%2C%20USA!5e0!3m2!1sen!2s!4v1567616936150!5m2!1sen!2s"
          width="400"
          height="150"
          allowFullScreen
          style={{ border: 0 , marginLeft:400, marginTop:56}}
          title="Google Maps"
        ></iframe>
      </div>
    </footer>
  );
};

export default Footer;

