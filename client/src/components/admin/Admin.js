import React, {useState, useEffect} from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {Main, OnHold, Active, Inactive, Resigned} from "./tabs"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Admin() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const [tutors, setTutors] = useState();

  useEffect(() => {
    updateTutors()
  }, [])

  const updateTutors = () => {
    axios.get("/api/admin/tutors").then(allTutors => {
      setTutors(allTutors.data.tutors)
    }).catch(err => {
      console.log(err)
    })
    console.log("Tutor List Updated!");
}

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Main" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="On Hold" href="/trash" {...a11yProps(1)} />
          <LinkTab label="Active" href="/spam" {...a11yProps(2)} />
          <LinkTab label="Inactive" href="/spam" {...a11yProps(2)} />
          <LinkTab label="Resigned" href="/spam" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Main />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OnHold updateTutors={updateTutors} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Active tutors={tutors} updateTutors={updateTutors} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Inactive tutors={tutors} updateTutors={updateTutors} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Resigned tutors={tutors} updateTutors={updateTutors} />
      </TabPanel>
    </div>
  );
}