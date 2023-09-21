import React, { useEffect, useState } from 'react';
import { Button, Table } from "reactstrap";
import Navbar from "../components/navbar";
import NavbarUser from "../components/navbarUser";
import styles from "../../styles/feature.module.css";
import { connect, useDispatch } from 'react-redux';
import Axios from 'axios';
import { Skeleton, Pagination  } from 'antd';

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
    const handleGamecoinClick = () => {
        window.location.replace('/leaderboard/gamecoin');
      };
      
    const handleGamedadulick = () => {
        window.location.replace('/leaderboard/gamedice');
      };

    const getData = async ()=> {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        try {
            if (!token) {
                console.log('Not Authorize !');
                window.location.replace('/login');
            } else {
                const gamename = 'gamerps';
                const response = await Axios.post('http://localhost:3005/gamehistory/get/rank',
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
      
    useEffect(() => {
        getData();
      }, []);
    
    
      return (
        <div className={styles.LeaderboardPageImage}>
          <NavbarUser isLoggedIn={isLoggedIn} userEmail={user.email} />
          <Button color="primary" onClick={handleBackClick} className='mt-3'>
            Kembali
          </Button>
          <div className={styles.buttonContainer}>
            <Button color="success" onClick={handleGamecoinClick} className='mt-3'>
                Game Coin
            </Button>
            <Button color="success" onClick={handleGamedadulick} className='mt-3'>
                Game Dadu
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
  </div>
);
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.reducer.isLoggedIn,
    user: state.reducer.user,
  });
  
  export default connect(mapStateToProps)(LeaderBoard);

