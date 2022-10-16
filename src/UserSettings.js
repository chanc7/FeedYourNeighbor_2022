import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {TextField , Button } from '@mui/material';
import "./UserSettings.css";
import { auth, db } from "./firebase";
import { query, collection, doc, getDocs, updateDoc, where, orderBy, onSnapshot, addDoc,serverTimestamp, getDoc } from "firebase/firestore";

function UserSettings() {
    const [user, loading, error] = useAuthState(auth);
    const [input, setInput]=useState('');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [uid, setUID] = useState("");


    const navigate = useNavigate();

    const fetchUserName = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
    
          setName(data.name);
          setEmail(data.email);
          setUID(data.uid);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
      };

    useEffect(() => {
        fetchUserName();

        let isMounted = true;               // note mutable flag
        return () => { isMounted = false };
           }, [input]);

    const returnDashboard=(e)=>{
            navigate('/dashboard');
      };

      const saveSettings= async ()=>{
        try {
            const c = collection(db, "users");
            const data = { name: input }
            updateDoc(c, data)
            // await updateDoc(doc(c, uid),
            //     name, input);
            //  console.log(input);
            // setInput('')
            // navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert("An error occured while updating user data");
          }
      };

    return (
        <div className="usersettings">
            <form>
                Name:
                <TextField id="name" label = {name} variant="outlined" style={{margin:"0px 5px"}} size="small" value={input}
                onChange={e=>setInput(e.target.value)} />
                <p> Email: {email} </p>
            </form>
            <Button variant="contained" color="primary" onClick={saveSettings}  >Save</Button>
            <Button variant="contained" color="primary" onClick={returnDashboard}  >Cancel</Button>
        </div>
    );
}

export default UserSettings;
