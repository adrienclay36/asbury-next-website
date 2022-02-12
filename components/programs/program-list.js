import React from 'react'
import TodaysProgram from './todays-program'
const ProgramList = ({ files }) => {
  return (
      
    <div>
       <TodaysProgram file={files[0]}/>
    </div>
  )
}

export default ProgramList