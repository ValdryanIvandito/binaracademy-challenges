import React, { useEffect, useState } from 'react';
import { Button, Table } from "reactstrap";
import Navbar from "../components/navbar";
import NavbarUser from "../components/navbarUser";
import styles from "../../styles/feature.module.css";
import { connect, useDispatch } from 'react-redux';
import Axios from 'axios';
import { Skeleton, Pagination  } from 'antd';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const LeaderBoard = ({ isLoggedIn, user}) => {
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('');
    const [totalscore, setTotalScore] = useState(0);
    const [playerData, setPlayerData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleBackClick = () => {
        window.location.replace('/gamelist');
      };
      const handleGamerpsClick = () => {
        window.location.replace('/leaderboard');
      };
      
      const handleGamecoinlick = () => {
        window.location.replace('/leaderboard/gamecoin');
      };

    const getData = async ()=> {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        try {
            if (!token) {
                console.log('Not Authorize !');
                window.location.replace('/login');
            } else {
                const gamename = 'gamedice';
                const response = await Axios.post(`${process.env.REACT_APP_BE_URL}/gamehistory/get/rank`,
                { email, gamename },
                { headers: {
                    Authorization: `Basic ${token}`,
                  }}
            )
            console.log(response.data.data.rows);
            setPlayerData(response.data.data.rows);
            };
           
  
        } catch (error) {
            console.log("Internal Server Error !");
        }
    }
    
    const slicedPlayerData = playerData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );
    
    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        doc.text('Game Dadu Report', 10, 10); // Add title
    
        // Generate the table
        const columns = ['#', 'Username', 'Game Name', 'Status', 'Total Score'];
        const tableData = playerData.map((player, index) => [
          index + 1,
          player.username,
          player.gamename,
          player.status,
          player.totalscore,
        ]);
    
        doc.autoTable({
          head: [columns],
          body: tableData,
        });
    
        // Save the PDF
        doc.save('Game-Dadu.pdf');
      };

    useEffect(() => {
        getData();
      }, []);
    
    
      return (
        <div className={styles.GamedicePageImage}>
          <NavbarUser isLoggedIn={isLoggedIn} userEmail={user.email} />
          <Button color="primary" onClick={handleBackClick} className='mt-3'>
            Kembali
          </Button>
          <div className={styles.buttonContainer}>
            <Button color="success" onClick={handleGamerpsClick} className='mt-3'>
                Game RPS
            </Button>
            <Button color="success" onClick={handleGamecoinlick} className='mt-3'>
                Game Coin
            </Button>
          </div>
          <div className='mt-4'>
            {playerData.length === 0 ? (
              <Skeleton active />
            ) : (
              <>
                <Table striped datasource={slicedPlayerData} pagination=''>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Game Name</th>
                      <th>Status</th>
                      <th>Total Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slicedPlayerData.map((player, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{player.username}</td>
                        <td>{player.gamename}</td>
                        <td>{player.status}</td>
                        <td>{player.totalscore}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={playerData.length}
                  onChange={setCurrentPage}
                  showSizeChanger
                  onShowSizeChange={(current, size) => {
                    setPageSize(size);
                    setCurrentPage(1);
                  }}
                />
              </>
            )}
          </div>
          <div>

      </div>
      <Button color="success" onClick={handleGeneratePDF} className= {styles.buttonPDF}>
        Generate PDF
      </Button>
  </div>
);
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.reducer.isLoggedIn,
    user: state.reducer.user,
  });
  
  export default connect(mapStateToProps)(LeaderBoard);

