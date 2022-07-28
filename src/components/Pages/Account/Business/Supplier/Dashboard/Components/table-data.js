export const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'orderName', headerName: 'Name', width: 140 },
  { field: 'items', headerName: 'Items', width: 160 },

  {
    field: 'deliveryDate',
    headerName: 'Delivery Date',
    type: 'date',
    width: 140,
  },
  {
    field: 'price',
    headerName: 'Price ($)',
    type: 'number',
    width: 110,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    width: 100,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.orderName || ''} ${params.row.items || ''}`,
  // },
];

export const rows = [
  {
    id: 1,
    items: 'Harvester, Cultivator',
    orderName: 'Investcorp',
    deliveryDate: '25/10/2022',
    price: 5400,
    quantity: 3,
    status: 'Confirmed',
  },
  {
    id: 2,
    items: 'Cultivator',
    orderName: 'John Doe',
    deliveryDate: '04/07/2022',
    price: 3213,
    quantity: 1,
    status: 'Pending',
  },
  {
    id: 3,
    items: 'Tractor',
    orderName: 'Simo Group',
    deliveryDate: '24/08/2022',
    price: 28312,
    quantity: 10,
    status: 'Rejected',
  },
  {
    id: 4,
    items: 'Automatic sprinklers',
    orderName: 'FuFarm Ltd',
    deliveryDate: '16/07/2022',
    price: 2312,
    quantity: 2,
    status: 'Confirmed',
  },
];
