import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


// TODO
const stipePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = ({badge}) => {
    return (
        <div className=' min-h-screen py-10'>
            <h1 className='text-center font-bold text-indigo-700 text-2xl my-8'>Payment gateway</h1>
            <Elements stripe={stipePromise}>
                <div className='max-w-sm mx-auto'>
                    <CheckoutForm badge={badge}></CheckoutForm>
                </div>
            </Elements>
        </div>
    );
};

export default Payment;