import { SetStateAction, useEffect } from "react";
import { Header } from "../components/Header";
import { NavBar } from "../components/NavBar";
import { SearchBar } from "../components/SearchBar";
import { Notes, timeElapsed } from "../utilis";
import { MdOutlineDoneAll , MdDelete} from "react-icons/md";
import {  ImCheckboxUnchecked} from "react-icons/im";
import { AddNotes } from "../components/AddNote";
type Props = {
    notes: any;
    setNotes: React.Dispatch<SetStateAction<Notes[]>>;
  };

export function Me({notes, setNotes}:Props){
    useEffect(() => {
        fetch("http://localhost:4000/notes/Me")
          .then((resp) => resp.json())
          .then((notesFromServer) => setNotes(notesFromServer));
      }, []);
    return(
        <>
        <Header setNotes={setNotes} notes={notes} />
        <div className="home-page">
        <div className="navbar-addpost">
        <NavBar setNotes={setNotes} notes={notes}/>
        <AddNotes setNotes={setNotes} notes={notes}/>
        </div>
        <main>
        <SearchBar setNotes={setNotes} notes={notes}/>
        <h3><u>All Notes</u></h3>
        <div className="allNotes">
        {notes.reverse().map((note:any) => (
              <>
              <div className="notes">
                <div className="text">
                <h4>{note.tittle}</h4>
                <p>{note.text}</p>
                </div>
                <div className="note-btns">
                <button className="delete-btn"
                onClick={() => {
                  fetch(`http://localhost:4000/notes/${note.id}`, {
                    method: "DELETE",
                  })
                    .then((resp) => resp.json())
                    .then(() => location.reload());
                }}
              >
                <MdDelete/>
              </button>
              <button onClick={() => {
              return fetch(`http://localhost:4000/doneNotes/${note.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  done: !note.done,
                }),
              }).then(() => {
                return fetch(`http://localhost:4000/notes`)
                  .then((resp) => resp.json())
                  .then((notesFromServer) => setNotes(notesFromServer));
              });
            }} className="done-btn">{note.done ? <MdOutlineDoneAll/>:<ImCheckboxUnchecked/>}</button>
                </div>
                <p className="date-time">•{timeElapsed(note.createdAt)}</p>
                </div>
              </>
            ))}
            </div>
        </main>
        </div>
        </>
    )
}