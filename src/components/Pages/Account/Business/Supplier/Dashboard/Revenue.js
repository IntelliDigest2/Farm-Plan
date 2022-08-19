import React from 'react';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { DataGrid } from '@mui/x-data-grid';

import './dashboard.css';
import { data } from './Components/chart-data';
import { rows, columns } from './Components/txn-history';

function DashboardRevenue() {
  return (
    <>
      <Navbar />
      <div className='dashboard-content'>
        <Sidebar className4='active' />
        <div className='main-content'>
          <h1>Manage Revenue</h1>
          <div className='revenue-incomedue'>
            <div className='overview-container revenue'>
              <div className='overview-heading'>
                <h4>Revenue summary</h4>
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
                    Fulfilled orders <span>+17%</span>
                  </p>
                  <p className='overview-stats-customers-value'>12</p>
                </div>
                <div className='overview-stats-income'>
                  <p className='overview-stats-income-heading'>Revenue</p>
                  <p className='overview-stats-income-value'>$1,276,690.00</p>
                </div>
              </div>
              <div className='revenue-overview'>
                <div className='revenue-heading'>
                  <h4>Summary</h4>
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
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className='products-overview income'>
              <div className='products-heading'>
                <h4>Income due</h4>
              </div>
              <p>$70,989.37</p>
              <button type='submit' className='payout-btn'>
                Request payout
              </button>
            </div>
          </div>
          <div className='orders-overview-fulfilled'>
            <div className='orders-heading'>
              <h4>Transaction history</h4>
              <span>
                <Box
                  sx={{ maxWidth: 130, paddingRight: '20px', marginTop: '0px' }}
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
                      <option value={10}>This month</option>
                      <option value={20}>This year</option>
                      <option value={30}>Custom</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </span>
            </div>
            <div style={{ height: 165, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={1}
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

export default DashboardRevenue;
