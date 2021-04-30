import React, { useState } from 'react'
import './App.css';
import { Typography, Divider, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import api from './config';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	root: {
    padding: '8px'
  },
  controls: {
    paddingTop: '8px',
    display: 'flex',
    alignItems: 'center'
  },
  textfield: {
    '& .MuiOutlinedInput-input': {
      padding: '6px 14px'
    },
    paddingLeft: '4px',
    paddingRight: '4px'
  },
  button: {
    margin: "0 4px 0"
  },
  weatherInfoLabel: {
    width: '120px'
  },
  errorDiv: {
    marginTop: '8px',
    marginBottom: '16px'
  }
}));

function App() {
  const classes = useStyles();
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState(undefined);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(false);

  const searchOnClick = () => {
    const param = `${city},${country}`
    axios.get(api.replace('{params}', param))
    .then(response => {
      response.data.time = moment().format()
      setWeather(response.data);
      setHistory([...history, response.data])
    })
    .catch(error => {
      if(error.response.status === 404){
        setWeather(undefined)
        setError(true)
      }
    })
  }

  const clearOnClick = () => {
    setCity('')
    setCountry('')
    setWeather(undefined)
    setError(false);
  }

  const showPreviousOnClick = (weather) => {
    setWeather(weather)
  }

  const deleteOnClick = (time) => {
    setHistory(history.filter(weather => weather.time !== time))
  }

  const generateDiv = (key, value) => {
    return (
      <div className="flex">
        <Typography className={classes.weatherInfoLabel}>{key}</Typography>
        <Typography>{value}</Typography>
      </div>
    )
  }

  const generateHeader = (name) => {
    return (
      <div>
        <Typography variant="h6" style={{fontWeight: '700'}}>{name}</Typography>
        <Divider style={{backgroundColor: 'rgba(0, 0, 0, 1)'}}/>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      {/* Header */}
      {generateHeader(`Today's Weather`)}

      {/* Controls */}
      <div className={classes.controls}>
        <Typography>City:</Typography>
        <TextField className={classes.textfield} value={city} variant="outlined" onChange={(event) => {setCity(event.target.value)}} />
        <Typography>Country:</Typography>
        <TextField className={classes.textfield} value={country} variant="outlined" onChange={(event) => {setCountry(event.target.value)}}/>
        <Button variant="contained" className={classes.button} onClick={searchOnClick}>Search</Button>
        <Button variant="contained" className={classes.button} onClick={clearOnClick}>Clear</Button>
      </div>

      {/* Display Weather */}
      {weather && (
        <div style={{padding: '16px'}}>
          <Typography variant='caption'>{`${weather.name}, ${weather.sys.country}`}</Typography>
          <Typography variant='h3'>{weather.weather[0].main}</Typography>
          {generateDiv('Description: ', weather.weather[0].description)}
          {generateDiv('Temperature: ', `${weather.main.temp_min}°C ~ ${weather.main.temp_max}°C`)}
          {generateDiv('Humidity: ', `${weather.main.humidity}%`)}
          {generateDiv('Time: ', moment(weather.time).format('YYYY-MM-DD HH:mm A'))}
        </div>
      )}

      {error && (
        <div className={clsx("alert",classes.errorDiv)}>
          <div style={{paddingLeft: '8px', color: 'black'}}>Not found</div>
        </div>
      )}

      {/* Search History */}
      {generateHeader(`Search History`)}
      <List>
        {history.map((weather, index) => {
          return (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={`${index+1}. ${weather.name}, ${weather.sys.country}`}
                />
                <ListItemSecondaryAction>
                  <div className="flex items-center">
                    <Typography>{moment(weather.time).format('HH:mm:ss A')}</Typography>
                    <IconButton onClick={() => showPreviousOnClick(weather)}>
                      <SearchIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteOnClick(weather.time)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider/>
            </React.Fragment>
          )
        })}
      </List>
    </div>
  );
}

export default App;
