import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import "./resultcard.css";
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

export function ChildListItem(props) {
    const {
        _id,
        parent,
        firstName,
        lastName,
        age,
        activities,
        image } = props.child;

    const classes = useStyles();
    const [modalFlag, setModalFlag] = useState(false);

    const handleModalClick = () => {
        console.log(`Modal Click`, modalFlag );
        setModalFlag(true);
    }

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
            </Card.Body>
        </Card>
    )
}