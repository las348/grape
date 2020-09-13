import React from 'react';
import './style.css';
import Grid from '@material-ui/core/Grid';

function Testimonials() {

    return (
        <Grid id="container-test">
            <Grid container justify="center" >
                <h2 id="testimonial" >Testimonials</h2>
            </Grid>
            <Grid container justify="center" >

                <Grid >
                    <div className="paper">
                        <div className="pattern">
                            <div className="content">
                                "Thank you Playdatery for making it easy for busy parents to schedule activities for the little ones!"
                            <p>-Becky G.</p>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid >
                    <div className="paper">
                        <div className="pattern">
                            <div className="content">
                                "My child has met old friends and made some new ones thanks to Playdatery. Thanks!"
                            <p>-Parvati P.</p>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid >
                    <div className="paper">
                        <div className="pattern">
                            <div className="content">
                                "Playdatery has helped my child keep busy and social while participating in many fun activities."
                            <p>-Sansa S.</p>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Testimonials;