import React, { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
// import { useNavigate } from "react-router-dom";
import styles from "../../styles/gameDice.module.css";
import { Button } from 'reactstrap';
import {setPlayedGames  } from "../../redux/action";
import { useDispatch, useSelector } from 'react-redux';
import dice1 from '../../assets/images/dice1.svg';
import dice2 from '../../assets/images/dice2.svg';
import dice3 from '../../assets/images/dice3.svg';
import dice4 from '../../assets/images/dice4.svg';
import dice5 from '../../assets/images/dice5.svg';
import dice6 from '../../assets/images/dice6.svg';


function Dices() {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [scores, setScores] = useState(0);
  const [result, setResult] = useState('Click tombol dibawah untuk memulai permainan');
  const dispatch = useDispatch();
  const playedGames = useSelector(state => state.reducer.playedGames);
  const playerRef = useRef(null);
  const computerRef = useRef(null);
  const resultDice = useRef(null);
  // const navigate = useNavigate();

  let diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];
  console.log(diceImages)

  const roll = () => {
    // Generate random number
    const playerRandomNum = Math.floor(Math.random() * 6);
    const computerRandomNum = Math.floor(Math.random() * 6);

    // Logic for this game
    if (playerRandomNum > computerRandomNum) {
      setResult(`Player menang dengan ${playerRandomNum + 1} points`);
      setScores((prevScore) => prevScore + 1);
      // updateScores();
    } else if (playerRandomNum < computerRandomNum) {
      setResult(`Computer menang dengan ${computerRandomNum + 1} points`);
    } else {
      setResult(`Seri! Player dan pemain mendapatkan ${playerRandomNum + 1} points`);
    }

    playerRef.current.setAttribute('src', diceImages[playerRandomNum]);
    computerRef.current.setAttribute('src', diceImages[computerRandomNum]);
    console.log("Initial Played Games:", playedGames);
    dispatch(setPlayedGames({ ...playedGames, '/gamedice': true }));
    localStorage.setItem('playedGames', JSON.stringify({ ...playedGames, '/gamedice': true }));
    console.log("Played Games:", playedGames);
    };

  const handleBackClick = () => {
    
    window.location.replace('gamelist') // Specify the desired path here
  };

  const updateScores = async () => {
    setScores(scores + 1);
    const token = localStorage.getItem("token");
    const response = await Axios.post(`${process.env.REACT_APP_BE_URL}/usergame/update/scores`,
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
        const response = await Axios.post(`${process.env.REACT_APP_BE_URL}/usergame/get`,
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
      window.location.replace('login')
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
    <div className={styles.centerContainer}>
      <div className={styles.diceWrapper}>
        <div className={styles.diceArea}>
          <p>{username}</p>
          <img src={diceImages[0]} ref={playerRef} alt='Dice' />
        </div>
        <div>
          <p>Score: {scores}</p>
        </div>
        <div className={styles.diceArea}>
          <p>Computer</p>
          <img src={diceImages[0]} ref={computerRef} alt='Dice' />
        </div>
      </div>
      <div className={styles.diceWrapper}>
      <p className='result' ref={resultDice}>
        {result}
      </p>
      </div>
      <div className={styles.diceWrapper}>
      <button onClick={roll} className={styles.btn}>
        Roll the dice
      </button>
      </div>
      
    </div>
    </>
  );
}

export default Dices;
