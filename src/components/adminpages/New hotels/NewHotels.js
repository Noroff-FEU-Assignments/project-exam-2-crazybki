import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { Form, Row, Col, Container, Button } from "react-bootstrap"

function NewHotels() {

    let frontPageImg = '';
    let detailImg = '';
    let detailImg1 = '';
    let detailImg2 = '';
    let detailImg3 = '';

    const schema = yup.object().shape({
        Name: yup.string().required('test'),
        Info: yup.string().required('test'),
        description: yup.string().required('test'),
        includes: yup.string().required('test'),
        includes: yup.string().required('test'),
        includes: yup.string().required('test'),
        includes: yup.string().required('test'),
        includes: yup.string().required('test'),
        around: yup.string().required('test'),
        around1: yup.string().required('test'),
        around2: yup.string().required('test'),
        around3: yup.string().required('test'),
        around4: yup.string().required('test'),
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    async function submitNewHotel(data) {
        const formData = new FormData();

        formData.append('files.frontpageimage', frontPageImg, frontPageImg.name)
        formData.append('files.img', detailImg, detailImg.name)
        formData.append('files.img', detailImg1, detailImg.name)
        formData.append('files.img', detailImg2, detailImg.name)
        formData.append('files.img', detailImg3, detailImg.name)

        formData.append('data', JSON.stringify(data));
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        //console.log(frontPageImg)
        const postHotel = await axios.post('http://localhost:1337/hotels', formData)

        reset()
    }

    function handleUpload(e) {
        frontPageImg = e.target.files[0];
    }

    function handleimg(e) {
        detailImg = e.target.files[0];
    }

    function handleimg1(e) {
        detailImg1 = e.target.files[0];
    }

    function handleimg2(e) {
        detailImg2 = e.target.files[0];
    }

    function handleimg3(e) {
        detailImg3 = e.target.files[0];
    }


    return (
        <>
            <Container fluid="sm">
                <Form onSubmit={handleSubmit(submitNewHotel)}>
                    <Form.Group>
                        <Form.Label>Name of hotel</Form.Label>
                        <Form.Control type="input" {...register('Name')} placeholder="Name of hotel" />
                        {errors.Name && <p className="errormsg">{errors.Name.message}</p>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Row>
                            <Col>
                                <Form.Label>Write a description</Form.Label>
                                <Form.Control as="textarea" rows={6} {...register("Info", {})} placeholder="Write a description of the hotel/B&B/hostel" />
                            </Col>
                            <Col>
                                <Form.Label>Name of hotel</Form.Label>
                                <Form.Control as="textarea" rows={6} {...register('description')} placeholder="Write a short description that will display on the frontpage" />
                                {errors.Name && <p className="errormsg">{errors.Name.message}</p>}
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Row>
                            <Col>
                                <Form.Label>This hotel includes</Form.Label>
                                <Form.Control {...register('includes')} placeholder="This hotel includes..." />
                                <Form.Control {...register('includes1')} placeholder="This hotel includes..." />
                                <Form.Control {...register('includes2')} placeholder="This hotel includes..." />
                                <Form.Control {...register('includes3')} placeholder="This hotel includes..." />
                                <Form.Control {...register('includes4')} placeholder="This hotel includes..." />
                            </Col>
                            <Col>
                                <Form.Label>Describe what is around the hotel</Form.Label>
                                <Form.Control type="input" {...register('around')} placeholder="This is what is around the hotel..." />
                                <Form.Control type="input" {...register('around1')} placeholder="This is what is around the hotel..." />
                                <Form.Control type="input" {...register('around2')} placeholder="This is what is around the hotel..." />
                                <Form.Control type="input" {...register('around3')} placeholder="This is what is around the hotel..." />
                                <Form.Control type="input" {...register('around4')} placeholder="This is what is around the hotel..." />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Insert images</Form.Label>
                        <Form.Control onChange={handleUpload} type="file" />
                        <Row>
                            <Form.Label>Insert images</Form.Label>
                            <Col>
                                <Form.Control onChange={handleimg} type="file" />
                            </Col>
                            <Col>
                                <Form.Control onChange={handleimg1} type="file" />
                            </Col>
                            <Col>
                                <Form.Control onChange={handleimg2} type="file" />
                            </Col>
                            <Col>
                                <Form.Control onChange={handleimg3} type="file" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Button type="submit">Activate</Button>
                </Form>
            </Container>
        </>
    )
}

export default NewHotels
 //<FileUploads />
