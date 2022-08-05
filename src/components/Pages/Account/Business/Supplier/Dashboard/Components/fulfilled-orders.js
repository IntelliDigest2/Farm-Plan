export const columnsf = [
  { field: 'id', headerName: 'Order ID', width: 80 },
  { field: 'orderName', headerName: 'Customer', width: 180 },

  {
    field: 'deliveryDate',
    headerName: 'Delivery Date',
    type: 'date',
    width: 160,
  },
  {
    field: 'dateFulfilled',
    headerName: 'Date fulfilled',
    type: 'date',
    width: 160,
  },
  {
    field: 'price',
    headerName: 'Revenue ($)',
    type: 'number',
    width: 160,
  },
];

export const rowsf = [
  {
    id: 20290,
    items: 'Harvester, Cultivator',
    orderName: 'Investcorp',
    deliveryDate: '25/10/2022',
    dateFulfilled: '23/10/2022',
    price: 5400,
    quantity: 3,
  },
];
