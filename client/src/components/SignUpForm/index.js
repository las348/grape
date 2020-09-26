import React from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    button: {
        background: 'rgba(34,133,195,1)',
        fontWeight: 'bolder',
        color: 'white',
        marginTop: 20,
        '&:hover': {
            background: "#2fd65d",
        }
    }
}));

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#2fd65d',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#2fd65d',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'gray',
            },
            '&:hover fieldset': {
                borderColor: 'rgba(34,133,195,1)',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#2fd65d',
            },
        },
    },
})(TextField);

function SignUpForm(props) {
    const { displayName, email, password, password2, handleInputChange, handleBtnSubmit } = props;
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <CssTextField
                    id="custom-css-outlined-input"
                    label="Name"
                    variant="outlined"
                    size="small"
                    name="displayName"
                    className={classes.margin}
                    value={displayName}
                    onChange={handleInputChange} />
                <CssTextField
                    id="custom-css-outlined-input"
                    label="Email"
                    variant="outlined"
                    size="small"
                    name="email"
                    className={classes.margin}
                    value={email}
                    onChange={handleInputChange} />
            </div>
            <div>
                <CssTextField
                    id="custom-css-outlined-input"
                    label="Password"
                    variant="outlined"
                    size="small"
                    type="password"
                    name="password"
                    className={classes.margin}
                    value={password}
                    onChange={handleInputChange} />
                <CssTextField
                    id="custom-css-outlined-input"
                    label="Confirm password"
                    variant="outlined"
                    size="small"
                    type="password"
                    name="password2"
                    className={classes.margin}
                    value={password2}
                    onChange={handleInputChange} />
            </div>

            <Button
                type="submit"
                className={classes.button}
                onClick={handleBtnSubmit}
            >
                Sign Up
                    </Button>
        </form>

    )
}

export default SignUpForm;