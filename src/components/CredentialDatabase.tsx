const columns = [
  // ... other columns ...
  { field: 'licenseNumber', headerName: 'License Number', width: 150 },
  { field: 'specialty', headerName: 'Specialty', width: 150 },
  // ... other columns ...
];

// Swap the positions
const swappedColumns = [
  // ... other columns ...
  { field: 'specialty', headerName: 'Specialty', width: 150 },
  { field: 'licenseNumber', headerName: 'License Number', width: 150 },
  // ... other columns ...
];

// Use swappedColumns instead of columns when rendering the table
// ... rest of the component code ...