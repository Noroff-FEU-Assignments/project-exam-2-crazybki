import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';


function OrderHotelForm(props) {

    const { register, handleSubmit, watch, reset, formState: { error } } = useForm({
        defaultValues: {
            hotelname: props.hotelinfo
        }
    });

    async function submitBookedHotel(data) {
        const response = await axios.post('http://localhost:1337/hotel-reservations', data);
        console.log(response.data)
        reset();
    }


    return (
        <div>
            <h1>Booking for {props.hotelinfo}</h1>
            <form onSubmit={handleSubmit(submitBookedHotel)}>
                <div>
                    <label>First name:</label>
                    <input {...register('firstName', { required: true })} placeholder="first name" />
                </div>
                <div>
                    <label>Last name:</label>
                    <input {...register('lastName', { required: true })} placeholder="first name" />
                </div>
                <div>
                    <label>Emailadress:</label>
                    <input {...register('emailadress', { required: true })} placeholder="first name" />
                </div>
                <div>
                    <label>Mobile number:</label>
                    <input {...register('mobilenumber', { required: true })} placeholder="first name" />
                </div>
                <div>
                    <input type="date" id="birthday" name="birthday" />
                </div>
                <div>
                    <input type="date" id="birthday" name="birthday" />
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}

export default OrderHotelForm
