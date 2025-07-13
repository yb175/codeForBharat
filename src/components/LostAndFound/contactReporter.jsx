import "./contactReporter.css";
import { useApp } from "../../context/AppContext";
import { Link } from "react-router";
import { useParams } from "react-router";

export default function ContactReporter() {
  const { id } = useParams();
  const item = useApp().lostItems.find((item) => item.id === id);

  const name = item?.reportedBy || "Anonymous";
  const email = item?.contact || "Not Provided";

  return (
    <div className="overlay">
      <div className="contact-modal">
        <Link to="/lost-found">
          <button className="close-btn">×</button>
        </Link>
        <h2 className="contact-title">Contact Reporter</h2>
        <p className="contact-info"><strong>Name:</strong> {name}</p>
        <p className="contact-info"><strong>Email:</strong> {email}</p>
      </div>
    </div>
  );
}