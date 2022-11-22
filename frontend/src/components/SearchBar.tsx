import { SetStateAction, useEffect, useState } from "react";
import { Notes } from "../utilis";
import {  BsSearch} from "react-icons/bs";
type Props = {
  notes:any,
  setNotes: React.Dispatch<SetStateAction<Notes[]>>;
};
export function SearchBar({notes, setNotes}:Props) {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
  
      const form = event.currentTarget;
      const noteTitle = form.search.value;
  
      if (noteTitle) {
        fetch(`http://localhost:4000/searchnotes/${noteTitle}`)
          .then((resp) => resp.json())
          .then((notesFromServer) => setNotes(notesFromServer));
      } else {
        fetch("http://localhost:4000/notes")
          .then((resp) => resp.json())
          .then((notesFromServer) => setNotes(notesFromServer));
      }
    }
    
  return (
    <div className="notes-search">
      <form
        className="note-search-form"
        onSubmit={(event) => handleSubmit(event)}
      >
        <input
          className="note-search-input"
          name="search"
          type="text"
          placeholder="What?"
        ></input>
        <button className="note-search-btn"><BsSearch/></button>
      </form>
    </div>
  );
}
  