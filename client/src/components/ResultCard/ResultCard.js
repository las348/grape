import React from 'react';
import "./resultcard.css";
// import DateModal from '../Modal/dateModal';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from '@material-ui/core/Button';

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

    // const { schedulePlaydate } = props;
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

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
                <Button onClick={handleOpen}>
                    Schedule Playdate
        </Button>
            </Card.Body>
        </Card>
    )
}