import React from "react";
import './reasons.css';
import Grid from '@material-ui/core/Grid';
import IconCalendar from '../../assets/calendar.png';
import Friends from '../../assets/friendship.png';
import Drawing from '../../assets/drawing.png';



function Reasons() {

    return (
        <Grid id="containerReason">
            <Grid container justify="center" >
                <h2 id="why">Why PlayDatery?</h2>
            </Grid>
            <Grid container justify="center" >

                <Grid >
                    <div className="reason">
                        <Grid container justify="center">
                            <img src={IconCalendar} alt="Calendar" className="icon"></img>
                        </Grid>
                        <div className="copy">
                            Easy way for parents to keep track of playdates. You can host or drop the kids off and have some "me-time".
                        </div>
                    </div>
                </Grid>
                <Grid >
                    <div className="reason">
                        <Grid container justify="center">
                            <img src={Friends} alt="Friends" className="icon"></img>
                        </Grid>
                        <div className="copy">
                            Both parents and kids can connect with old friends and make new ones.
                        </div>
                    </div>
                </Grid>
                <Grid >
                    <div className="reason">
                        <Grid container justify="center">
                            <img src={Drawing} alt="Drawing" className="icon"></img>
                        </Grid>
                        <div className="copy">
                            Kids can enjoy doing fun activities together. Keep active, social, and playful!
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Grid>

    )
}

export default Reasons;

// Icons made by < a href = "http://www.freepik.com/" title = "Freepik" > 
// Freepik</a > from < a href = "https://www.flaticon.com/" title = "Flaticon" > www.flaticon.com</a >

