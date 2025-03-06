import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import html2canvas from 'html2canvas';
import './QrCodeGenerator.css';
import ticket from '../images/ticket.jpg';
import loaderImg from '../images/loader.svg';

const Container = styled.div`
  text-align: center;
`;

const InputField = styled.input`
  margin-bottom: 10px;
  display: block;
`;

const Loader = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #00000070;
  backdrop-filter: blur(10px);
  z-index: 1000;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    width: 200px;
  }
`;

const Ticket = ({formData}) => {
  return(
    <>
        <div className="qr-box">
          <img src={ticket} alt="logo" />
          <div className="regnum">{formData.regnum}</div>
          <div className="name">{formData.name}</div>
        </div>
    </>
  )
}

const QrCodeGenerator = () => {
  const [formData, setFormData] = useState({
    regnum: '',
    name: '',
    clientsemail: '',
    yourname:'',
    youremail: '',
    job: '',
    yourphone:''
  });

  const [loading, setLoading] = useState(false); // Loader state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const qrBox = document.querySelector('.qr-box');
      if (!qrBox) {
        console.error('Error: .qr-box not found in DOM');
        setLoading(false);
        return;
      }


      console.log('Generating QR code image...');
      const canvas = await html2canvas(qrBox);
      console.log('Converting canvas to Blob...');
      
      await new Promise((resolve) => {
        canvas.toBlob(async (blob) => {
          console.log('Blob created', blob);

          const formDataWithBlob = new FormData();
          Object.keys(formData).forEach((key) =>
            formDataWithBlob.append(key, formData[key])
          );
          formDataWithBlob.append('qrCodeImage', blob, 'qrcode.png');

          console.log('Form data being sent to server:', formData);
          console.log('Submitting form data with Blob...');

          await axios.post('https://traiconevents.com/dcis2025/philippines/ticket_generator/submit.php', formDataWithBlob, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log('Form submitted successfully');
          resolve(); 
        }, 'image/png');
      });

      setFormData({
        regnum: '',
        name: '',
        clientsemail: '',
        yourname:'',
        youremail: '',
        job: '',
        yourphone:''
      }); // Reset form data
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      {loading && (
        <Loader>
          <img src={loaderImg} alt="Loading..." />
        </Loader>
      )}
      <Container className="qrgf">
        <h1 className="head">GENERATE VIP TICKET FOR DCIS PHILIPPINES</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="regnum"
            value={formData.regnum}
            onChange={handleChange}
            placeholder="Enter Registration Number"
            className="inf"
          />
          <InputField
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Client's Name"
            className="inf"
          />
          <InputField
            type="email"
            name="clientsemail"
            value={formData.clientsemail}
            onChange={handleChange}
            placeholder="Enter Client's Email"
            className="inf"
          />
              <InputField
            type="text"
            name="yourname"
            value={formData.yourname}
            onChange={handleChange}
            placeholder="Enter Your Full Name"
            className="inf"
          />
          <InputField
            type="text"
            name="youremail"
            value={formData.youremail}
            onChange={handleChange}
            placeholder="Enter Your Mail"
            className="inf"
          />
          
            <InputField
            type="text"
            name="job"
            value={formData.job}
            onChange={handleChange}
            placeholder="Enter Your Job - Title"
            className="inf"
          />
             <InputField
            type="text"
            name="yourphone"
            value={formData.yourphone}
            onChange={handleChange}
            placeholder="Enter Your Phone Number"
            className="inf"
          />
          <button type="submit">Submit</button>
        </form>
        <div className="qr-hide"></div>
        <Ticket formData={formData} />
      </Container>
    </>
  );
};

export default QrCodeGenerator;
