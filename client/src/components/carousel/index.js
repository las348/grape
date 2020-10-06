import React from 'react';
// import Carousel from 'nuka-carousel';
import pic3 from './Img/marisa-howenstine-Cq9slNxV8YU-unsplash.jpg';




export default class extends React.Component {

  render() {
    return (
      <div style={{borderBottom: "thick solid #2285c3"}}>
        <img src={pic3} alt=""></img>
      {/* <Carousel
        autoplay={true}
        withoutControls={true}
        wrapAround={true}
        initialSlideHeight='100%'
      >
        <img src={pic3} alt="Kids playing" />
        <img src={pic1} alt="Kids playing" />
        <img src={pic2} alt="Kids playing" />
        <img src={pic4} alt="Kids playing" />
      </Carousel> */}
      </div>
    );
  }
}