import { SetStateAction } from "react";
import { NavLink } from "react-router-dom";
import { Notes } from "../utilis";

type Props = {
  notes: any;
  setNotes: React.Dispatch<SetStateAction<Notes[]>>;
};
export function NavBar({ notes, setNotes }: Props) {
  return (
    <>
      <ul className="navbar-items">
        <li>
          <NavLink to={"/homepage"}>Home</NavLink>
        </li>

        <li>
          <NavLink to="/me">Me</NavLink>
        </li>
        <li>
          <NavLink to="/important">Important</NavLink>
        </li>
        <li>
          <NavLink to="/work">Work</NavLink>
        </li>
        <li>
          <NavLink to="/animals">Animals</NavLink>
        </li>
      </ul>
    </>
  );
}
