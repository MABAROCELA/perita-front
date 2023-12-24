import Carousel from 'react-bootstrap/Carousel';
import Foto0 from '../assets/foto0.jpg';
import Foto1 from '../assets/foto1.jpg';
import Foto2 from '../assets/foto2.jpg'
import Foto3 from '../assets/foto3.jpg'
import Foto4 from '../assets/foto4.jpg'
import Foto5 from '../assets/foto5.jpg'
import Image from 'react-bootstrap/Image';
import { useState } from 'react';
import { Link } from "react-router-dom";

import '../css/Home.css'

function Home() {
    
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel className="mx-1 home-carrousel" fade activeIndex={index} onSelect={handleSelect} interval={1300}>
            <Carousel.Item className="carrousel-item" >
                <Link to="/Login"><Image src={Foto0} className="d-block w-100" text="Cover" alt="fcover" /></Link>
            </Carousel.Item>
            <Carousel.Item className="carrousel-item" >
                <Image src={Foto1} className="d-block w-100" text="First slide" alt="first-slide" />
            </Carousel.Item>
            <Carousel.Item className="carrousel-item" > 
                <Image src={Foto2} className="d-block w-100" text="Second slide" alt="second-slide" />
            </Carousel.Item>
            <Carousel.Item className="carrousel-item" >
                <Image src={Foto3} className="d-block w-100" text="Third slide" alt="third-slide" />
            </Carousel.Item>
            <Carousel.Item className="carrousel-item" >
                <Image src={Foto4} className="d-block w-100" text="Fourth slide" alt="fourth-slide" />
            </Carousel.Item>
            <Carousel.Item className="carrousel-item" >
                <Image src={Foto5} className="d-block w-100" text="Fifth slide" alt="fifth-slide" />
            </Carousel.Item>
        </Carousel>
    );
}

export default Home;
