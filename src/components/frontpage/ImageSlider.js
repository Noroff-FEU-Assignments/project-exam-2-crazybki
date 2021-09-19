import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

function ImageSlider(props) {
    console.log(props.images)
    return (
        <>
            <Container>
                <Col>
                    <Carousel fade>
                        {props.images.map(function (img) {
                            return <Carousel.Item key={img.img}>
                                <img
                                    key={img.img}
                                    className="d-block w-100"
                                    src={`http://localhost:1337${img.url}`}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                        })}
                    </Carousel>
                </Col>
            </Container>
        </>
    )
}

export default ImageSlider
