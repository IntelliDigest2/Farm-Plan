import { Link } from 'react-router-dom';

// export const columns = [
//   { field: 'id', headerName: 'ID', width: 80 },
//   { field: 'productName', headerName: 'Name', width: 140 },
//   { field: 'category', headerName: 'Category', width: 160 },

//   {
//     field: 'description',
//     headerName: 'Description',
//     width: 140,
//   },
//   {
//     field: 'price',
//     headerName: 'Price ($)',
//     type: 'number',
//     width: 120,
//   },
//   {
//     field: 'image',
//     headerName: 'Image',
//     width: 140,
//   },
//   {
//     field: 'action',
//     headerName: 'Action',
//     width: 140,
//     renderCell: (params) => {
//       return (
//         <>
//           <button className='productEdit'>Edit</button>
//           <button className='productDelete'>Delete</button>
//         </>
//       );
//     },
//   },
// ];

export const rows = [
  {
    id: 1,
    productName: 'Harvester',
    category: 'Manual',
    description: 'Farm Equipment',
    price: 5400,
    image: 'https://s3.amazonaws.com/',
  },
  {
    id: 2,
    productName: 'Cultivator',
    category: 'Manual',
    description: 'Farm Equipment',
    price: 3213,
    image: 'https://s3.amazonaws.com/',
  },
  {
    id: 3,
    productName: 'Tractor',
    category: 'Manual',
    description: 'Farm Equipment',
    price: 28312,
    image: 'https://s3.amazonaws.com/',
  },
];
