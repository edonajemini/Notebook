import { SearchBar } from "./SearchBar";
import {  GiNotebook } from "react-icons/gi";
import { SetStateAction } from "react";
import { Notes } from "../utilis";
type Props = {
    notes: any;
    setNotes: React.Dispatch<SetStateAction<Notes[]>>;
  };
export function Header({notes, setNotes}:Props){
    return(
        <header>
            <div className="header-title">
            <h2>NoteBook</h2>
            <GiNotebook />
            </div>
        </header>
    )
}