import React, {useState, useEffect} from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

import languageList from './languageList';
import Axios from 'axios';

const Languages = ({languages, email, handleShowAlert}) => {
  const [languageName, setLanguageName] = useState([]);
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    setLanguageName(languages)
  }, [])

  const handleChange = event => {
    setLanguageName(event.target.value);
  };

  const saveLanguages = async () => {
    const response = await Axios.put("api/account/languages", {
      email, languages: languageName
    })
    const msg = response.data
    handleShowAlert(msg)
  }

  return (
    <div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-chip-label">Choose your languages</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={languageName}
            onChange={handleChange}
            onClose={saveLanguages}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {languageList.map(language => (
              <MenuItem key={language} value={language} style={getStyles(language, languageName, theme)}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  )
}

function getStyles(language, languageName, theme) {
  return {
    fontWeight:
      languageName.indexOf(language) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default Languages;