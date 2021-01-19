import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import "./resultcard.css";
<<<<<<< Updated upstream
// import DateModal from '../Modal/dateModal';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from '@material-ui/core/Button';

export function ResultCard({ children }) {
    return <CardDeck className="homeCarddeck">{children}</CardDeck>;
}
=======
import DateModal from '../Modal/dateModal';
import Button from '@material-ui/core/Button';
import Card from 'react-bootstrap/Card';

const useStyles = makeStyles((theme) => ({
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
>>>>>>> Stashed changes

export function ChildListItem(props) {
    const {
        _id,
        parent,
        firstName,
        lastName,
        age,
        activities,
        image } = props.child;

<<<<<<< Updated upstream
    // const { schedulePlaydate } = props;
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
=======
    const classes = useStyles();
    const [modalFlag, setModalFlag] = useState(false);

    const handleModalClick = () => {
        console.log(`Modal Click`, modalFlag );
        setModalFlag(true);
    }
>>>>>>> Stashed changes

    return (
        <Card className="resultCard text-center">
            <Card.Img
                variant="top"
                src={image || "https://via.placeholder.com/150"}
                className="media" />
            <Card.Body style={{ paddingBottom: '10px' }}>
                <Card.Title> {firstName} {lastName}</Card.Title>
                <p style={{ margin: '0' }}>
                    Age: {age}
                </p>
                <p style={{ margin: '0' }}>  Activities: {activities}
                </p>
<<<<<<< Updated upstream

                <hr></hr>
                <Button onClick={handleOpen}>
                    Schedule Playdate
        </Button>
=======
           
                <hr></hr>
                <Button className={classes.button} onClick={handleModalClick}>
                    Schedule Playdate
                </Button>
                <div>
                    {modalFlag ? 
                    <DateModal
                        modalFlag={modalFlag}
                        child2Id={_id}
                        parent={parent}                        
                    />
                    : ''}
                </div>
>>>>>>> Stashed changes
            </Card.Body>
        </Card>
    )
}