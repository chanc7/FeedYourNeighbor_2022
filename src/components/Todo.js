import { List , ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {db} from '../firebase.js';
import { doc, deleteDoc } from "firebase/firestore";
import './todo.css';

const Todo=({arr})=>{
    return (
        <List className="todo__list"> 
            <ListItem>
                <ListItemAvatar />
                    <ListItemText primary={arr.item.foodname} secondary={arr.item.foodname} />
            </ListItem>
            <DeleteIcon fontSize="large" style={{opacity:0.7}} onClick={() => {deleteDoc(doc(db,'foods',arr.id))}} />
        </List> 
    )
};

export default Todo;

// db.collection('todos').doc(arr.id).delete()
//NOTE: Can change secondary to food description? Or delete