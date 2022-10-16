import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {TextField , Button } from '@mui/material';
import Todo from './components/Todo';
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, orderBy, onSnapshot, addDoc,serverTimestamp, getDoc } from "firebase/firestore";

const q=query(collection(db,'foods'),orderBy('timestamp','desc'));

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [todos,setTodos]=useState([]);
  const [input, setInput]=useState('');

  const navigateToOffer = () => {
    navigate('/offer');
  };

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
    //fetchFoods();

    onSnapshot(q,(snapshot)=>{
      setTodos(snapshot.docs.map(doc=>({
        id: doc.id,
        item: doc.data()
      })))
    });
  }, [user, loading, input]);

  console.log(todos);

  return (
    <div className="dashboard">
      <form>
        <Button variant="contained" color="primary" onClick={navigateToOffer}  >Add Todo</Button>
      </form>
      <ul>
          {todos.map(item=> <Todo key={item.id} arr={item} />)}
      </ul>
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
