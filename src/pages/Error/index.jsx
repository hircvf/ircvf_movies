import { Link } from "react-router-dom";
import "./error.modules.css";

export function Error() {
  return (
    <div className="not_found">
      <h1>404</h1>
      <h2>A página não foi encontrada! :(</h2>

      <Link to="/">Voltar</Link>
    </div>
  );
}
