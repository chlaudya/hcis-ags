import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import notAuthImg from 'assets/images/unauthorized.jpg';

const NotAuthorized = () => {
  return (
    <Card className='shadow-none' style={{ backgroundColor: '#F6FCFF', height: '80vh', paddingTop:'3rem'}}>
      <CardBody className='text-center'>
        <img
          src={notAuthImg}
          alt='notAuthImg'
          className='img-fluid align-self-center'
          style={{ maxWidth: '400px' }}
        />
        <h1 style={{ fontSize: '35px', fontWeight: '700' }}>
          You have no access to this page.
        </h1>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          Sorry, we couldn’t show this page please contact the administrator
        </p>
      </CardBody>
    </Card>
  );
};
export default NotAuthorized;
