import React, { useState, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import UserModal from "../Modal/userModal";
import ChildModal from "../Modal/childModal";
import UserContext from "../../utils/userContext";


const useStyles = makeStyles({
    root: {
        maxWidth: 675,
        // marginTop: 50,
    },
    container: {
        textAlign: "-webkit-center",
    },
    media: {
        marginTop: 10,
        maxWidth: "30%",
        marginLeft: "-20%",
    },
    details: {
        display: 'flex',
        marginTop: 50,
        color: 'black',
    },
    buttons: {
        float: "right",
    },
    table: {
        fontWeight: "bolder",
        fontSize: "large",
    }
});

function profileCard(props) {
    const { updateUser, addChild, uploadImage } = props;

    const { userState, setUserState } = useContext(UserContext);
    const { user } = userState;
    const classes = useStyles();
    console.log(`User on profile page:`, user);

    const [imageUpld, setImageUpld] = useState({
        upload: undefined,
        success: false,
        url: user.image || "https://via.placeholder.com/250"
    })

    const Successmsg = () => (
        <p style={{ color: 'green' }}>Image Uploaded Successfully.</p>
    )

    const Failuremsg = () => (
        <p style={{ color: 'red' }}>Image Uploaded Failed.</p>
    )

    const Upload = () => (
        <div >
            <input
                accept="image/*"
                style={{ display: "none" }}
                id={user.uid}
                type="file"
                onChange={(e) => handleChange(e)}
            />
            <label htmlFor={user.uid}>
                <Button color="primary" component="span">
                    Upload
            </Button>
            </label>
        </div>
    );

    async function handleChange(event) {
        let file = event.target.files[0];
        uploadImage(file, user.uid, "user")
            .then(resp => {
                console.log(`response from User image upload: `, resp)
                if (resp.success) {
                    setUserState({ ...userState, user: resp.user })
                    setImageUpld({ upload: true, success: true, url: resp.url })
                } else {
                    setImageUpld({ ...imageUpld, upload: true, success: false })
                }
            })
    }

    return (
        <div className={classes.container}>
            <h2>{user.displayName}'s Profile</h2>
            <Card className={classes.root}>
                <CardActionArea className={classes.details}>
                    <Box className={classes.media}>
                        {imageUpld.upload ? (imageUpld.success ? <Successmsg /> : <Failuremsg />) : null}
                        <CardMedia
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
                            <TableCell align="left">{user.displayName}</TableCell>
                        </TableRow>
                        <TableRow key="Email">
                            <TableCell component="th" scope="row" className={classes.table} >
                                Email:
                            </TableCell>
                            <TableCell align="left">{user.emailID}</TableCell>
                        </TableRow>
                        <TableRow key="City">
                            <TableCell component="th" scope="row" className={classes.table} >
                                City:
                            </TableCell>
                            <TableCell align="left">{(user.address && user.address.city) ? user.address.city : ""}</TableCell>
                        </TableRow>
                        <TableRow key="State">
                            <TableCell component="th" scope="row" className={classes.table} >
                                State:
                            </TableCell>
                            <TableCell align="left">{(user.address && user.address.state) ? user.address.state : ""}</TableCell>
                        </TableRow>
                        <TableRow key="Zip">
                            <TableCell component="th" scope="row" className={classes.table} >
                                Zip:
                            </TableCell>
                            <TableCell align="left">{(user.address && user.address.zip) ? user.address.zip : ""}</TableCell>
                        </TableRow>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.buttons}>
                    <UserModal
                        updateUser={updateUser}
                    >
                        Update
                    </UserModal>
                    <ChildModal
                        saveChild={addChild}
                        childValues={{ _id: "", firstName: "", lastName: "", age: "", activities: "" }} // Sending spaces for child fields from Add action
                    >
                        Add Child
                    </ChildModal>
                </CardActions>
            </Card>
        </div>
    )
}

export default profileCard;