import React from 'react'
import { useTranslation } from 'react-i18next';
import './AboutUs.css'
export default function AboutUs() {
    const { t } = useTranslation();
  return (
    <div>
        <div className='title'>
            <h1>{t("global.aboutUs")}</h1>
        </div>
        <div className='secondTitle'>
            <span>{t("global.about")}</span>
        </div>
       <div className='store'>
        <img className='storeImg' src="store.webp" alt="store" />
        </div>
        <div className='storeHistory'>
            <p className='storeHistoryText'>{t("global.description1")}</p>
            <p className='storeHistoryText'>{t("global.description2")}</p>
            <p className='storeHistoryText'>{t("global.description3")}</p>
            <p className='storeHistoryText'>{t("global.description4")}</p>
        </div>
    </div>
  
  )
}
