import React, { PureComponent } from 'react';
import {
  LineChart,
  BarChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { DataGrid } from '@mui/x-data-grid';
import './dashboard.css';

import { data } from './Components/chart-data';
import { rows } from './Components/table-data';
import { Link } from 'react-router-dom';

function DashboardHome() {
  const columns = [
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
      field: 'action',
      headerName: 'Action',
      width: 140,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/confirm/' + params.row.id}>
              <button className='confirmOrderBtn'>Confirm order</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Navbar />
      <div className='dashboard-content'>
        <Sidebar className1='active' />
        <div className='main-content'>
          <h1>Dashboard</h1>
          <div className='overview-revenue-products'>
            <div className='overview-revenue'>
              <div className='overview-container'>
                <div className='overview-heading'>
                  <h4>Overview</h4>
                  <span>
                    <Box
                      sx={{
                        maxWidth: 105,
                        paddingRight: '20px',
                        marginTop: '0px',
                      }}
                    >
                      <FormControl fullWidth>
                        <InputLabel
                          variant='standard'
                          htmlFor='uncontrolled-native'
                        ></InputLabel>
                        <NativeSelect
                          defaultValue={10}
                          inputProps={{
                            name: 'time-range',
                            id: 'uncontrolled-native',
                          }}
                        >
                          <option value={10}>All time</option>
                          <option value={20}>Daily</option>
                          <option value={30}>Monthly</option>
                        </NativeSelect>
                      </FormControl>
                    </Box>
                  </span>
                </div>
                <div className='overview-stats'>
                  <div className='overview-stats-customers'>
                    <p className='overview-stats-customers-heading'>
                      Customers <span>+17%</span>
                    </p>
                    <p className='overview-stats-customers-value'>17</p>
                  </div>
                  <div className='overview-stats-income'>
                    <p className='overview-stats-income-heading'>Income</p>
                    <p className='overview-stats-income-value'>$1,276,690.00</p>
                  </div>
                </div>
              </div>
              <div className='revenue-overview'>
                <div className='revenue-heading'>
                  <h4>Revenue</h4>
                  <span>
                    <Box
                      sx={{
                        maxWidth: 125,
                        paddingRight: '20px',
                        marginTop: '0px',
                      }}
                    >
                      <FormControl fullWidth>
                        <InputLabel
                          variant='standard'
                          htmlFor='uncontrolled-native'
                        ></InputLabel>
                        <NativeSelect
                          defaultValue={10}
                          inputProps={{
                            name: 'chart-type',
                            id: 'uncontrolled-native',
                          }}
                        >
                          <option value={10}>Line Chart</option>
                          <option value={20}>Bar Chart</option>
                        </NativeSelect>
                      </FormControl>
                    </Box>
                  </span>
                </div>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 37,
                      left: 20,
                      bottom: 50,
                    }}
                  >
                    {/* <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 37,
                      left: 20,
                      bottom: 50,
                    }}
                  > */}
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type='monotone'
                      dataKey='revenue'
                      stroke='#8884d8'
                      activeDot={{ r: 8 }}
                    />
                    <Line type='monotone' dataKey='income' stroke='#82ca9d' />
                    {/* </BarChart> */}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className='products-overview'>
              <div className='products-heading'>
                <h4>Top products</h4>
              </div>
            </div>
          </div>
          <div className='orders-overview'>
            <div className='orders-heading'>
              <h4>Pending orders</h4>
              {/* <span>
                <Box
                  sx={{ maxWidth: 122, paddingRight: '20px', marginTop: '0px' }}
                >
                  <FormControl fullWidth>
                    <InputLabel
                      variant='standard'
                      htmlFor='uncontrolled-native'
                    ></InputLabel>
                    <NativeSelect
                      defaultValue={10}
                      inputProps={{
                        name: 'chart-type',
                        id: 'uncontrolled-native',
                      }}
                    >
                      <option value={10}>All</option>
                      <option value={20}>Confirmed</option>
                      <option value={30}>Pending</option>
                      <option value={40}>Rejected</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </span> */}
            </div>
            <div style={{ height: 220, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={2}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHome;
