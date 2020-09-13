import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import UserContext from "../../utils/userContext";


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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    maxWidth: 345,
    marginTop: 50,
  },
  media: {
    height: 300,
  },
  button: {
    background: 'rgba(34,133,195,1)',
    fontWeight: 'bolder',
    color: 'white',
    '&:hover': {
      background: "#2fd65d",
    },
    marginRight: '5px',
    float: 'right',
  }
}));


function UserModal(props) {
  const { updateUser } = props;
  const { userState } = useContext(UserContext);
  const { user } = userState;

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [profileState, setProfileState] = useState({
    displayName: user.displayName,
    address: {
      city: (user && user.address && user.address.city) ? user.address.city : "",
      state: (user && user.address && user.address.state) ? user.address.state : "",
      zip: (user && user.address && user.address.zip) ? user.address.zip : "",
    }
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleEdit(event) {
    const { name, value } = event.target;

    if (name === "displayName") {
      setProfileState({ ...profileState, [name]: value });
    } else {
      const address = { ...profileState.address, [name]: value };
      const newObj = { ...profileState, address };
      setProfileState(newObj);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateUser(profileState);
    handleClose();
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form>
        <div className="form-group row">
          <label class="col-sm-2 col-form-label"> Name: </label>
          <div class="col-sm-10">
            <input
              type="text"
              placeholder="Name"
              name="displayName"
              value={profileState.displayName}
              onChange={handleEdit}
            />
          </div>
        </div>
        <div className="form-group row">
          <label class="col-sm-2 col-form-label"> City: </label>
          <div class="col-sm-10">
            <input
              type="text"
              placeholder="City"
              name="city"
              value={profileState.address.city}
              onChange={handleEdit}
            />
          </div>
        </div>
        <div className="form-group row">
          <label class="col-sm-2 col-form-label"> State: </label>
          <div class="col-sm-10">
            <input
              type="text"
              placeholder="state"
              name="state"
              value={profileState.address.state}
              onChange={handleEdit}
            />
          </div>
        </div>
        <div className="form-group row">
          <label class="col-sm-2 col-form-label"> Zip: </label>
          <div class="col-sm-10">
            <input
              type="text"
              placeholder="zip"
              name="zip"
              value={profileState.address.zip}
              onChange={handleEdit}
            />
          </div>
        </div>
        <Button className={classes.button} onClick={handleSubmit}>
          Save
        </Button>
        <Button className={classes.button} onClick={handleClose}>
          Close
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
        {props.children}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default UserModal;