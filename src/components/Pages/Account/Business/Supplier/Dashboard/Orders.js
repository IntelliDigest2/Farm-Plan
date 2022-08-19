import React from 'react';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { DataGrid } from '@mui/x-data-grid';

import { rows, columns } from './Components/table-data';
import { rowsf, columnsf } from './Components/fulfilled-orders';
import './dashboard.css';

function DashboardOrders() {
  return (
    <>
      <Navbar />
      <div className='dashboard-content'>
        <Sidebar className3='active' />
        <div className='main-content'>
          <h1>Manage orders</h1>
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
                <p className='overview-stats-income-heading'>Orders</p>
                <p className='overview-stats-income-value'>21</p>
              </div>
            </div>
          </div>
          <div className='orders-overview'>
            <div className='orders-heading'>
              <h4>Orders</h4>
            </div>
            <div style={{ height: 220, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={3}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
              />
            </div>
          </div>
          <div className='orders-overview-fulfilled'>
            <div className='orders-heading'>
              <h4>Fulfilled orders</h4>{' '}
            </div>
            <div style={{ height: 165, width: '100%' }}>
              <DataGrid
                rows={rowsf}
                columns={columnsf}
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

export default DashboardOrders;
