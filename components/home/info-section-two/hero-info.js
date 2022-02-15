import React from 'react'
import styles from './hero-info.module.css';
const HeroInfo = () => {
  return (
    <div className={styles['hero-image']}>
        <div className="flex flex-1 justify-center items-center max-w-screen-lg">
            <h1 className="text-8xl text-left text-white font-bold">Welcome To Asbury</h1>
        </div>
    </div>
  )
}

export default HeroInfo