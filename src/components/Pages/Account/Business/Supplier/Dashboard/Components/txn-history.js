export const columns = [
  { field: 'id', headerName: 'Transaction ID', width: 130 },

  {
    field: 'date',
    headerName: 'Date',
    type: 'date',
    width: 160,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 160,
  },
  {
    field: 'amount',
    headerName: 'Amount paid ($)',
    type: 'number',
    width: 160,
  },
  {
    field: 'remarks',
    headerName: 'Remarks',
    width: 160,
  },
];

export const rows = [
  {
    id: 20290,
    date: '04/07/2022',
    status: 'Completed',
    amount: 28967,
    remarks: 'Supplier payout',
  },
];
