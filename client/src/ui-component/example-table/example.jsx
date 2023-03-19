import { Print } from '@material-ui/icons';
import React from 'react';
import ReactExport from 'react-data-export';
import { Button } from 'reactstrap';

const Example = ({ dataTagihanKaryawan, dataJumlahTagihan }) => {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  console.log(dataTagihanKaryawan);

  const data = [
    {
      karyawan_nip: '200398',
      karyawan_name: 'Budi',
      jabatan_name: 'Boss',
      nama_proyek: 'bsd proyek',
      gaji: 1.0e7,
      tunjangan: 100001.0,
      gaji_dibayar: 1.0100001e7,
      manajemen_fee: 1010000.1000000001,
      total: 1.11100011e7
    }
  ];

  return (
    <>
      <ExcelFile
        element={
          <Button color="primary" className="p-2-2">
            <Print /> Generate
          </Button>
        }
      >
        <ExcelSheet
          data={dataTagihanKaryawan}
          name="Report Tagihan Gaji"
          children={<ExcelColumn label="TOTAL 2232" value="total" />}
        >
          <ExcelColumn label="No" value="no" style={{ border: 'top' }} />
          <ExcelColumn label="NIP" value="karyawan_nip" />
          <ExcelColumn label="NAMA PEGAWAI" value="karyawan_name" />
          <ExcelColumn label="TUGAS/JABATAN" value="jabatan_name" />
          <ExcelColumn label="TEMPAT TUGAS" value="nama_proyek" />
          <ExcelColumn label="GAJI" value="gaji" />
          <ExcelColumn label="TUNJANGAN" value="tunjangan" />
          <ExcelColumn label="GAJI DIBAYAR" value="gaji_dibayar" />
          <ExcelColumn label="MANAJEMEN FEE" value="manajemen_fee" />
          <ExcelColumn label="TOTAL" value="total" />
        </ExcelSheet>
      </ExcelFile>
    </>
  );
};

export default Example;
