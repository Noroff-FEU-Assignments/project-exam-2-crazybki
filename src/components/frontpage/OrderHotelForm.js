import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Modal, Button, Container, Row, Form, Col, Image } from 'react-bootstrap';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import orderimg from '../../images/icons/orderimg.jpg'


function OrderHotelForm(props) {

    const schema = yup.object().shape({
        firstName: yup.string().required('Please enter your first name'),
        lastName: yup.string().required('Please enter your last name'),
        emailadress: yup.string('Please enter your emailadress').email('Please enter a valid email'),
        mobilenumber: yup.string().required('Please enter you mobile number'),
        adress: yup.string().required('Please enter your adress'),
        city: yup.string().required('Please enter the city you are from'),
        from_date: yup.string().required('Please enter a date you want to book the hotel room'),
        to_date: yup.string().required('Please enter a date you want to book the hotel room')
    })

    const [sentMessage, setSentMessage] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            hotelname: props.hotelinfo,
            checkedin: false
        }
    });

    async function submitBookedHotel(data) {
        const response = await axios.post('https://aqueous-reef-33257.herokuapp.com/hotel-reservations', data);
        console.log(response.data)
        setSentMessage(true);
        setTimeout(() => {
            setSentMessage('');
        }, 3500);
        reset();
    }

    const values = [true];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    return (
        <>
            {values.map((v, idx) => (
                <Button key={idx} className="me-2 newhotel__btn" onClick={() => handleShow(v)}>
                    Order now!
                    {typeof v === 'string' && `below ${v.split('-')[0]}`}
                </Button>
            ))}

            <div>
                <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                    <Modal.Header closeButton></Modal.Header>

                    <Modal.Body>

                        <Image src={orderimg} fluid className="newhotel__img" />
                        <h1 className="orderform_heading">Booking for {props.hotelinfo}</h1>

                        <Container>
                            <Form onSubmit={handleSubmit(submitBookedHotel)}>
                                <Form.Group className="mb-3">
                                    <Row>
                                        <Col>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="input" {...register('firstName', { required: true })} placeholder="First name...." />
                                            {errors.firstName && <span>{errors.firstName.message}</span>}
                                        </Col>
                                        <Col>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="input" {...register('lastName', { required: true })} placeholder="Last name...." />
                                            {errors.lastName && <span>{errors.lastName.message}</span>}
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" {...register('emailadress', { required: true })} placeholder="Email adress...." />
                                    {errors.emailadress && <span>{errors.emailadress.message}</span>}
                                </Form.Group>

                                <Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Label>Mobile</Form.Label>
                                            <Form.Control type="mobile" {...register('mobilenumber', { required: true })} placeholder="Mobile number...." />
                                            {errors.mobilenumber && <span>{errors.mobilenumber.message}</span>}
                                        </Col>
                                        <Col>
                                            <Form.Label>Adress</Form.Label>
                                            <Form.Control type="input" {...register('adress', { required: true })} placeholder="Adress...." />
                                            {errors.adress && <span>{errors.adress.message}</span>}
                                        </Col>
                                        <Col>
                                            <Form.Label>City</Form.Label>
                                            <Form.Control type="input" {...register('city', { required: true })} placeholder="City...." />
                                            {errors.city && <span>{errors.city.message}</span>}
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Label>Book room from:</Form.Label>
                                            <Form.Control type="datetime-local" {...register('from_date', { required: true })} placeholder="from date" />
                                            {errors.from_date && <span>{errors.from_date.message}</span>}
                                        </Col>


                                        <Col>
                                            <Form.Label>Book room from:</Form.Label>
                                            <Form.Control type="datetime-local" {...register('to_date', { required: true })} placeholder="to date" />
                                            {errors.to_date && <span>{errors.to_date.message}</span>}
                                        </Col>
                                    </Row>
                                </Form.Group>
                                {sentMessage && <p>Thanks your message has been sent</p>}
                                <div className="newhotel__btncontainer">
                                    <Button type="submit" className="newhotel__btn">Book now</Button>
                                </div>
                            </Form>
                        </Container>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

export default OrderHotelForm
