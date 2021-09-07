import React from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';

function Messages(props) {

    const { register, handleSubmit, watch, reset, formState: { error } } = useForm({
        defaultValues: {
            hotelname: props.name
        }
    });

    async function submitMessage(data) {
        const response = await axios.post('http://localhost:1337/messages', data)
        console.log(response.data)
        reset()
    }

    console.log(watch)
    return (
        <form onSubmit={handleSubmit(submitMessage)}>
            <div>
                <label>First Name:</label>
                <input {...register('firstName', { required: true })} placeholder="First name" />
            </div>

            <div>
                <label>Last name:</label>
                <input {...register('lastName', { required: true })} placeholder="Last name" />
            </div>

            <div>
                <label>Email Adress:</label>
                <input {...register('emailadress', { required: true })} placeholder="Email adress" />
            </div>
            <div>
                <label>Title:</label>
                <input {...register('headline', { required: true })} />
            </div>

            <div>
                <label>Message:</label>
            </div>
            <div>
                <textarea{...register('message', { required: true })} placeholder="Write your message here"></textarea>
            </div>
            <div>
                <input type="submit" />
            </div>
        </form>
    );
}

export default Messages
