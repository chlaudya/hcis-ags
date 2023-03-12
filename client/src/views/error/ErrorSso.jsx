import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Row, Col } from 'reactstrap';
import errorImg from 'assets/images/error-sso.png';

const ErrorSso = () => {
  return (
    <Row className="m-0">
      <Col sm="12">
        <Card className="bg-transparent shadow-none rounded-0 mb-0 w-100">
          <CardBody className="text-center">
            <img src={errorImg} alt="ErrorImg" className="img-fluid align-self-center mt-75" style={{ maxWidth: '350px' }} />
            <h1 className="font-large-2 my-2">Single Sign On Error!</h1>
            <p className="pt-2 mb-0">Sorry, we can't log you in.</p>
            <p> We cannot authenticate you using SSO!</p>
            <Link
              to="/"
              className="btn btn-primary mt-3 mb-5"
              onClick={() => {
                window.location.reload();
              }}
            >
              Refresh Page
            </Link>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default ErrorSso;
