import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div>
      <h3>Page Not Found</h3>
      <p>
        <Link className="btn btn-primary" to="/">
          Back to Home
        </Link>
      </p>
    </div>
  );
}
