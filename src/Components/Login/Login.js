import React,{useState, useContext} from 'react';
import {FirebaseContext} from '../../store/Context'
import { signInWithEmailAndPassword } from "firebase/auth"
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom'
function Login() {
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {auth} = useContext(FirebaseContext);
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const handleLogin = (e)=>{
    e.preventDefault()
    if ( !email || !password) {
      setError('Please fill all the fields');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate("/")
    // ...
  }).catch((error)=>{
    alert(error.message)
  })
  }
  const handleSignup = ()=>{
    navigate('/signup')
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            id="fname"
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={password}
            type="password"
            id="lname"
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
          />
          {error&& <p style={{color:"red"}}>{error}</p>}
          <br />
          <br />
          <button onClick={handleLogin}>Login</button>
        </form>
        <a onClick={handleSignup}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
