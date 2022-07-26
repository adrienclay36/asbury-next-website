import React from 'react'
import { Tabs } from '@mantine/core'
import EditShiftTypes from './shift-types/edit-shift-types'
import ParticipatingOrganizations from './participating-organizations/participating-organizations'
import MasterSchedule from './master-schedule/master-schedule'
const ScheduleTabs = ( ) => {
  return (
    <Tabs color="cyan" position="center">
      <Tabs.Tab label="Master Schedule">
          <MasterSchedule />
      </Tabs.Tab>
      <Tabs.Tab label="Shift Types">
        <EditShiftTypes />
      </Tabs.Tab>
      <Tabs.Tab label="Participating Organizations">
        <ParticipatingOrganizations />
      </Tabs.Tab>
      <Tabs.Tab label="Shifts"></Tabs.Tab>
    </Tabs>
  );

  
}

export default ScheduleTabs