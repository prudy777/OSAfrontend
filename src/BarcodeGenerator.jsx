import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import './Register.jsx';

const BarcodeGenerator = () => {
    const [registrationUrl, setRegistrationUrl] = useState('');

    useEffect(() => {
        // Set the registration URL dynamically
        setRegistrationUrl(`${window.location.origin}/register`);
    }, []); // Runs once on mount

    return (
        <div className='bg-blue-200'>
            <div className='flex flex-col text-center items-center justify-center border border-blue-400'>
            <div className='mt-20'>
            <h2 className='mt-10 text-blue-600 font-bold text-3xl mb-10'>Patient Registration Barcode</h2>
            </div>
            <QRCode
                className="qr"
                value={registrationUrl}
                size={400}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
            />
            <p className='mt-3 mb-5 font-bold'>Scan to register a patient</p>
 
            </div>       
            
        </div>
    );
};

export default BarcodeGenerator;
