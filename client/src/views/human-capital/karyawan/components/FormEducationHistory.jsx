import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { Button, Row } from 'reactstrap';
import MainCard from 'src/ui-component/cards/MainCard';
import { FormField } from 'src/ui-component/form-field';
import { ModalContext } from 'src/ui-component/modal';
import { educationHistoryValidationSchema } from '../karyawan.validation';
import { EDUCATION } from 'constants/general.constant';

const FormEducationHistory = ({ onSubmit }) => {
  const { hideModal } = useContext(ModalContext);

  return (
    <Formik
      validateOnMount={true}
      enableReinitialize={true}
      initialValues={{
        pendidikan: '',
        nama_sekolah: '',
        jurusan: '',
        asal_sekolah: '',
        tahun_mulai: '',
        tahun_berakhir: ''
      }}
      onSubmit={onSubmit}
      validationSchema={educationHistoryValidationSchema}
    >
      {({ isValid }) => {
        return (
          <Form>
            <MainCard>
              <Row>
                <FormField
                  className="mb-2"
                  id="TxtPendidikan"
                  name="pendidikan"
                  label="Pendidikan"
                  tag="select"
                  options={EDUCATION}
                />
                <FormField
                  className="mb-2"
                  id="TxtNamaSekolah"
                  name="nama_sekolah"
                  label="Nama Sekolah"
                  tag="input"
                />
                <FormField
                  className="mb-2"
                  id="TxtJurusan"
                  name="jurusan"
                  label="Jurusan"
                  tag="input"
                />
                <FormField
                  className="mb-2"
                  id="TxtAsalSekolah"
                  name="asal_sekolah"
                  label="Asal Sekolah"
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

export default FormEducationHistory;
