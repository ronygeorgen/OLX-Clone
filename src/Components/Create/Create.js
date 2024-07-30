import React, { Fragment, useContext, useState } from 'react';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext, AuthContext} from '../../store/Context'
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const navigate = useNavigate()
  const {storage, firestore} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const date = new Date()
  const handleSubmit =async ()=>{
    if (!name || !category || !price || !image) {
      setError('All fields are required.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError('Enter a valid Price');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (!user || !user.uid) {
      setError('User is not logged in.');
      setTimeout(() => setError(''), 3000);
      navigate('/login');
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(image.type)) {
      setError('Only JPEG, JPG, and PNG files are allowed.');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (image){
      try {
        const imageRef = ref(storage, `/images/${image.name}`);
        console.log("Image reference created:", imageRef);

        const snapshot = await uploadBytes(imageRef, image);
        console.log("Upload completed:", snapshot);

        const url = await getDownloadURL(snapshot.ref);
        console.log("Download URL:", url);

        addDoc(collection(firestore,'products'),{
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        navigate('/')
      } catch (error) {
        console.error("Error during upload:", error);
      }
    }else {
      console.log('Please select an image');
    }
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              id="fname"
              onChange={(e)=>setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              id="fname"
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" value={price} id="fname" onChange={(e)=>setPrice(e.target.value)} name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : '' }></img>
          
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" 
            accept=".jpeg, .jpg, .png"
            />
            <br />
            {error&& <p style={{color:"red"}}>{error}</p>}
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
