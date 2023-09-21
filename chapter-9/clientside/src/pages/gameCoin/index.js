import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import '../../styles/gameCoin.css';
import coinHeadsImg from '../../assets/images/coin.jpg';
import coinTailsImg from '../../assets/images/coin2.jpg';

const CoinFlipGame = () => {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [scores, setScores] = useState(0);
  const [guessedOption, setGuessedOption] = useState(null);
  const [coinSide, setCoinSide] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [headsImgLoaded, setHeadsImgLoaded] = useState(false);
  const [tailsImgLoaded, setTailsImgLoaded] = useState(false);
  const navigate = useNavigate();

  const handleHeadsImgLoad = () => {
    setHeadsImgLoaded(true);
  };

  const handleTailsImgLoad = () => {
    setTailsImgLoaded(true);
  };

  const handleGuess = (option) => {
    setGuessedOption(option);
  };

  useEffect(() => {
    if (!isFlipping && coinSide && guessedOption) {
      // Update the score after the animation has ended based on coinSide and guessedOption
      if ((coinSide === "heads" && guessedOption === "heads") || (coinSide === "tails" && guessedOption === "tails")) {
        setScores((prevScore) => prevScore + 1);
        updateScores();
      }

      setShowPopup(true);
    }
  }, [isFlipping, coinSide, guessedOption]);

  const handleFlipCoin = () => {
    if (!guessedOption) {
      alert("Please make a guess before flipping the coin.");
      return;
    }

    if (isFlipping) return;

    setIsFlipping(true);

    // Calculate the new coin side based on Math.random()
    const newCoinSide = Math.random() < 0.5 ? "heads" : "tails";
    setCoinSide(newCoinSide);
  };
  
  const handleBackClick = () => {
    navigate("/gamelist"); 
  };

  const handleGuessAgain = () => {
    setGuessedOption(null);
    setCoinSide(null);
    setShowPopup(false);
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
   <div className="">
      <div>
        <Button color="primary" onClick={handleBackClick}>
          Kembali
        </Button>
      </div>
      <div className='container'>
        <div className={`coin ${isFlipping ? 'flipping' : ''}`} onAnimationEnd={() => setIsFlipping(false)}>
          <div className={`heads ${coinSide === "heads" && headsImgLoaded ? 'show' : ''}`}>
            <img src={coinHeadsImg} alt="Heads" onLoad={handleHeadsImgLoad} />
          </div>
          <div className={`tails ${coinSide === "tails" && tailsImgLoaded ? 'show' : ''}`}>
            <img src={coinTailsImg} alt="Tails" onLoad={handleTailsImgLoad} />
          </div>
        </div>
        <div className="stats">
          <p>Player: {username}</p>
          <p>Scores: {scores}</p>
        </div>
        <div className="buttons">
          <Button
            className="guess-button"
            onClick={() => handleGuess("heads")}
            disabled={isFlipping || coinSide}
          >
            Heads
          </Button>
          <Button
            className="guess-button"
            onClick={() => handleGuess("tails")}
            disabled={isFlipping || coinSide}
          >
            Tails
          </Button>
          <Button onClick={handleFlipCoin} disabled={!guessedOption || isFlipping}>
            Flip Coin
          </Button>
        </div>
        {showPopup && (
          <div className="result-popup">
            <p>Kamu menebak {guessedOption}!</p>
            <p>Hasilnya adalah {coinSide}</p>
            <p>Scoremu : {scores}</p>
            <Button onClick={handleGuessAgain}>Tebak lagi</Button>
          </div>
        )}
      </div>
    </div>

  );
};

export default CoinFlipGame;
