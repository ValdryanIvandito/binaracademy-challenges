import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import '../../styles/RPSPage.css';
import batuImage from '../../assets/images/batu.png';
import kertasImage from '../../assets/images/kertas.png';
import guntingImage from '../../assets/images/gunting.png';

function Game() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [scores, setScores] = useState(0);
  const [result, setResult] = useState(null);

  const handleBackClick = () => {
    navigate('/gamelist');
  };

  const handlePlayerMove = (playerMove) => {
    const moves = ['rock', 'paper', 'scissors'];
    const computerMove = moves[Math.floor(Math.random() * moves.length)];
    const winner = determineWinner(playerMove, computerMove);
    setResult({ playerMove, computerMove, winner });
  };

  const updateScores = async () => {
    setScores(scores + 1);
    const token = localStorage.getItem("token");
    const response = await Axios.post('http://localhost:3005/usergame/update/scores',
        { id, scores: scores + 1 },
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
      return "Draw!";
    } else if (
      (playerMove === 'rock' && computerMove === 'scissors') ||
      (playerMove === 'paper' && computerMove === 'rock') ||
      (playerMove === 'scissors' && computerMove === 'paper')
    ) {
      updateScores();
      return `${username} win!`;
    } else {
      return 'Computer wins!';
    }
  };

  const handleReload = () => {
    setResult(null);
  };

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    console.log(token);
    console.log(email);
    try {
      if (!token) {
        console.log('Not Authorize !');
        navigate('/login'); // Ganti dengan useNavigate()
      } else {
        const response = await Axios.post('http://localhost:3005/usergame/get',
          { email },
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );
        console.log(response.data.data);
        setId(response.data.data.id);
        setUsername(response.data.data.username);
        setScores(response.data.data.scores);
      }
    } catch (error) {
      console.log("Internal Server Error !");
      navigate('/login'); // Ganti dengan useNavigate()
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="background">
      <div>
        <Button color="primary" onClick={handleBackClick}>
          Kembali
        </Button>
      </div>
      <section className="game">
        <div className="title">Rock Paper Scissors</div>
        <div className="scores">Scores: {scores}</div>
        <div className="grid-container">
          <div className="options grid-item">
            <h1 className="move">Choose your move</h1>
            <button className="move-btn" onClick={() => handlePlayerMove('rock')}>
              <img src={batuImage} alt="" className="image" />
            </button>
            <button className="move-btn" onClick={() => handlePlayerMove('paper')}>
              <img src={kertasImage} alt="" className="image" />
            </button>
            <button className="move-btn" onClick={() => handlePlayerMove('scissors')}>
              <img src={guntingImage} alt="" className="image" />
            </button>
          </div>
          <div className="options grid-item">
            <h1 className="move">Computer</h1>
            <button className="computer-move-btn" disabled>
              {result && <img src={batuImage} alt="" className="image" />}
            </button>
            <button className="computer-move-btn" disabled>
              {result && <img src={kertasImage} alt="" className="image" />}
            </button>
            <button className="computer-move-btn" disabled>
              {result && <img src={guntingImage} alt="" className="image" />}
            </button>
          </div>
        </div>
        {result && (
          <div className="result">
            <p>You chose: {result.playerMove}</p>
            <p>Computer chose: {result.computerMove}</p>
            <p>{result.winner}</p>
          </div>
        )}
        <button className="reload" onClick={handleReload}>
          Play Again
        </button>
      </section>
    </div>
  );
}

export default Game;
