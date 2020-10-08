import React from "react";
import Testimonials from "../components/Testimonials/testimonials";
import Homepic from "../components/Homepic/index";
import Reasons from '../components/Reasons/reasons';

function PublicHome() {

    return (
        <div>
            <Homepic />
            <Reasons />
            <Testimonials />
        </div>
    )
}

export default PublicHome;