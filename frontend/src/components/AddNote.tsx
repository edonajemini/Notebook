import { SetStateAction, useEffect } from "react";
import { Notes } from "../utilis";

type Props = {
    notes: any;
    setNotes: React.Dispatch<SetStateAction<Notes[]>>;
  };
export function AddNotes({notes, setNotes}:Props){
    useEffect(() => {
        fetch(`http://localhost:4000/notes`)
          .then((resp) => resp.json())
          .then((notesFromServer) => setNotes(notesFromServer));
      }, []);
    return(
        <div className="post">
        <h1 className="post-h1">POST YOUR NOTES HERE!</h1>
      <form
        className="post-notes"
        onSubmit={(event) => {
            event.preventDefault();
            let newNote = {
              tittle:event.target.tittle.value,
              text: event.target.text.value,
              category:event.target.category.value
            }
            fetch("http://localhost:4000/postNotes",{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newNote)
            }).then(()=>{
              fetch("http://localhost:4000/notes")
        .then((resp) => resp.json())
        .then((notesFromServer) => setNotes(notesFromServer));
            })
          }}
      >
        <input
          type="text"
          name="tittle"
          id="tittle"
          placeholder="Title?"
          required
        ></input>
        <textarea
          name="text"
          id="text"
          placeholder="Write the Note here..."
          rows={4}
          required
        ></textarea>
        {/* <input
          type="text"
          name="category"
          id="tittle"
          placeholder="Category?"
          required
        ></input> */}
        <select
          name="category"
          id="category"
          placeholder="Category?"
          required
          >
            <option value="Me">Me</option>
            <option value="Important">Important</option>
            <option value="Work">Work</option>
            <option value="Animals">Animals</option>
          </select>
       
        <button className="post-btn">POST</button>
      </form>
        </div>
    )
}