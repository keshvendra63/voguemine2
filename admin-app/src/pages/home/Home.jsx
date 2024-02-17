import React from 'react'
import './home.css'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RedeemIcon from '@mui/icons-material/Redeem';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { LineChart } from '@mui/x-charts/LineChart';
import { DataGrid } from '@mui/x-data-grid';



const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Day1',
  'Day2',
  'Day3',
  'Day4',
  'Day5',
  'Day6',
  'Day7',
];

const Home = () => {

  return (
    <div className='main-screen'>
      <p className='page-name'>Dashboard</p>
     <div className="sales">
      <div className="sale sale1">
          <div className='icon-div'>
            <AttachMoneyIcon className='sale-icon'/>
          </div>
          <div className="sale-content">
            <p>Gross Sale</p>
            <p>Rs. 99999999</p>
          </div>
      </div>
      <div className="sale sale2">
          <div className='icon-div'>
            <RedeemIcon className='sale-icon'/>
          </div>
          <div className="sale-content">
            <p>Total Orders</p>
            <p>99999</p>
          </div>
      </div>
      <div className="sale sale3">
          <div className='icon-div'>
          <AccountTreeIcon className='sale-icon'/>

          </div>
          <div className="sale-content">
            <p>Ordered Products</p>
            <p>9999</p>
          </div>
      </div>
      <div className="sale sale4">
          <div className='icon-div'>
          <RecordVoiceOverIcon className='sale-icon'/>

          </div>
          <div className="sale-content">
            <p>Active User</p>
            <p>9999</p>
          </div>
      </div>

     </div>

     <div className="chart-section">
      <div className="chart">
      <LineChart
      className='chart-data'
      series={[
        { data: pData, label: 'Today' },
        { data: uData, label: 'Yesterday' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
      </div>
      <div className="recent-orders">
        <p>Recent Orders</p>
      <div className="table">
        <table>
          <thead>
              <th>Name</th>
              <th>Order Value</th>
          </thead>
          <tbody>
              <tr>
                <td>Vishal</td>
                <td>99999</td>
              </tr>
              <tr>
                <td>Vishal</td>
                <td>99999</td>
              </tr>
              <tr>
                <td>Vishal</td>
                <td>99999</td>
              </tr>
              <tr>
                <td>Vishal</td>
                <td>99999</td>
              </tr>
              <tr>
                <td>Vishal</td>
                <td>99999</td>
              </tr>
              <tr>
                <td>Vishal</td>
                <td>99999</td>
              </tr>
              <tr>
                <td>Vishal</td>
                <td>99999</td>
              </tr>
              <tr>
                <td>Vishal</td>
                <td>99999</td>
              </tr>
              <tr>
                <td>Vishal</td>
                <td>99999</td>
              </tr>
                            <tr>
                <td>Vishal</td>
                <td>99999</td>
              </tr>

          </tbody>
        </table>
      </div>
      </div>
     </div>
    
    </div>
  )
}

export default Home
