import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Main, OnHold, Active, Inactive, Resigned } from '../admin/tabs'

const Admin = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Main</Tab>
        <Tab>On Hold</Tab>
        <Tab>Active</Tab>
        <Tab>Inactive</Tab>
        <Tab>Resigned</Tab>
      </TabList>

      <TabPanel>
        <Main />
      </TabPanel>
      <TabPanel>
        <OnHold />
      </TabPanel>
      <TabPanel>
        <Active />
      </TabPanel>
      <TabPanel>
        <Inactive />
      </TabPanel>
      <TabPanel>
        <Resigned />
      </TabPanel>
    </Tabs>
  )
}

export default Admin;