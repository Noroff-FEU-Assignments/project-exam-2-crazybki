import React from 'react'
import { Carousel } from "react-bootstrap";
//IMG SLIDER LIBRARY

function ImgSlider(props) {
    return (
        <Carousel className="d-block w-50">
            {props.images.map(item => (
                <Carousel.Item key={item.id}>
                    <img
                        className="d-block w-100"
                        src={`http://localhost:1337${item.url}`}
                        alt="hotel img"
                    />
                </Carousel.Item>
            ))
            }
        </Carousel >
    );
}

export default ImgSlider
