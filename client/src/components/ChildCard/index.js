import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import ChildModal from "../Modal/childModal";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        maxWidth: 675,
        marginTop: 50,
        textAlign: "-webkit-center",
    },
    media: {
        marginTop: 10,
        maxWidth: "40%",
        marginLeft: "10%",
    },
    image: {
        borderRadius: "10px",
        boxShadow: "11px 7px 36px -10px rgba(0,0,0,0.75)",
    },
    details: {
        display: 'flex',
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
    },
    table: {
        fontWeight: "bolder",
        fontSize: "large",
    }
});

function ChildCard(props) {
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
        <Card className={classes.root}>
           
            <CardActions className={classes.details}>
                <Box className={classes.media}>
                    {imageUpld.upload ? (imageUpld.success ? <Successmsg /> : <Failuremsg />) : null}
                    <CardMedia
                        className={classes.image}
                        component="img"
                        image={imageUpld.url}
                    />
                    <Upload />
                </Box>
                <CardContent>
                    <TableRow key="Name">
                        <TableCell component="th" scope="row" className={classes.table} >
                            Name:
                            </TableCell>
                        <TableCell align="left">{firstName} {lastName}</TableCell>
                    </TableRow>
                    <TableRow key="Age">
                        <TableCell component="th" scope="row" className={classes.table} >
                            Age:
                            </TableCell>
                        <TableCell align="left">{age}</TableCell>
                    </TableRow>
                    <TableRow key="Hobbies">
                        <TableCell component="th" scope="row" className={classes.table} >
                            Hobbies:
                            </TableCell>
                        <TableCell align="left">{activities}</TableCell>
                    </TableRow>
                </CardContent>
            </CardActions>
            <CardActions className={classes.buttons}>
                <ChildModal
                    saveChild={updateChild}
                    childValues={props.child}
                >
                    Update
                </ChildModal>
                <Button className={classes.delete} onClick={() => deleteChild(_id)}>Delete</Button>
            </CardActions>
        </Card>
    );
}

export default ChildCard;
