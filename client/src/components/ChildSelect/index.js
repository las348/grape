import React, { useState } from "react";
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import "./style.css";


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


    function handleClick(e) {
        e.preventDefault();

        console.log(`Child Selected`)
    };

    return (
        <Card>
            <button onClick={handleClick}>
                <CardActions >
                    <Box>
                        <CardMedia
                            className='media'
                            component="img"
                            image={imageUpld.url}
                        />
                    </Box>
                </CardActions>

                {/* <Card.Body>
                    <h5>
                        {firstName} {lastName}
                    </h5>
                </Card.Body> */}
            </button>
        </Card>
    );
}




