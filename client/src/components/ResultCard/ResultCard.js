import React from 'react';
import "./resultcard.css";
import DateModal from '../Modal/dateModal';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';


export function ResultCard({ children }) {
    return <CardDeck className="homeCarddeck">{children}</CardDeck>;
}

export function ChildListItem(props) {
    const {
        _id,
        parent,
        firstName,
        lastName,
        age,
        activities,
        image } = props.child;

    const { schedulePlaydate } = props;

    return (
        <Card className="resultCard text-center">
            <Card.Img
                variant="top"
                src={image || "https://via.placeholder.com/150"}
                className="media" />
            <Card.Body style={{paddingBottom: '10px'}}>
                <Card.Title> {firstName} {lastName}</Card.Title>
                <p style={{margin: '0'}}>
                    Age: {age}
                </p>
                <p style={{margin: '0'}}>  Activities: {activities}
                </p>
           
            <hr></hr>
                <DateModal
                    childId={_id}
                    parent={parent}
                    schedulePlaydate={schedulePlaydate}
                />
            </Card.Body>
        </Card>
    )
}