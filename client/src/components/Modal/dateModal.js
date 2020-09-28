import React, { useContext, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UserContext from "../../utils/userContext";
import moment from 'moment';
import Grid from '@material-ui/core/Grid';

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
    width: 350,
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
    background: 'rgba(34,133,195,1)',
    fontWeight: 'bolder',
    color: 'white',
    '&:hover': {
      background: "#2fd65d",
    }
  }
}));

export default function SimpleModal(props) {
  const { childId, parent, schedulePlaydate } = props;
  const { userState, setUserState } = useContext(UserContext);
  const { user } = userState;
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [formObject, setFormObject] = useState({});


  function handleSchedule(event, Date) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
    console.log(value);
    // console.log(selectedDate);
  }


  function handleSubmit(event) {
    event.preventDefault();
    console.log("parent2 in dateModal" + parent);
    
    schedulePlaydate(formObject, user.children[0]._id, childId, parent);
    //will create playdate for 1st child
    handleClose();
  }


  // function handleUpcoming() {
  //   if (upcoming !== "") {
  //     playdate
  //   }
  // }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const date = moment().format('YYYY-MM-DD') + "T" + moment().format('hh:mm');
  // console.log(date);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form className={classes.container} noValidate>

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

        <div>
          <TextField
            className={classes.textField}
            label="Child Name"
            variant="outlined"
            size="small"
            type="text"
            name="child"
            onChange={handleSchedule}
          />
        </div>
      </form>

      <Button className={classes.button} onClick={handleSubmit}>
        Save
        </Button>
      <Button className={classes.button} onClick={handleClose}>
        Close
        </Button>

    </div>

  );

  return (
    <Grid container justify='center'>
      <Button className={classes.button} onClick={handleOpen}>
        Schedule Playdate
        </Button>
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
