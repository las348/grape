import React, { useContext, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UserContext from "../../utils/userContext";
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Alert from '../Alert/alert';
import API from "../../utils/API";
import "./style.css";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    maxWidth: 750,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),

  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(1),
    width: 220,
  },
  button: {
    margin: theme.spacing(1),
    width: 150,
    background: 'rgba(34,133,195,1)',
    fontWeight: 'bolder',
    color: 'white',
    '&:hover': {
      background: "#2fd65d",
    }
  }
}));

export default function SimpleModal(props) {
  const { child2Id, parent, modalFlag } = props;
  const { userState } = useContext(UserContext);
  const { user } = userState;
  const [open, setOpen] = useState(modalFlag);

  const [alertSuccess, setAlertSuccess] = useState();
  const [modalStyle] = React.useState(getModalStyle);

  const classes = useStyles();
  let child1Id = '';
  let date = moment().format('YYYY-MM-DD') + "T" + moment().format('hh:mm');
  const [formObject, setFormObject] = useState({
    date: date
  });
  function handleChildSelect(event) {
    event.preventDefault();
    child1Id = event.currentTarget.value;
  };
  function handleSchedule(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  }
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   schedulePlaydate(formObject, child1Id, child2Id, parent._id);
  //   console.log("After call to schedulePlaydate");
  //   handleClose();
  // }
  const schedulePlaydate = (event) => {
    event.preventDefault();
    console.log(`Scheduleplaydate function called: `, formObject.date);
    if (child1Id) {
      let eventObj = {
        event: {
          Date: formObject.date,
          children: [
            child1Id,
            child2Id
          ]
        },
        parent1: user._id,
        parent2: parent._id
      };
      console.log(`Scheduleplaydate Object: `, eventObj);
      API.setPlaydate(eventObj)
        .then((res) => {
          console.log(`Playdate Scheduled: `, res.data);
          // alert('Success');
          setAlertSuccess(true);
        })
        .catch(error => {
          console.log(error)
        })
    }
    else {
      alert('Please Select a child first.');
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {alertSuccess ?
        <Alert /> : null
      }
      <form className={classes.container} noValidate>
        <div className="flex-container">
          <h4>Scheduler</h4>
          <p>Select child to go on a playdate</p>
          <div>
            {!user.children.length ? (
              <h2>No children listed</h2>
            ) :
              (
                <CardDeck className="cardselect">
                  {user.children.map(child => {
                    return (
                      <Card key={child._id} className='datemodal'>
                       
                          <CardMedia
                            id='datemodalmedia'
                            component="img"
                            image={child.image || "https://via.placeholder.com/200"}
                            value={child.firstName}
                          />
                        <Button className={classes.button} value={child._id} onClick={handleChildSelect} >
                          <h5>
                            {child.firstName} {child.lastName}
                          </h5>
                        </Button>
                      </Card>
                    );
                  })
                  }
                </CardDeck>
              )
            }
          </div>

          <div className="form-group">
            <TextField
              id="datetime-local"
              label="Schedule playdate"
              type="datetime-local"
              className={classes.textField}
              defaultValue={date}
              format={moment().format('YYYY-MM-DD') + "T" + moment().format('hh:mm')}
              name="date"
              onChange={handleSchedule}
              renderInput={(props) => <TextField {...props} />}
            />
          </div>
        </div>
      </form>
      <Button className={classes.button} onClick={schedulePlaydate}>
        Save
      </Button>
      <Button className={classes.button} onClick={handleClose}>
        Close
      </Button>
    </div>
  );

  return (
    <Grid container justify='center'>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Grid>
  );
}