import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51Q0mB5LjWepqJ5T3VejIuLdhb362wsSVLgNxNNcNyW9qV7AogAVHSzWvHv57oaeAG0xcyMmdmIYmRBCjJavMtKch00PoFnZlv8'

    const onToken = token => {
        console.log(token);
        alert('Payment Successfull')
    }

    return(
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        
        />
    )
};

export default StripeCheckoutButton;
