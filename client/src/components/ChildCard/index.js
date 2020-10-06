import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
// import Grid from '@material-ui/core/Grid';
import CardDeck from 'react-bootstrap/CardDeck';
import ChildModal from "../Modal/childModal";
import Card from 'react-bootstrap/Card';
import "./childCard.css";


const useStyles = makeStyles({
    media: {
        marginTop: 10,
        maxWidth: "40%",
        marginLeft: "10%",
    },
    image: {
        borderRadius: "10px",
        boxShadow: "11px 7px 36px -10px rgba(0,0,0,0.75)",
    },
    button: {
        background: 'rgba(34,133,195,1)',
        fontWeight: 'bolder',
        color: 'white',
        float: "right",
    },
    buttons: {
        float: "right",
    },
    delete: {
        background: 'rgba(34,133,195,1)',
        fontWeight: 'bolder',
        color: 'white',
        '&:hover': {
            background: "red",
        }
    }
});

export function ResultCard({ children }) {
    return <CardDeck className="carddeck">{children}</CardDeck>;
}

export function ChildCard(props) {
    const { _id, firstName, lastName, age, activities, image } = props.child;
    const { updateChild, deleteChild, uploadImage } = props;

    const [imageUpld, setImageUpld] = useState({
        upload: undefined,
        success: false,
        url: image || "https://via.placeholder.com/150"
    })

    const classes = useStyles();

    const Successmsg = () => (
        <p style={{ color: '#2fd65d' }}>Image Uploaded Successfully.</p>
    )

    const Failuremsg = () => (
        <p style={{ color: 'red' }}>Image Uploaded Failed.</p>
    )

    const Upload = () => (
        <div >
            <input
                accept="image/*"
                style={{ display: "none" }}
                id={_id}
                type="file"
                onChange={(e) => handleChange(e)}
            />
            <label htmlFor={_id}>
                <Button color="primary" component="span">
                    Upload
            </Button>
            </label>
        </div>
    );

    async function handleChange(event) {
        console.log(`Child Image upload starting`)
        let file = event.target.files[0];
        uploadImage(file, _id, "child")
            .then(resp => {
                console.log(`response from Child image upload: `, resp)
                if (resp.success) {
                    setImageUpld({ upload: true, success: true, url: resp.url })
                } else {
                    setImageUpld({ ...imageUpld, upload: true, success: false })
                }
            })
    }


    return (
        <Card className="resultCard text-center">

            {/* <Card.Body> 
               <div>  
                   {imageUpld.upload ? (imageUpld.success ? <Successmsg /> : <Failuremsg />) : null}
                <Card.Img
                    className="media"
                    component="img"
                    image={imageUpld.url}
                />
                <Upload /> 
                </div>
             </Card.Body> */}

            <CardActions >
                <Box>
                    {imageUpld.upload ? (imageUpld.success ? <Successmsg /> : <Failuremsg />) : null}
                    <CardMedia
                        className='media'
                        component="img"
                        image={imageUpld.url}
                    />
                    <Upload />
                </Box>
            </CardActions>

            <Card.Body>
                <h3>
                    Name: {firstName} {lastName}
                </h3>
                <hr></hr>
                <p style={{margin: '0'}}>
                    Age: {age}
                </p>
                <hr></hr>
                <p style={{margin: '0'}}>
                    Hobbies: {activities}
                </p>
                <hr></hr>
                <ChildModal
                    saveChild={updateChild}
                    childValues={props.child}
                >
                    Update
            </ChildModal>
                <Button className={classes.delete} onClick={() => deleteChild(_id)}>Delete</Button>
            </Card.Body>
        </Card>
    );
}


