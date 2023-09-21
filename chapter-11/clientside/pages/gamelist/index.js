import React, { useEffect, useState } from 'react';
import { Button } from "reactstrap";
import Navbar from "../components/navbar";
import NavbarUser from "../components/navbarUser";
import styles from "../../styles/feature.module.css";
import { connect, useDispatch } from 'react-redux';
import { setEmail, setPlayedGames  } from "../../redux/action";


const GameList = ({ isLoggedIn, user, playedGames }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); 

  const handleLeaderBboardkClick = () => {
    window.location.replace('/leaderboard');
  };

  const items = [
    {
      title: "Rock Paper Scissor",
      description: "Bantung Gunting Kertas melawan computer",
      backgroundImage: '/images/rock-paper-scissor.jpg',
      path: "/gamerps",
    },
    {
      title: "Head or Tails",
      description: "Mencoba menebak hasil dari lemparan coin",
      backgroundImage: '/images/coin.jpg',
      path: "/gamecoin",
    },
    {
      title: "Game Dadu",
      description: "Permainan lempar dadu melawan komputer",
      backgroundImage: '/images/dadu.jpg',
      path: "/gamedice",
    },
  ];
  const checkToken = async () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    console.log(token);
    console.log(email);
    try {
      if (!token) {
        console.log('Not Authorized!');
        window.location.replace('/login');
      } else {
        console.log('Authorized !')
      }
    } catch (error) {
      console.log('Internal Server Error!');
      window.location.replace('/login');
    }
  };

  useEffect(() => {
    const email = localStorage.getItem('email');
    dispatch(setEmail(email));
    checkToken();
    const playedGames = JSON.parse(localStorage.getItem('playedGames')) || {};
    dispatch(setPlayedGames(playedGames));
    }, []);

  const handleClick = (path) => {
    setLoading(true); 
    console.log(path);
    window.location.replace(path);
  };


  const textTitle = {
    fontSize: '21px',
    textAlign: 'center'
  };

  const textDescription = {
    fontSize: '16px',
    textAlign: 'center'
  };


  return (
    <div className={styles.FeaturePageImage}>
      <NavbarUser isLoggedIn={isLoggedIn} userEmail={user.email}/>
      <div className="py-12 md:py-20">
        {/* Section header */}
        <div className="text-center">
          <h2 className={styles.featureTitle}>Game List</h2>
          <p className={styles.featureDescription}>
            Berbagai permainan yang bisa anda mainkan di website kami
          </p>
        </div>
        <div className="d-flex justify-content-center">
          <Button color="primary" onClick={handleLeaderBboardkClick}>
            Leaderboard
          </Button>
        </div>
        {/* Items */}
        <div className={styles.mderwSm}>
        {items.map((item, index) => (
            <div
              key={index}
              className={`${styles.rectangleItem} ${playedGames[item.path] ? styles.played : ''}`}
              style={{ backgroundImage: `url(${item.backgroundImage})` }}
              data-aos="fade-up"
            >
              <div className={styles.playedText}>{playedGames[item.path] ? 'Pernah Dimainkan' : ''}</div>
              {console.log(`Item path: ${item.path}, Played: ${playedGames[item.path]}`)}
             <div className={styles.rectangleItemContent}>
               <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                 {/* Add SVG content here if needed */}
               </svg>
               <h2 className={`h4 mb-2`}>{item.title}</h2>
               <p>{item.description}</p>
                  <Button
                    color="primary"
                    onClick={() => handleClick(item.path)}
                    disabled={loading} 
                  >
                    {loading ? "Processing" : "Play"}
                  </Button>
             </div>
           </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = (state) => ({
  isLoggedIn: state.reducer.isLoggedIn,
  user: state.reducer.user,
  playedGames: state.reducer.playedGames,
});

export default connect(mapStateToProps)(GameList);

