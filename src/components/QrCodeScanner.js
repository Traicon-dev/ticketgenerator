import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import "./QrCodeGenerator.css";

const QrCodeScanner = (props) => {
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleResult = async (result) => {
    if (result) {
      try {
        const qrCodeData = JSON.parse(result.text);
        setLoading(true);
        setError(null);

        const response = await axios.get(`https://traiconevents.com/test.php?email=${(qrCodeData.email)}`,{
           responseType: 'blob',
        });
       
        console.log(response)

        if (response.data) {
          const imageUrl = URL.createObjectURL(response.data);
          setQrCodeImage(imageUrl);
        }else {
          setError('QR code not found in the database.');
        }
      } catch (error) {
        console.error('Error fetching QR code from the database:', error);
        setError('Error fetching QR code from the database.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handlePrint = () => {
    if (qrCodeImage) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`<img src="${qrCodeImage}" alt="QR Code" style="width: 100%;" />`);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', marginTop:"40px" }}>QR Code Scanner</h2>
      <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', border: '2px solid #ccc', borderRadius: '10px', padding: '20px' }}>
        <QrReader
          onResult={handleResult}
          onError={handleError}
          style={{ width: '100%' }}
        />
      </div>
      {loading && <p style={{ marginTop: '20px' }}>Loading...</p>}
      {error && <p style={{ marginTop: '20px', color: 'red' }}>{error}</p>}
      {qrCodeImage && (
        <div className='krimage' style={{ marginTop: '20px' }}>
          <img src={qrCodeImage} alt="QR Code" style={{ maxWidth: '100%', borderRadius: '10px' }} />
          <button onClick={handlePrint} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', borderRadius: '5px', color: '#fff', border: 'none', cursor: 'pointer' }}>Print QR Code</button>
        </div>
      )}
    </div>
  );
};

export default QrCodeScanner;
