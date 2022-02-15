import React from 'react'
import styles from './hero-info.module.css';
const HeroInfo = () => {
  return (
    <div className={styles['hero-image']}>
        <div className={styles['hero-text']}>

          
            <h1 className="text-4xl lg:text-8xl md:text-7xl text-left text-white font-bold mb-12"><span className={`${styles.clip} bg-clip-text text-transparent`}>Traditional</span> Service</h1>
            <div>
              <p className="text-4xl font-semibold mb-6 uppercase opacity-70">Sundays</p>

              <div className="flex flex-1 flex-col lg:flex-row md:flex-row justify-center items-center">
                <p className="m-4 text-2xl font-semibold">8:00AM</p>
                <p className="m-4 text-4xl font-semibold">&</p>
                <p className="m-4 text-2xl font-semibold">11:00AM</p>
              </div>
            </div>

        </div>
    </div>
  )
}

export default HeroInfo