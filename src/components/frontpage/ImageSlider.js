import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

function ImageSlider(props) {
    console.log(props.images)
    return (
        <>
            <Carousel fade>
                {props.images.map(function (imgs) {
                    console.log(imgs)
                    return <Carousel.Item interval={5000} key={imgs.updated_at}>
                        <img
                            key={imgs.name}
                            className="d-block w-100 imgcontainer"
                            src={`https://aqueous-reef-33257.herokuapp.com${imgs.url}`}
                            alt="displays hotel images"
                        />
                    </Carousel.Item>
                })}
            </Carousel>
        </>
    )
}

export default ImageSlider
