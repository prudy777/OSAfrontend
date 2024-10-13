import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, TextField, Typography, Button } from '@mui/material';


const TestBookingsList = () => {
  const [testBookings, setTestBookings] = useState([]);
  const [editablePrices, setEditablePrices] = useState({});
  const [editableRanges, setEditableRanges] = useState({});
  const [editableInterpretations, setEditableInterpretations] = useState({});
  const [editableRemarks, setEditableRemarks] = useState({});
  const [selectedBookings, setSelectedBookings] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch test bookings on component mount
  useEffect(() => {
    const fetchTestBookings = async () => {
      try {
        const response = await axios.get('http://localhost:4000/test-bookings');
        const bookings = response.data;

        setTestBookings(bookings);

        // Initialize editable states
        const prices = {};
        const ranges = {};
        const interpretations = {};
        const remarks = {};

        bookings.forEach(booking => {
          booking.tests.forEach(test => {
            const key = `${booking.id}-${test.test_name}`;
            prices[key] = test.price_naira || test.rate;
            ranges[key] = test.reference_range || '';
            interpretations[key] = test.interpretation || '';
            remarks[key] = test.remark || '';
          });
        });

        setEditablePrices(prices);
        setEditableRanges(ranges);
        setEditableInterpretations(interpretations);
        setEditableRemarks(remarks);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch test bookings');
        setLoading(false);
      }
    };

    fetchTestBookings();
  }, []);

  // Calculate total price whenever selected bookings or prices change
  useEffect(() => {
    const calculateTotalPrice = () => {
      const selectedRows = testBookings.filter(booking => selectedBookings[booking.id]);
      const total = selectedRows.reduce((acc, booking) => {
        const bookingTotal = booking.tests.reduce((sum, test) => {
          const price = parseFloat(editablePrices[`${booking.id}-${test.test_name}`]) || 0;
          return sum + price;
        }, 0);
        return acc + bookingTotal;
      }, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [selectedBookings, editablePrices, testBookings]);

  // Handlers for editable fields
  const handlePriceChange = (id, testName, value) => {
    const key = `${id}-${testName}`;
    setEditablePrices(prev => ({  ...prev, [key]: value }));
  };

  const handleRangeChange = (id, testName, value) => {
    const key = `${id}-${testName}`;
    setEditableRanges(prev => ({  ...prev, [key]: value }));
  };

  const handleRemarkChange = (id, testName, value) => {
    const key = `${id}-${testName}`;
    setEditableRemarks(prev => ({  ...prev, [key]: value }));
  };

  const handleInterpretationChange = (id, testName, value) => {
    const key = `${id}-${testName}`;
    setEditableInterpretations(prev => ({  ...prev, [key]: value }));
  };

  const handleCheckboxChange = (id) => {
    setSelectedBookings(prev => ({
       ...prev,
      [id]: !prev[id],
    }));
  };

  // Handle PDF generation
  const handlePrint = async () => {
    const selectedRows = testBookings.filter(booking => selectedBookings[booking.id]);
    if (selectedRows.length === 0) {
      alert('No bookings selected for printing.');
      return;
    }
  
    const doc = new jsPDF();
    doc.text('Test Bookings', 14, 16);
  
    selectedRows.forEach(booking => {
      autoTable(doc, {
        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 20,
        head: [['ID', 'Patient No', 'Name', 'Test', 'Price (Naira)', 'Reference Range', 'Interpretation', 'Remark']],
        body: booking.tests.map(test => [
          booking.id,
          booking.patient_no,
          booking.name,
          test.test_name,
          editablePrices[`${booking.id}-${test.test_name}`] || '',
          editableRanges[`${booking.id}-${test.test_name}`] || '',
          editableInterpretations[`${booking.id}-${test.test_name}`] || '',
          editableRemarks[`${booking.id}-${test.test_name}`] || '',
        ]),
      });
    });
  
    doc.save('test-results.pdf');
  };
  

  // Save printed tests
  const savePrintedTests = async (tests) => {
    try {
      await axios.post('http://localhost:4000/printed-tests', { tests });
    } catch (err) {
      console.error('Error saving printed tests:', err);
    }
  };

  // Handle deletion of selected bookings
  const handleDeleteSelected = async () => {
    const selectedIds = testBookings
      .filter(booking => selectedBookings[booking.id])
      .map(booking => booking.id);

    if (selectedIds.length === 0) {
      alert('No bookings selected for deletion.');
      return;
    }

    try {
      await axios.post('http://localhost:4000/test-bookings/delete', { ids: selectedIds });
      setTestBookings(prev => prev.filter(booking => !selectedIds.includes(booking.id)));
      setSelectedBookings(prev => {
        const updated = {  ...prev };
        selectedIds.forEach(id => delete updated[id]);
        return updated;
      });
      setTotalPrice(prev => prev - selectedIds.length); // Adjust as needed
    } catch (err) {
      console.error('Error deleting selected bookings:', err);
    }
  };

  if (loading) {
    return <Container><Typography>Loading ..</Typography></Container>;
  }

  if (error) {
    return <Container><Typography color="error">{error}</Typography></Container>;
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        TEST RECORDS
      </Typography>
      <img src={Company} alt="Company Logo" style={{ display: 'block', margin: '0 auto 20px' }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    Object.keys(selectedBookings).length > 0 &&
                    Object.keys(selectedBookings).length < testBookings.length
                  }
                  checked={
                    testBookings.length > 0 &&
                    Object.keys(selectedBookings).length === testBookings.length
                  }
                  onChange={() => {
                    if (Object.keys(selectedBookings).length === testBookings.length) {
                      setSelectedBookings({});
                    } else {
                      const allSelected = {};
                      testBookings.forEach(booking => {
                        allSelected[booking.id] = true;
                      });
                      setSelectedBookings(allSelected);
                    }
                  }}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Patient No</TableCell>
              <TableCell>Lab No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Age Unit</TableCell>
              <TableCell>Panel</TableCell>
              <TableCell>Referred By</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Test Name</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Price (Naira)</TableCell>
              <TableCell>Reference Range</TableCell>
              <TableCell>Interpretation</TableCell>
              <TableCell>Remark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testBookings.map(booking =>
              booking.tests.map(test => (
                <TableRow key={`${booking.id}-${test.test_name}`}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedBookings[booking.id] || false}
                      onChange={() => handleCheckboxChange(booking.id)}
                    />
                  </TableCell>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.patient_no}</TableCell>
                  <TableCell>{booking.lab_no}</TableCell>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell>{booking.sex}</TableCell>
                  <TableCell>{booking.age}</TableCell>
                  <TableCell>{booking.age_unit}</TableCell>
                  <TableCell>{booking.investigation}</TableCell>
                  <TableCell>{booking.referred_by}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{test.test_name}</TableCell>
                  <TableCell>{test.rate}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={editablePrices[`${booking.id}-${test.test_name}`] || ''}
                      onChange={(e) => handlePriceChange(booking.id, test.test_name, e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{ width: '100px' }}
                      inputProps={{
                        min: 0,
                        style: { textAlign: 'left' },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editableRanges[`${booking.id}-${test.test_name}`]}
                      onChange={(e) => handleRangeChange(booking.id, test.test_name, e.target.value)}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editableInterpretations[`${booking.id}-${test.test_name}`]}
                      onChange={(e) => handleInterpretationChange(booking.id, test.test_name, e.target.value)}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editableRemarks[`${booking.id}-${test.test_name}`]}
                      onChange={(e) => handleRemarkChange(booking.id, test.test_name, e.target.value)}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" align="right" sx={{ marginTop: 2 }}>
        Total Price: {totalPrice}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Print
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDeleteSelected}>
          Delete Selected
        </Button>
      </div>
    </Container>
  );
};

export default TestBookingsList;
