import React, { useState } from 'react'
import SectionHeading from '../ui/section-heading';
import AboutView from './about-view/about-view';
import ScheduleView from './schedule-view/schedule-view';
import styles from "./asbury-cafe-section.module.css";
const AsburyCafeSection = () => {
    const [aboutView, setAboutView] = useState(true);
    const [scheduleView, setScheduleView] = useState(false);

  

    const showAbout = () => {
        setAboutView(true);
        setScheduleView(false);
    }

    const showSchedule = () => {
        setScheduleView(true);
        setAboutView(false);
    }


  return (
    <SectionHeading title="Asbury Cafe">
      <div className="container grid grid-cols-2 gap-0 text-center w-full lg:w-2/6 mx-auto">
        <button
          id="aboutButton"
          onClick={showAbout}
          className={`border-2 rounded-l-lg uppercase text-seaFoam-600 text-md lg:text-xl md:text-xl w-full py-2 ${
            aboutView && styles["btn-filled"]
          }`}
        >
          About
        </button>
        <button
          id="booksButton"
          onClick={showSchedule}
          className={`border-2 rounded-r-lg uppercase text-seaFoam-600 text-md lg:text-xl md:text-xl w-full py-2 ${
            scheduleView && styles["btn-filled"]
          }`}
        >
          Scheduling
        </button>
      </div>

      {aboutView && <AboutView />}
      {scheduleView && <ScheduleView />}
    </SectionHeading>
  );
}

export default AsburyCafeSection