import React from 'react'
import { useState } from 'react'
function Payment() {
    const [amount, setamount] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(amount === ""){
        alert("please enter amount");
        }else{
          var options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            amount: amount *100,
            currency:"INR",
            name:"Vis-Utd",
            description:"for testing purpose",
            handler: function(response){
              alert(response.razorpay_payment_id);
              window.location.href = "/";
            },
            prefill: {
              name:"",
              email:"raghavagrawal895@gmail.com",
              contact:"8989431394"
            },
            notes:{
              address:"Razorpay Corporate office"
            },
            theme: {
              color:"#3399cc"
            },
          };
          var pay = new window.Razorpay(options);
          pay.open();
        }
      }

    return (
      <div className="App h-screen flex flex-col items-center justify-center bg-primary">
      <h2 className="text-3xl font-bold mb-4">Get your dream home at an affordable price.</h2>
      <p className="text-gray-600 mb-6">Enter the amount and get your dream home now.</p>
      <div className=" rounded-md">
        <input
          type="text"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setamount(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
      >
        Subscribe Now
      </button>
    </div>
    )
}

export default Payment