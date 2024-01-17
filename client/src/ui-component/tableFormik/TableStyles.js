import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  border: ${({ error }) => (error ? '1px solid red' : '1px solid grey')};
  border-radius: 5px;
`;

export const TableHeaderComponent = styled.thead`
  width: 100%;
  display: flex;
  padding: 5px 0;
  font-size: 10px;
  border-bottom: ${({ error }) => (error ? '1px solid red' : '1px solid grey')};
`;

export const TableHeaderItem = styled.th`
  width: ${({ width }) => width};
  padding: 0 5px;
  color: ${({ error }) => (error ? 'red' : 'black')};
  font-weight: 400;
  text-align: center;
`;

export const TableBodyComponent = styled.div``;

export const TableBodyRow = styled.tbody`
  width: 100%;
  display: flex;
  padding: 5px 0;
  font-size: 10px;
  align-items: baseline;

  &:nth-child(even) {
    background: #efefef;
  }
`;

export const TableBodyCol = styled.td`
  ${({ styles }) => styles}
  width: ${({ width }) => width};
  white-space: pre-wrap;
  word-break: break-all;
  padding: 0 5px;
  text-align: ${({ textAlign }) => textAlign};
  color: ${({ error }) => (error ? 'red' : 'black')};
  text-align: center;
`;
