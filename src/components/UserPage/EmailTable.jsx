import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,  Box } from '@material-ui/core';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@material-ui/icons';
import Pagination from '@mui/material/Pagination';
import { ENDPOINT_API } from "../../config/API";
const EmailTable = () => {
  const [emails, setEmails] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get(`${ENDPOINT_API}emails/?page=${page}`, { withCredentials: true })
      .then(response => {
        setEmails(response.data.results.filter(email => email.sender === 'current_user'));
        setCount(response.data.count);
      })
      .catch(error => console.error(error));
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const pageCount = Math.ceil(count / 10);

  return (
    <div className='table__container'>
      <TableContainer component={Paper}>
        <Table aria-label="email table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Subject</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emails.map(email => (
              <TableRow key={email.id}>
                <TableCell component="th" scope="row">
                  {email.id}
                </TableCell>
                <TableCell>{email.recipient}</TableCell>
                <TableCell>{email.subject}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
          size="large"
          color="primary"
          showFirstButton
          showLastButton
          renderItem={(item) => {
            switch (item.type) {
              case 'first':
                return <FirstPage />;
              case 'last':
                return <LastPage />;
              case 'previous':
                return <KeyboardArrowLeft />;
              case 'next':
                return <KeyboardArrowRight />;
              default:
                return (
                  <Pagination.Item
                    component={Box}
                    borderColor="transparent"
                    fontWeight={page === item.page ? 'bold' : 'normal'}
                    {...item}
                  />
                 );
            }
          }}
        /> 
      </Box>
    </div>
  );
};

export default EmailTable;
