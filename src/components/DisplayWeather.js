import React from 'react';
import moment from 'moment';
import { Typography } from '@material-ui/core'
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
    padding: '8px'
  },
  paper: {
    margin: '8px',
    border: '1px solid black',
    borderRadius: '8px',
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
  },
  noRecordDiv: {
    display: 'flex',
    alignItems: 'cetner',
    justifyContent: 'center',
    paddingTop: '30px'
  }
}));


function DisplayWeather(props){

    const classes = useStyles();
    const {weather} = props;

    const generateDiv = (key, value) => {
        return (
          <div className="flex">
            <Typography className={classes.weatherInfoLabel}>{key}</Typography>
            <Typography>{value}</Typography>
          </div>
        )
      }

    return (
        <div style={{padding: '16px'}}>
            <Typography variant='caption'>{`${weather.name}, ${weather.sys.country}`}</Typography>
            <Typography variant='h3'>{weather.weather[0].main}</Typography>
            {generateDiv('Description: ', weather.weather[0].description)}
            {generateDiv('Temperature: ', `${weather.main.temp_min}°C ~ ${weather.main.temp_max}°C`)}
            {generateDiv('Humidity: ', `${weather.main.humidity}%`)}
            {generateDiv('Time: ', moment(weather.time).format('YYYY-MM-DD HH:mm A'))}
        </div>
    )
}

export default DisplayWeather