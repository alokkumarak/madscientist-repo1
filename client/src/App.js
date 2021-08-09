import React,{useEffect,createContext,useReducer,useContext} from 'react'
import {BrowserRouter as Router, Switch, Route,useHistory} from 'react-router-dom';
import Connect from './component/Connect';
import Home from './component/Home'
import Login from './component/Login';
import { initialState, reducer } from './ContextReducer/reducer';
import Signup from './component/Signup';
import Profile from './component/Profile'

export const UserContext = createContext();

const Routing = () => {

  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user) {
      dispatch({ type: 'USER', payload: user })
      // history.push("/home");
    }
    else {
      history.push("/login")

    }
  }, [])

  return (
    <Switch>
      <Route exact path="/" ><Signup /></Route>
      <Route path="/login" ><Login /></Route>
      <Route path="/home" ><Home /></Route>
       <Route exact path="/profile" ><Profile /></Route> 
      {/* <Route path="/profile/:id" ><UserProfile /></Route> */}
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;

