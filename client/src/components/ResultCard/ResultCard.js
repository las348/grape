import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import "./resultcard.css";
import DateModal from '../Modal/dateModal';
import Button from '@material-ui/core/Button';
import Card from 'react-bootstrap/Card';
import MissingPic from '../../assets/robot.png';

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

    const useFlag = (initialState) => {
        const [modalFlag, setModalFlag] = React.useState(initialState);

        const flag = React.useCallback(
            () => setModalFlag(state => !state),
            [setModalFlag],
        );

        return [modalFlag, flag];
    }

    const [modalFlag, flag] = useFlag(false);
console.log(modalFlag)

    return (
        <Card className="resultCard text-center">
            <Card.Img
                variant="top"
                src={image || MissingPic}
                className="media" />
            <Card.Body style={{ paddingBottom: '10px' }}>
                <Card.Title> {firstName} {lastName}</Card.Title>
                <p style={{ margin: '0' }}>
                    Age: {age}
                </p>
                <p style={{ margin: '0' }}>  Activities: {activities}
                </p>

                <hr></hr>
                <Button className={classes.button} onClick={flag}>
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