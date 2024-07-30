import React,{useEffect, useState, useContext} from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
function View() {
  const [userDetails, setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)
  const {firestore} = useContext(FirebaseContext)
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (postDetails && postDetails.userId) {
        const { userId } = postDetails;
        const q = query(collection(firestore, 'users'), where('id', '==', userId));
        
        try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUserDetails(doc.data());
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [firestore, postDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.url || "../../../Images/R15V3.jpg"}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>{postDetails?.createdAt}</span>
        </div>
       {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username || 'No name'}</p>
          <p>{userDetails?.phone || '1234567890'}</p>
        </div> }
      </div>
    </div>
  );
}
export default View;
