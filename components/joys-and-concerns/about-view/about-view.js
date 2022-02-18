import React from 'react'
import InfoCardVertical from '../../ui/info-card-vertical';
import { FaRegPaperPlane } from 'react-icons/fa';
const AboutView = () => {
  return (
    <div>
      <InfoCardVertical icon={<FaRegPaperPlane size={100} className="text-seaFoam-700 mt-10 mb-10"/>} title={"Here's the idea"} content={"Every week at Asbury, the congregation goes over a list of 'Joys' or 'Concerns' provided by the community. These are submitted by church members so that the congregation can keep their hearts and thoughts close to those in need both in the form condolences and prayers. This public board is a place for all members of the congregation to express their joys or concerns, so that the community can stay in touch and stay supportive. Please remain respectful, as this board is open to all. You do not have to provide a real name, and are welcome to use this board anonymously."}/>
    </div>
  )
}

export default AboutView