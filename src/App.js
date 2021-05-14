import React, { useState } from 'react'
import './App.css';
import { Typography, Divider, List, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import SearchHistoryListItem from './components/SearchHistoryListItem';
import Controls from './components/Controls';
import DisplayWeather from './components/DisplayWeather';

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

function App() {
  const classes = useStyles();
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState(undefined);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(false);

  const generateHeader = (name) => {
    return (
      <div>
        <Typography variant="h6" style={{fontWeight: '700'}}>{name}</Typography>
        <Divider style={{backgroundColor: 'rgba(0, 0, 0, 1)'}}/>
      </div>
    )
  }

  return (
    <Paper variant="outlined" className={classes.paper}>
      <div className={classes.root}>
        {/* Header */}
        {generateHeader(`Today's Weather`)}

        {/* Controls */}
        <Controls country={country} city={city} setCountry={setCountry} setCity={setCity} setError={setError} setWeather={setWeather} setHistory={setHistory} history={history}/>

        {/* Display Weather */}
        {weather && <DisplayWeather weather={weather} />}

        {/* Not found error */}
        {error && (
          <div className={clsx("alert",classes.errorDiv)}>
            <div style={{paddingLeft: '8px', color: 'black'}}>Not found</div>
          </div>
        )}

        {/* Search History */}
        {generateHeader(`Search History`)}
        {history && history.length > 0 && (
          <List>
            {history.map((weather, index) => {
              return <SearchHistoryListItem weather={weather} index={index} setWeather={setWeather} setHistory={setHistory} history={history} />
            })}
          </List>
        )}
        {history && history.length === 0 && (
          <div className={classes.noRecordDiv}>
            <Typography variant='h5'>No record</Typography>
          </div>
        )}
      </div>
    </Paper>
    
  );
}

export default App;
