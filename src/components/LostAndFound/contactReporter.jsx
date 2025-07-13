import "./contactReporter.css";

export default function ContactReporter({ name, email, onClose }) {
  return (
    <div className="overlay">
      <div className="contact-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className="contact-title">Contact Reporter</h2>
        <p className="contact-info"><strong>Name:</strong> {name}</p>
        <p className="contact-info"><strong>Email:</strong> {email}</p>
      </div>
    </div>
  );
}