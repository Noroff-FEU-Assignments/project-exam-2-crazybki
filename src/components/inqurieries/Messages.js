import React from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Accordion, Form, Row, Col, Button, Container } from 'react-bootstrap';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function Messages(props) {

    const schema = yup.object().shape({
        firstName: yup.string().required('Please enter your first name'),
        lastName: yup.string().required('Please enter you last name'),
        emailadress: yup.string('Please enter a email adress so we can respond to your message').required('Please enter a valid email'),
        headline: yup.string().required('You have not written a title for your message'),
        message: yup.string().required('We recognize that you are a person of few words. But if you write a little bit more, it would be helpful.')
    })

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            hotelname: props.name
        }
    });

    async function submitMessage(data) {
        const response = await axios.post('http://localhost:1337/messages', data)
        reset();
    }

    console.log(watch)
    return (
        <>
            <Container>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Send us a questions about this hotel</Accordion.Header>
                        <Accordion.Body>
                            <Form onSubmit={handleSubmit(submitMessage)}>
                                <Form.Group className="mb-3">
                                    <Row>
                                        <Col>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="input" {...register('firstName', { required: true })} placeholder="First name" />
                                            {errors.firstName && <p className="errormsg">{errors.firstName.message}</p>}
                                        </Col>
                                        <Col>
                                            <Form.Label>Last name:</Form.Label>
                                            <Form.Control {...register('lastName', { required: true })} placeholder="Last name" />
                                            {errors.lastName && <p className="errormsg">{errors.lastName.message}</p>}
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Email Adress:</Form.Label>
                                    <Form.Control type="email" {...register('emailadress', { required: true })} placeholder="Email adress" />
                                    {errors.emailadress && <p className="errormsg">{errors.emailadress.message}</p>}

                                    <Form.Label>Title:</Form.Label>
                                    <Form.Control {...register('headline', { required: true })} />
                                    {errors.headline && <p className="errormsg">{errors.headline.message}</p>}
                                </Form.Group>

                                <Form.Label>Message:</Form.Label>
                                <Form.Control as="textarea" rows={3} {...register('message', { required: true })} placeholder="Write your message here" />
                                {errors.message && <p className="errormsg">{errors.message.message}</p>}
                                <Button className="submitbtn" type="submit">Send message</Button>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </>
    );
}

export default Messages

