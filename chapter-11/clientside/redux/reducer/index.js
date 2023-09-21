const initialState = {
  user: {},
  email: '',
  // email: typeof window !== 'undefined' ? localStorage.getItem('email') || '' : '',
  // password: typeof window !== 'undefined' ? localStorage.getItem('password') || '' : '',
  playedGames: {},
  totalScore: 0,
  error: ''
  };

  export function reducer (state = initialState, action) {
    switch (action.type) {
      case 'SET_USER':
        return {...state, user: action.payload.user, email: action.payload.email};
      case 'SET_TOTAL_SCORE':
        return { ...state, totalScore: action.payload };
      case 'SET_EMAIL':
        return { ...state, email: action.payload };
      case 'SET_PLAYED_GAMES':
        return { ...state, playedGames: { ...state.playedGames, ...action.payload } };
      // case 'LOGIN_REQUEST':
      //   return { ...state, loading: true, error: '' };
      // case 'LOGIN_SUCCESS':
      //   return { ...state, loading: false, token: action.payload.token, email: action.payload.email, error: '' };
      // case 'LOGIN_FAILURE':
      //   return { ...state, loading: false, error: action.payload };  
      default:
        return state;
    }
  };
