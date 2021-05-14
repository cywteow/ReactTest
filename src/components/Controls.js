import React from 'react';
import '../App.css';
import { Typography, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import api from '../config';
import moment from 'moment';

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

function Controls(props){

    const { city, country, setWeather, setHistory, history, setError, setCity, setCountry} = props;
    const classes = useStyles();

    const searchOnClick = () => {
        const param = `${city},${country}`
        axios.get(api.replace('{params}', param))
        .then(response => {
          // Set timestamp to be used as ID as it is unique
          response.data.time = moment().format()
          setWeather(response.data);
          setHistory([response.data, ...history])
          setError(false)
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

    return (
        <div className={classes.controls}>
          <Typography>City:</Typography>
          <TextField className={classes.textfield} value={city} variant="outlined" onChange={(event) => {setCity(event.target.value)}} />
          <Typography>Country:</Typography>
          <TextField className={classes.textfield} value={country} variant="outlined" onChange={(event) => {setCountry(event.target.value)}}/>
          <Button variant="contained" className={classes.button} onClick={searchOnClick}>Search</Button>
          <Button variant="contained" className={classes.button} onClick={clearOnClick}>Clear</Button>
        </div>
    )
}

export default Controls