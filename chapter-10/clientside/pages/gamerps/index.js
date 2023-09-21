import React, { useState, useEffect } from 'react';
import Axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import styles from '../../styles/gameRPS.module.css';
import {setPlayedGames, setTotalScore  } from "../../redux/action";
import { useDispatch, useSelector } from 'react-redux';
// import batuImage from '../../assets/images/batu.png';
// import kertasImage from '../../assets/images/kertas.png';
// import guntingImage from '../../assets/images/gunting.png';
import { Spin } from 'antd';

function Game() {
  // const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [username, setUsername] = useState('');
  const [round, setRound] = useState(0);
  const [status, setStatus] = useState('');
  const [getscore, setGetScore] = useState(0);
  const [totalscore, setTotalScore] = useState(0);
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();
  const playedGames = useSelector(state => state.reducer.playedGames);
  const [isLoading, setIsLoading] = useState(true);

  const handleBackClick = () => {
    // navigate('/gamelist');
    window.location.replace('/gamelist');
  };

  const handlePlayerMove = (playerMove) => {
    const moves = ['rock', 'paper', 'scissors'];
    const computerMove = moves[Math.floor(Math.random() * moves.length)];
    const winner = determineWinner(playerMove, computerMove);
    setResult({ playerMove, computerMove, winner });
    dispatch(setPlayedGames({ ...playedGames, '/gamerps': true }));
    console.log("Played Games:", playedGames);
    localStorage.setItem('playedGames', JSON.stringify({ ...playedGames, '/gamerps': true }));
  };

  const updateScores = async () => {
    const gamename = 'gamerps'
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const response = await Axios.post('http://localhost:3005/gamehistory/insert',
        { gamename, id, username, email, round, status, getscore, totalscore },
        {
          headers: {
            Authorization: `Basic ${token}`,
          }
        }
    );
    console.log(response.data.status);
  }

  const determineWinner = (playerMove, computerMove) => {
    if (playerMove === computerMove) {
      setRound(round + 1);
      setStatus('draw');
      setGetScore(0);
      updateScores();
      return "Draw!";
    } else if (
      (playerMove === 'rock' && computerMove === 'scissors') ||
      (playerMove === 'paper' && computerMove === 'rock') ||
      (playerMove === 'scissors' && computerMove === 'paper')
    ) {
      setRound(round + 1);
      setStatus('win');
      setGetScore(1);
      setTotalScore(totalscore + 1);
      updateScores();
      dispatch(setTotalScore(totalscore + 1));
      return `${username} win!`;
    } else {
      setRound(round + 1);
      setStatus('lose');
      setGetScore(0);
      updateScores();
      return 'Computer wins!';
    }
  };

  const handleReload = () => {
    setResult(null);
  };

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const gamename = 'gamerps'
    console.log(token);
    console.log(email);
    try {
      if (!token) {
        console.log('Not Authorize !');
        window.location.replace('/login'); 
      } else {
        const response = await Axios.post('http://localhost:3005/gamehistory/get',
          { email, gamename },
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );
        console.log(response.data.data);
        setId(response.data.data.id)
        setUsername(response.data.data.username);
        setRound(response.data.data.round);
        setStatus(response.data.data.status);
        setGetScore(response.data.data.getscore);
        setTotalScore(response.data.data.totalscore);
      }
    } catch (error) {
      console.log("Internal Server Error !");
      window.location.replace('/login');
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        await checkToken();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.background}>
      <div>
        <Button color="primary" onClick={handleBackClick}>
          Kembali
        </Button>
      </div>
      <section className={styles.game}>
        
      <div className={styles.title}>Rock Paper Scissors</div>
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <div className={styles.status}>Loading</div>
            <Spin size="large" /> 
          </div>
        ) : (
          <div className={styles.Container}>
            <div className={styles.status}>Status Last Round: {status}</div>
            <div className={styles.status}>Current Round: {round + 1}</div>
            <div className={styles.status}>Total Scores: {totalscore}</div>
          </div>
        )}
        <div className={styles.gridContainer}>
        <div className={`${styles.gridItem} ${styles.options}`}>
            <h1 className={styles.move}>Choose your move</h1>
            <button className={styles.moveBtn} onClick={() => handlePlayerMove('rock')}>
              <img src={'/images/batu.png'} alt="" className={styles.Image} />
            </button>
            <button className={styles.moveBtn} onClick={() => handlePlayerMove('paper')}>
              <img src={'/images/kertas.png'} alt="" className={styles.Image} />
            </button>
            <button className={styles.moveBtn} onClick={() => handlePlayerMove('scissors')}>
              <img src={'./images/gunting.png'} alt="" className={styles.Image} />
            </button>
          </div>
          <div className={`${styles.gridItem} ${styles.options}`}>
            <h1 className={styles.move}>Computer</h1>
            <button className={styles.moveBtn} disabled>
              {result && <img src={'/images/batu.png'} alt="" className={styles.Image} />}
            </button>
            <button className={styles.moveBtn} disabled>
              {result && <img src={'/images/kertas.png'} alt="" className={styles.Image} />}
            </button>
            <button className={styles.moveBtn} disabled>
              {result && <img src={'./images/gunting.png'} alt="" className={styles.Image} />}
            </button>
          </div>
        </div>
        {result && (
          <div className={styles.result}>
            <p>You chose: {result.playerMove}</p>
            <p>Computer chose: {result.computerMove}</p>
            <p>{result.winner}</p>
          </div>
        )}
        <button className={styles.reload} onClick={handleReload}>
          Play Again
        </button>
      </section>
    </div>
  );
}

export default Game;
