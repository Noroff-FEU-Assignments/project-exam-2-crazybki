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

    const [confirmed, setConfirmed] = useState(false)

    const schema = yup.object().shape({
        Name: yup.string().required('A name is required'),
        Info: yup.string().required('Please write more than one sentence'),
        typeofhotel: yup.string().required('Please choose if this is going to be a hotel, B&B or Hostel'),
        description: yup.string().required('Please write more than one sentence.'),
        includes: yup.string().required('You havent included anything...this can be free wifi, free breakfast etc'),
        includes: yup.string().required('You havent included anything...this can be free wifi, free breakfast etc'),
        includes: yup.string().required('You havent included anything...this can be free wifi, free breakfast etc'),
        includes: yup.string().required('You havent included anything...this can be free wifi, free breakfast etc'),
        includes: yup.string().required('You havent included anything...this can be free wifi, free breakfast etc'),
        around: yup.string().required('Give a description what is close to the hotel'),
        around1: yup.string().required('Give a description what is close to the hotel'),
        around2: yup.string().required('Give a description what is close to the hotel'),
        around3: yup.string().required('Give a description what is close to the hotel'),
        around4: yup.string().required('Give a description what is close to the hotel'),
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
        setConfirmed(true);
        reset()
        setTimeout(() => {
            setConfirmed('');
        }, 4000);
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
                <h1>Add new</h1>
                <p>This where you launch a new hotel/B&B/Hostel. Remember fill out all input, since this will be displayed on frontpage and when users are clicking into a specific Hotel</p>
                <Form onSubmit={handleSubmit(submitNewHotel)}>
                    <Form.Group className="newhotels__input">
                        <Form.Label className="newhotel__label">Name of hotel</Form.Label>
                        <Form.Control type="input" {...register('Name')} placeholder="Name of hotel" />
                        {errors.Name && <p className="errormsg">{errors.Name.message}</p>}
                    </Form.Group>

                    <Form.Select aria-label="Selection of type of hotels" {...register("typeofhotel", { required: true })}>
                        <option value="Hotel">Hotel</option>
                        <option value="B&B">B&B</option>
                        <option value="Hostel">Hostel</option>
                    </Form.Select>

                    <Form.Group className="mb-3">
                        <Row>
                            <Col>
                                <Form.Label>Write a description</Form.Label>
                                <Form.Control as="textarea" rows={7} {...register("Info", {})} placeholder="Write a description of the hotel/B&B/hostel" />
                                {errors.Info && <p className="errormsg">{errors.Info.message}</p>}
                            </Col>
                            <Col>
                                <Form.Label>Name of hotel</Form.Label>
                                <Form.Control as="textarea" rows={7} {...register('description')} placeholder="Write a short description that will display on the frontpage" />
                                {errors.description && <p className="errormsg">{errors.description.message}</p>}
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Row>
                            <Col>
                                <Form.Label>This hotel includes</Form.Label>
                                <Form.Control {...register('includes')} placeholder="This hotel includes..." />
                                {errors.includes && <p className="errormsg">{errors.includes.message}</p>}
                                <Form.Control {...register('includes1')} placeholder="This hotel includes..." />
                                {errors.includes && <p className="errormsg">{errors.includes.message}</p>}
                                <Form.Control {...register('includes2')} placeholder="This hotel includes..." />
                                {errors.includes && <p className="errormsg">{errors.includes.message}</p>}
                                <Form.Control {...register('includes3')} placeholder="This hotel includes..." />
                                {errors.includes && <p className="errormsg">{errors.includes.message}</p>}
                                <Form.Control {...register('includes4')} placeholder="This hotel includes..." />
                                {errors.includes && <p className="errormsg">{errors.includes.message}</p>}
                            </Col>
                            <Col>
                                <Form.Label>Tourist attraction</Form.Label>
                                <Form.Control className="newhotel__input" type="input" {...register('around')} placeholder="This is what is around the hotel..." />
                                {errors.includes && <p className="errormsg">{errors.includes.message}</p>}
                                <Form.Control className="newhotel__input" type="input" {...register('around1')} placeholder="This is what is around the hotel..." />
                                {errors.includes && <p className="errormsg">{errors.includes.message}</p>}
                                <Form.Control className="newhotel__input" type="input" {...register('around2')} placeholder="This is what is around the hotel..." />
                                {errors.includes && <p className="errormsg">{errors.includes.message}</p>}
                                <Form.Control className="newhotel__input" type="input" {...register('around3')} placeholder="This is what is around the hotel..." />
                                {errors.includes && <p className="errormsg">{errors.includes.message}</p>}
                                <Form.Control className="newhotel__input" type="input" {...register('around4')} placeholder="This is what is around the hotel..." />
                                {errors.includes && <p className="errormsg">{errors.includes.message}</p>}
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Insert frontpage image</Form.Label>
                        <Form.Control onChange={handleUpload} required type="file" />
                        {errors.frontpageimage && <p className="errormsg">{errors.frontpageimage.message}</p>}
                        <Row>
                            <Form.Label>Insert images</Form.Label>
                            <Col>
                                <Form.Control onChange={handleimg} required type="file" />
                                {errors.frontpageimage && <p className="errormsg">{errors.frontpageimage.message}</p>}
                            </Col>
                            <Col>
                                <Form.Control onChange={handleimg1} required type="file" />
                                {errors.frontpageimage && <p className="errormsg">{errors.frontpageimage.message}</p>}
                            </Col>
                            <Col>
                                <Form.Control onChange={handleimg2} required type="file" />
                                {errors.frontpageimage && <p className="errormsg">{errors.frontpageimage.message}</p>}
                            </Col>
                            <Col>
                                <Form.Control onChange={handleimg3} type="file" />
                                {errors.frontpageimage && <p className="errormsg">{errors.frontpageimage.message}</p>}
                            </Col>
                        </Row>
                    </Form.Group>
                    <Button type="submit">Activate</Button>
                    {confirmed && <div className="newhotel__launched">Launched</div>}
                </Form>
            </Container>
        </>
    )
}

export default NewHotels
 //<FileUploads />
