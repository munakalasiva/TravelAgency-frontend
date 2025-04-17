import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './index.css';

const Dashboard = () => {
  var settings = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

 

  const cards = [
    {
      id: 1,
      
      title: "Best Price Guarantee",
      description: "At our Travels, we guarantee the best prices on flights, hotels, and holiday packages.Travel worry-free with our unbeatable price assurance!",
    },
    {
      id: 2,
      
      title: "Easy Booking",
      description: "Quick and simple reservations for flights, hotels, and transport.Enjoy a smooth booking experience with just a few clicks!",
    },
    {
      id: 3,
     
      title: "24/7 Customer Care",
      description: "Our dedicated team is available 24/7 to assist you with bookings, changes, and inquiries.Enjoy hassle-free travel with instant support at anytime!",
    },
  ];
  return (
    <>
    <div className="slider-container">
    <Slider {...settings}>
      <div>
        <img className="banner" src="/banner1.webp" alt="Banner" style={{ width: "100%", height: "auto"}} />
      </div>
      <div>
        <img src="/travel2.webp" alt="Banner" style={{ width: "100%", height: "auto" }} />
      </div>
    </Slider>
    </div>

    <div className="content">
      <h1>Why Book With Us </h1>
      <p>
      Book your tickets hassle-free with our travel agency. We offer easy and secure flight,
       train, and bus bookings at the best prices. Get instant confirmation, 24/7 customer support, 
       and exclusive travel deals. Plan your journey with us and travel stress-free!
      </p>
    </div>
    <div>
    <div className="card-container">
      <div className="cards-row">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
};

export default Dashboard;
