import React from 'react';
import pic3 from './marisa-howenstine-Cq9slNxV8YU-unsplash.jpg';
import Grid from '@material-ui/core/Grid';
import "./homepic.css";

function Homepic() {

    return (
        <Grid>
            <img src={pic3} alt="kids playing with blocks" id="homepic"></img>
        </Grid>
    );
}

export default Homepic;