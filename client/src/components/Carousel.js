import React from "react";
import { Carousel } from "react-responsive-carousel";
import image1 from "../images/1.jpg"
import image2 from "../images/2.jpeg"
import image4 from "../images/4.jpg"
import image5 from "../images/carousel1.jpg"
import image6 from "../images/carousel2.jpg"
import { Wave1 } from "./common/animation";
export default () => (
<>
 
 <h1  style={{
               fontSize:'70px'
          }} className="font-weigh-bold text-center">Real Estate Prediction</h1>
<Carousel autoPlay>    
    <div className="bg-warning">
    <img src={image2} className="img-fluid rounded-circle w-50 h-50 mx-auto d-block"/>   
     </div>
     <div className="bg-warning">
    <img src={image1} className="img-fluid rounded-circle w-50 h-50  " />
     </div>
  <div className="bg-warning">
    <img src={image2} className="img-fluid rounded-circle w-50 h-50 mx-auto d-block"/>
      
    </div>
     
  </Carousel>
  </>
);
