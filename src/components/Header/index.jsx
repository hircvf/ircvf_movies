import "./header.modules.css";

import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        IRCVF Movies
      </Link>
      <Link className="favorites" to="/favorites">
        Meus Filmes
      </Link>
    </header>
  );
}
