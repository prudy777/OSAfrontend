import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import './BarcodeGenerator.css';
import './Register.jsx';

const BarcodeGenerator = () => {
    const [registrationUrl, setRegistrationUrl] = useState('');

    useEffect(() => {
        // Set the registration URL dynamically
        setRegistrationUrl(`${window.location.origin}/register`);
    }, []); // Runs once on mount

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Patient Registration Barcode</h2>
            <QRCode
                className="qr"
                value={registrationUrl}
                size={400}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
            />
            <p>Scan to register a patient</p>
        </div>
    );
};

export default BarcodeGenerator;
