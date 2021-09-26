import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import NewHotels from './NewHotels';

function PublishHotels() {
    return (
        <>
            <NewHotels />
        </>
    )
}

export default PublishHotels
