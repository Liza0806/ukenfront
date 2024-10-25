import React from 'react';
import { LiqPayWidget } from '../../components/paymentBth/paymentBtn';

const PaymentPage: React.FC = () => {
 /// amount, currency, description, orderId 
 const amount = 1;
 const currency = "UAH";
 const description = "test"
 const orderId = '12345';
  return (<div>PaymentPage
    <LiqPayWidget amount={amount} currency={currency} description={description} orderId={orderId}/>
  </div>)
};

export default PaymentPage;
