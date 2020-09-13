import React from 'react';
import Carousel from 'nuka-carousel';
import pic1 from './Img/robert-collins-tvc5imO5pXk-unsplash.jpg';
import pic2 from './Img/shirota-yuri-p0hDztR46cw-unsplash.jpg';
import pic3 from './Img/marisa-howenstine-Cq9slNxV8YU-unsplash.jpg';
import pic4 from './Img/mi-pham-FtZL0r4DZYk-unsplash.jpg';



export default class extends React.Component {

  render() {
    return (
      <div style={{borderBottom: "thick solid #2285c3"}}>
      <Carousel
        autoplay={true}
        withoutControls={true}
        wrapAround={true}
        initialSlideHeight='100%'
      >
        <img src={pic3} alt="Kids playing" />
        <img src={pic1} alt="Kids playing" />
        <img src={pic2} alt="Kids playing" />
        <img src={pic4} alt="Kids playing" />
      </Carousel>
      </div>
    );
  }
}