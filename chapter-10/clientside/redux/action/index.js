import Axios from 'axios';


// export function loginRequest(){
//   return {
//     type: 'LOGIN_REQUEST'
//   }
//  };

//  export function loginSuccess (token, email) {
//   return{
//   type: 'LOGIN_SUCCESS',
//   payload: { token, email },
// }};

// export function loginFailure (error){
//   return{
//     type: 'LOGIN_FAILURE',
//     payload: error,
//   }  
// };

export function setEmail(email) {
  return {
    type: 'SET_EMAIL',
    payload: email,
  };
}

export const setTotalScore = (totalScore) => ({
  type: 'SET_TOTAL_SCORE',
  payload: totalScore,
});

export const setLoggedIn = (isLoggedIn, user) => ({
  type: 'SET_LOGGED_IN',
  payload: { isLoggedIn, user },
});

export const setPlayedGames = (playedGames) => ({
  type: 'SET_PLAYED_GAMES',
  payload: playedGames,
});

export const fetchUserTotalScore = (userEmail) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const gamename = 'gamerps';

    if (!token) {
      console.log('Not Authorized!');
      window.location.replace('/login');
      return; // Return early if not authorized
    }

    const response = await Axios.post(
      'http://localhost:3005/gamehistory/get/rank',
      { email: userEmail, gamename },
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      }
    );

    const userTotalScore = response.data.data.totalscore;
    dispatch(setTotalScore(userTotalScore)); // Dispatch the total score to Redux store
  } catch (error) {
    console.error('Error fetching user total score:', error);
  }
};

// export const loginUser = (email, password) => async (dispatch) => {
//   dispatch(loginRequest());

//   try {
//     const response = await Axios.post('http://localhost:3005/login', {
//       email,
//       password,
//     });

//     const { token, email: userEmail } = response.data;

//     localStorage.setItem('token', token);
//     localStorage.setItem('email', userEmail);

//     dispatch(loginSuccess(token, userEmail));
//     dispatch(setEmail(userEmail));
//   } catch (error) {
//     const errorMessage = error.response ? error.response.data.message : 'An error occurred';
//     dispatch(loginFailure(errorMessage));
//   }
// };


