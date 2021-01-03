import React, { useState } from "react";
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import "./style.css";
import Button from '@material-ui/core/Button';

export function ResultSelect({ children }) {
    return <CardDeck className="cardselect">{children}</CardDeck>;
}


export function ChildSelect(props) {
    const { _id, firstName, lastName, image } = props.child;

    const [imageUpld, setImageUpld] = useState({
        upload: undefined,
        success: false,
        url: image || "https://via.placeholder.com/150"
    })

    const [childSelect, setChildSelect] = useState({
        _id: _id,
        firstName: firstName,
        lastName: lastName,
      });

    function handleClick(e) {
        e.preventDefault();     
        setChildSelect({ ...childSelect })
        console.log(childSelect);
    };

    return (
        <Card>
            <CardActions >
                <CardMedia
                    className='media'
                    component="img"
                    image={imageUpld.url}
                    value={firstName}
                />
            </CardActions>

            <Card.Body className="button">
                <Button onClick={handleClick} value={firstName}>
                    <h5>
                        {firstName} {lastName}
                    </h5>
                </Button>
            </Card.Body>
        </Card>
    );
}




