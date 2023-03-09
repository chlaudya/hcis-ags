/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Input, Label, Row, Spinner } from 'reactstrap';
import { Form, Formik } from 'formik';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { FormField } from 'ui-component/form-field';
import MainCard from 'ui-component/cards/MainCard';
import { getStateMasterJabatan } from 'store/stateSelector';
import { jabatanValidationSchema } from './jabatan.validation';
import {
  EDUCATION,
  GENDER,
  IS_ACTIVE,
  MARITAL_STATUS,
  RELIGION,
  TUNJANGAN
} from 'constants/general.constant';
import { INITIAL_VALUES_JABATAN } from './jabatan.const';
import { getMasterJabatanDetail, updateMasterJabatan } from 'store/actions/master-jabatan';

const FormFieldMasterJabatan = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { masterJabatanDetail, isSubmitting } = useSelector(getStateMasterJabatan);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES_JABATAN);

  useEffect(() => {
    if (state) {
      dispatch(getMasterJabatanDetail({ ...state }));
    }
  }, [state]);

  useEffect(() => {
    setInitialValues(masterJabatanDetail);
  }, [masterJabatanDetail]);

  const redirectToMasterJabatan = () => {
    navigate('/human-capital/master-jabatan');
  };

  const handleSubmit = (values, isValid) => {
    console.log(isValid);
    if (state) {
      dispatch(
        updateMasterJabatan({ ...values, karyawanId: state.karyawanId }, redirectToMasterJabatan)
      );
    } else {
      dispatch(updateMasterJabatan({ ...values }, redirectToMasterJabatan));
    }
  };

  return (
    <Formik
      validateOnMount={true}
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={jabatanValidationSchema}
    >
      {({ values, isValid }) => {
        return (
          <Form>
            <MainCard
              title={state ? 'Edit Data Karyawan' : 'Input Data Karyawan'}
              iconAction={ArrowBackIcon}
              onClickIcon={redirectToMasterJabatan}
            >
              <Row>
                <Col>
                  <FormField
                    className="mb-2"
                    id="TxtJabatanId"
                    name="jabatanId"
                    label="Jabatan ID"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtJabatanName"
                    name="jabatanName"
                    label="Jabatan Name"
                    tag="input"
                  />
                  <FormField
                    className="mb-2"
                    id="TxtJabatanDesc"
                    name="jabatanDesc"
                    label="Jabatan Description"
                    tag="input"
                  />
                </Col>
                <Col>
                  <FormField
                    className="mb-2"
                    id="DrpTunjangan"
                    name="tunjangan"
                    label="Tunjangan"
                    tag="select"
                    options={TUNJANGAN}
                  />
                  <FormField
                    className="mb-2"
                    id="DrpIsActive"
                    name="isActive"
                    label="Is Active"
                    tag="select"
                    options={IS_ACTIVE}
                  />
                </Col>
              </Row>

              <Button
                color="primary"
                className="m-2 pe-4 ps-4"
                type="submit"
                disabled={!isValid}
                onClick={() => handleSubmit(values, isValid)}
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" />
                    <span> Loading</span>
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </MainCard>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormFieldMasterJabatan;
