import React from "react";
import Testimonials from "../components/Testimonials/testimonials";
import Carousel from '../components/Carousel/carousel';
import Reasons from '../components/Reasons/reasons';

function PublicHome() {

    return (
        <div>
            <Carousel />
            <Reasons />
            <Testimonials />
        </div>
    )
}

export default PublicHome;