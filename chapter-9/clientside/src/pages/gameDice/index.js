import React, { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';
import dice1 from '../../assets/images/dice1.svg';
import dice2 from '../../assets/images/dice2.svg';
import dice3 from '../../assets/images/dice3.svg';
import dice4 from '../../assets/images/dice4.svg';
import dice5 from '../../assets/images/dice5.svg';
import dice6 from '../../assets/images/dice6.svg';

import '../../styles/gameDice.css';

function Dices() {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [scores, setScores] = useState(0);
  const [result, setResult] = useState('Click tombol dibawah untuk memulai permainan');

  const playerRef = useRef(null);
  const computerRef = useRef(null);
  const resultDice = useRef(null);
  const navigate = useNavigate();

  let diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

  const roll = () => {
    // Generate random number
    const playerRandomNum = Math.floor(Math.random() * 6);
    const computerRandomNum = Math.floor(Math.random() * 6);

    // Logic for this game
    if (playerRandomNum > computerRandomNum) {
      setResult(`Player menang dengan ${playerRandomNum + 1} points`);
      setScores((prevScore) => prevScore + 1);
      updateScores();
    } else if (playerRandomNum < computerRandomNum) {
      setResult(`Computer menang dengan ${computerRandomNum + 1} points`);
    } else {
      setResult(`Seri! Player dan pemain mendapatkan ${playerRandomNum + 1} points`);
    }

    playerRef.current.setAttribute('src', diceImages[playerRandomNum]);
    computerRef.current.setAttribute('src', diceImages[computerRandomNum]);
  };

  const handleBackClick = () => {
    navigate("/gamelist"); // Specify the desired path here
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
    <>
    <div>
        <Button color="primary" onClick={handleBackClick}>
          Kembali
        </Button>
      </div>
    <div className='center-container'>
      <div className='dice-wrapper '>
        <div className='dice-area'>
          <p>{username}</p>
          <img src={dice1} ref={playerRef} alt='Dice' />
        </div>
        <div>
          <p>Score: {scores}</p>
        </div>
        <div className='dice-area'>
          <p>Computer</p>
          <img src={dice1} ref={computerRef} alt='Dice' />
        </div>
      </div>
      <div className='dice-wrapper'>
      <p className='result' ref={resultDice}>
        {result}
      </p>
      </div>
      <div className='dice-wrapper'>
      <button onClick={roll} className='btn'>
        Roll the dice
      </button>
      </div>
      
    </div>
    </>
  );
}

export default Dices;
