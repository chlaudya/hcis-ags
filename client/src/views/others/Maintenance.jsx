import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Row, Col } from 'reactstrap';
import underConstruction from 'assets/images/under-construction.svg';

const Maintenance = () => {
  return (
    <Row>
      <Col sm="12">
        <Card>
          <CardBody className="text-center p-3" style={{ backgroundColor: '#F6FCFF' }}>
            <img
              src={underConstruction}
              alt="underMaintenance"
              className="img-fluid align-self-center mt-75"
              style={{ maxWidth: '400px' }}
            />
            <h1
              style={{
                fontSize: '3rem',
                fontWeight: 600,
                margin: '15px 0px'
              }}
            >
              This page is currently <br />
              under construction.
            </h1>
            <p
              style={{
                maxWidth: '960px',
                margin: '0 auto',
                fontSize: '17px'
              }}
            >
              Sorry for the inconvenience but we’re performing some maintenance at the moment.
            </p>
            <Link to="/" className="btn btn-primary mt-1">
              Back to Dashboard
            </Link>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default Maintenance;
