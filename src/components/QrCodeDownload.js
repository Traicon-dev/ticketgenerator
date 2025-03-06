import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const InputField = styled.input`
  margin-bottom: 10px;
  display: block;
`;

const QrCodeDownload = () => {
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadMessage, setDownloadMessage] = useState('');

  const handleDownloadEmailChange = (e) => {
    setDownloadEmail(e.target.value);
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      console.log('Download email:', downloadEmail);
      const response = await axios.get(`https://traiconevents.com/dcis2025/philippines/ticket_generator/submit.php?regnum=${downloadEmail}`, {
        responseType: 'blob', // Ensure response type is set to Blob
      });
  
      console.log('Response:', response);

      if (response.data) {
        // Create a URL for the Blob object
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Your_Ticket.png');
        document.body.appendChild(link);
        link.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(url);

        setDownloadMessage('QR Code downloaded successfully!');
      } else {
        setDownloadMessage('QR code not found for the provided email.');
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
      setDownloadMessage('Error downloading QR code. Please try again later.');
    }
  };

  return (
    <div className="qrgf">
      <form onSubmit={handleDownload}>
        <InputField
          type="text"
          name="downloadEmail"
          value={downloadEmail}
          onChange={handleDownloadEmailChange}
          placeholder="Enter Registration Number for Download"
          className="inf"
        />
        <button type="submit">
          Download Ticket
        </button>
      </form>
      {downloadMessage && <p>{downloadMessage}</p>}
    </div>
  );
};

export default QrCodeDownload;
