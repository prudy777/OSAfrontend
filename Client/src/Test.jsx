import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  Container, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Checkbox, Typography, Button, Box
} from '@mui/material';
import { styled } from '@mui/system';

// Styled components for professional checkboxes
const StyledCheckbox = styled(Checkbox)({
  color: '#4caf50',
  '&.Mui-checked': {
    color: '#66bb6a',
  },
});

const HeaderCheckbox = styled(Checkbox)({
  color: '#1e88e5',
  '&.Mui-checked': {
    color: '#42a5f5',
  },
  '&.Mui-indeterminate': {
    color: '#fbc02d',
  },
});

const TestBookingsList = () => {
  const [testBookings, setTestBookings] = useState([]);
  const [selectedBookings, setSelectedBookings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch test bookings on component mount
  useEffect(() => {
    const fetchTestBookings = async () => {
      try {
        const response = await axios.get('http://localhost:4000/test-bookings');
        if (response.data && Array.isArray(response.data)) {
          setTestBookings(response.data);
        }
      } catch (err) {
        setError('Failed to fetch test bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchTestBookings();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedBookings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectAll = () => {
    const allSelected = Object.values(selectedBookings).every(Boolean);
    const newSelections = {};
    if (!allSelected) {
      testBookings.forEach((booking) => {
        newSelections[booking.test_id] = true;
      });
    }
    setSelectedBookings(newSelections);
  };

  const isAllSelected = testBookings.length > 0 &&
    Object.values(selectedBookings).filter(Boolean).length === testBookings.length;

  const isIndeterminate = Object.values(selectedBookings).some(Boolean) && !isAllSelected;

  const handlePrint = () => {
    const selectedRows = testBookings.filter((booking) => selectedBookings[booking.test_id]);
    if (!selectedRows.length) {
      alert('No bookings selected for printing.');
      return;
    }

    const doc = new jsPDF();
    doc.text('Test Bookings', 14, 16);
    autoTable(doc, {
      head: [['ID', 'Patient No', 'Lab No', 'Name', 'Sex', 'Age', 'Specimen', 'Investigation', 'Referred By', 'Date']],
      body: selectedRows.map((booking) => [
        booking.test_id,
        booking.patient_no,
        booking.lab_no,
        booking.name,
        booking.sex,
        booking.age,
        booking.specimen,
        booking.investigation,
        booking.referredBy,
        booking.date,
      ]),
    });
    doc.save('test-bookings.pdf');
  };

  const handleDeleteSelected = async () => {
    const selectedIds = Object.keys(selectedBookings).filter((id) => selectedBookings[id]);
    if (!selectedIds.length) {
      alert('No bookings selected for deletion.');
      return;
    }

    try {
      await axios.post('http://localhost:4000/test-bookings/delete', { ids: selectedIds });
      setTestBookings((prev) =>
        prev.filter((booking) => !selectedIds.includes(String(booking.test_id)))
      );
      setSelectedBookings({});
    } catch (err) {
      console.error('Error deleting selected bookings:', err);
    }
  };

  if (loading) return <Container><Typography>Loading...</Typography></Container>;
  if (error) return <Container><Typography color="error">{error}</Typography></Container>;

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>Test Records</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <HeaderCheckbox
                  indeterminate={isIndeterminate}
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Patient No</TableCell>
              <TableCell>Lab No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Specimen</TableCell>
              <TableCell>Investigation</TableCell>
              <TableCell>Referred By</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testBookings.map((booking) => (
              <TableRow key={booking.test_id}>
                <TableCell padding="checkbox">
                  <StyledCheckbox
                    checked={selectedBookings[booking.test_id] || false}
                    onChange={() => handleCheckboxChange(booking.test_id)}
                  />
                </TableCell>
                <TableCell>{booking.test_id}</TableCell>
                <TableCell>{booking.patient_no}</TableCell>
                <TableCell>{booking.lab_no}</TableCell>
                <TableCell>{booking.name}</TableCell>
                <TableCell>{booking.sex}</TableCell>
                <TableCell>{booking.age || 'N/A'}</TableCell>
                <TableCell>{booking.specimen}</TableCell>
                <TableCell>{booking.investigation}</TableCell>
                <TableCell>{booking.referredBy}</TableCell>
                <TableCell>{booking.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
          sx={{ marginRight: '10px' }}
        >
          Print
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </Button>
      </Box>
    </Container>
  );
};

export default TestBookingsList;
