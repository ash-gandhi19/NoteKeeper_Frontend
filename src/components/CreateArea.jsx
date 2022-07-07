import React, { useState } from "react";
import AddIcon from '@mui/icons-material/AddCircle';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const notify = (message) =>  toast.warn(message);
  const [isExpanded, setExpanded] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function expand() {
      setExpanded(true);
  }
  function handlenotedata(e){
    e.preventDefault();
    if(note.title === "" || note.content === "") {
      notify("Fill out alllll the fields!");
      return;
    }
    props.onAdd(note);
    setNote({title: "", content: ""});
  }
 
  return (
    <div>
      <form className="create-note" onSubmit={handlenotedata}>
        {isExpanded && ( <input onChange={handleChange} name="title" placeholder="Title" value={note.title}/> )}
        <textarea
          onChange={handleChange}
          onClick={expand}
          name="content"
          placeholder="Create a note..."
          rows={isExpanded ? "3" : "1"}
          value={note.content}

        /> 
        
      <Zoom in={isExpanded} >
        <Fab>
         <AddIcon/>
        </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
