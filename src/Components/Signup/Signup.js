import React, {useState, useContext} from 'react';
import {FirebaseContext} from '../../store/Context'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const {auth,firestore} = useContext(FirebaseContext)
  const [error, setError] = useState('')

  const handleSubmit =(e)=>{
    e.preventDefault()
    if (!username || !email || !phone || !password) {
      setError('Please fill all the fields');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    if (/^-/.test(username)) {
      setError('Username cannot be a negative number');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (parseInt(phone) < 0 || phone.length !== 10) {
      setError('Please enter a valid phone number');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      setError('Password must contain at least one special character.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    createUserWithEmailAndPassword(auth,email,password).then(async (userCredential)=>{
      const user = userCredential.user;
      await updateProfile(user, { displayName: username }).then(()=>{
        addDoc(collection(firestore,'users'),{
          id:userCredential.user.uid,
          username:username,
          phone:phone
        }).then(()=>{
          navigate("/login")
        })
      })
    })
  }
const handleLogin = ()=>{
  navigate('/login')
}
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <br />
          {error&& <p style={{color:"red"}}>{error}</p>}
          <br />
          <button>Signup</button>
        </form>
        <a onClick={handleLogin}>Login</a>
      </div>
    </div>
  );
}
