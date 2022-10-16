import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {TextField , Button } from '@mui/material';
import "./Offer.css";
import { auth, db } from "./firebase";
import { query, collection, getDocs, where, orderBy, onSnapshot, addDoc,serverTimestamp, getDoc } from "firebase/firestore";

function Offer() {
    const [user, loading, error] = useAuthState(auth);
    const [input, setInput]=useState('');
    const [todos,setTodos]=useState([]);

    const navigate = useNavigate();
    useEffect(() => {
    //     onSnapshot(q,(snapshot)=>{
    //       setTodos(snapshot.docs.map(doc=>({
    //         id: doc.id,
    //         item: doc.data()
    //       })))
    //     });
       }, [input]);

    const addTodo=(e)=>{
        e.preventDefault();
           addDoc(collection(db,'foods'),{
             foodname:input,
             timestamp: serverTimestamp(),
             uid: user?.uid
           })
             console.log('click')
            setInput('')
            navigate('/dashboard');
      };

      console.log("Made it to OFFER")
    return (
        <div className="offer">
            <form>
                <TextField id="foodname" label="Food Description" variant="outlined" style={{margin:"0px 5px"}} size="small" value={input}
                onChange={e=>setInput(e.target.value)} />
            </form>
            <Button variant="contained" color="primary" onClick={addTodo}  >Submit Offer</Button>
            <div className="offer__container">
                Thanks for offering
            </div>
        </div>
    );
}

export default Offer;
