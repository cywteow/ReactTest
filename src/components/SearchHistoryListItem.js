import { Typography, Divider, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import React from 'react'
import '../App.css';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';

function SearchHistoryListItem(props) {

    const {index, weather, setWeather, setHistory, history} = props;

    const showPreviousOnClick = (weather) => {
        setWeather(weather)
    }
    
    const deleteOnClick = (time) => {
        setHistory(history.filter(weather => weather.time !== time))
    }

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
      
}

export default SearchHistoryListItem