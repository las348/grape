import React from "react";
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
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
    },
    login: {
        textAlign: 'center',
        marginTop: '50px',
        marginBottom: '20px',
        marginLeft: 0,
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

function LoginForm(props) {
    const { email, password, error, handleInputChange, handleBtnSubmit } = props;

    const classes = useStyles();

    return (
        <Grid>
            <Grid>
                <h2 className={classes.login}>Login Form</h2>
            </Grid>
            <Grid container justify="center">

                <Grid>
                    <form className={classes.root} noValidate autoComplete="off">
                        <Grid>
                            <CssTextField
                                id="custom-css-outlined-input"
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={email}
                                type="email"
                                className={classes.margin}
                                placeholder="Email"
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid>
                            <CssTextField
                                id="custom-css-outlined-input"
                                label="Password"
                                variant="outlined"
                                name="password"
                                value={password}
                                type="password"
                                className={classes.margin}
                                placeholder="Password"
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid container justify="center" >
                            <Button
                                type="submit"
                                className={classes.button}
                                onClick={handleBtnSubmit}
                            >
                                Login
                    </Button>
                        </Grid>
                        <Grid>
                            {error !== null && (
                                <div className="errorMessage" style={{ padding: "10px" }}>
                                    {error}
                                </div>
                            )}
                        </Grid>
                        <Grid container justify="center" >
                            <p style={{ color: 'black' }}>Or sign up <a href="/signup" style={{ color: "rgba(34,133,195,1)" }}>here</a></p>
                        </Grid>
                    </form>


                </Grid>

            </Grid>
        </Grid>
    )
}

export default LoginForm;