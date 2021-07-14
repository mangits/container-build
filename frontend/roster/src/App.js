import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

class App extends React.Component{

  state={
    d:[],
    text: ""
  }

  componentDidMount(){
    fetch('http://localhost:3001/roster')
    .then(res=>res.json())
    .then((data)=>{
      this.setState({d: data.roster})
    })
  }

  render(){
    return(
      <div>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="h6" >
            Roster
          </Typography>
          <div>
            <List dense>
              {this.state.d.map((person) => (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={person.first + " " + person.last}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={()=>{
                        fetch('http://localhost:3001/roster', {
                          method: 'DELETE',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ first: person.first })
                        })
                        window.location.reload()
                      }}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PersonOutlineIcon />
                  </Avatar>
                </ListItemAvatar>
                <TextField label="New Person" value={this.state.text}
                onChange={(e)=>{this.setState({text: e.target.value})}}
                onKeyDown={(e)=>{
                  if(e.key === 'Enter'){
                    if(this.state.text.indexOf(' ') === -1){
                      fetch('http://localhost:3001/roster', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          first: this.state.text.split(' ')[0], last: " "
                        })
                      })
                    }
                    else{
                      fetch('http://localhost:3001/roster', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          first: this.state.text.split(' ')[0], last: this.state.text.split(' ')[1]
                        })
                      })
                    }
                    window.location.reload()
                  }
                }}
                />
                <ListItemSecondaryAction>
                  <IconButton id='submit' edge="end"
                  onClick={()=>{
                    if(this.state.text.indexOf(' ') === -1){
                      fetch('http://localhost:3001/roster', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            first: this.state.text.split(' ')[0], last: " "
                          })
                        })
                      }
                      else{
                        fetch('http://localhost:3001/roster', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            first: this.state.text.split(' ')[0], last: this.state.text.split(' ')[1]
                          })
                        })
                      }
                      window.location.reload()
                  }}
                  >
                    <SaveIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
    )
  }
}

export default App;