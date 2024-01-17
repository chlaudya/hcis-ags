import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { Button, Row } from 'reactstrap';
import MainCard from 'src/ui-component/cards/MainCard';
import { FormField } from 'src/ui-component/form-field';
import { ModalContext } from 'src/ui-component/modal';
import { employmentHistoryValidationSchema } from '../karyawan.validation';

const FormEmploymentHistory = ({ onSubmit }) => {
  const { hideModal } = useContext(ModalContext);

  return (
    <Formik
      validateOnMount={true}
      enableReinitialize={true}
      initialValues={{
        nama_perusahaan: '',
        tahun_mulai: '',
        tahun_berakhir: '',
        keterangan: ''
      }}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={employmentHistoryValidationSchema}
    >
      {({ values, isValid }) => {
        return (
          <Form>
            <MainCard>
              <Row>
                <FormField
                  className="mb-2"
                  id="TxtCompany"
                  name="nama_perusahaan"
                  label="Nama Perusahaan"
                  tag="input"
                />
                <FormField
                  className="mb-2"
                  id="TxtStartYear"
                  name="tahun_mulai"
                  label="Tahun Mulai"
                  tag="input"
                  type="number"
                />
                <FormField
                  className="mb-2"
                  id="TxtEndYear"
                  name="tahun_berakhir"
                  label="Tahun Berakhir"
                  tag="input"
                  type="number"
                />
                <FormField
                  className="mb-2"
                  id="TxtCompany"
                  name="keterangan"
                  label="Keterangan"
                  tag="input"
                  type="textarea"
                />
              </Row>

              <Button color="primary" className="m-2 pe-4 ps-4" type="submit" disabled={!isValid}>
                Save
              </Button>
              <Button
                outline
                color="danger"
                className="m-2 pe-4 ps-4"
                type="submit"
                onClick={hideModal}
              >
                Cancel
              </Button>
            </MainCard>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormEmploymentHistory;
