import React from 'react';
import './semForm.css';
import { useNavigate } from 'react-router';

export default function SemForm() {
  const navigate = useNavigate();
  const semesters = [
    "1st Sem", "2nd Sem", "3rd Sem", "4th Sem",
    "5th Sem", "6th Sem", "7th Sem", "8th Sem"
  ];


  return (
    <div className="semform-wrapper">
      <div className="semform-container animate-fade">
        <h1 className="semform-title">📚 Select Your Semester</h1>
        <ul className="semester-list">
          {semesters.map((sem, idx) => (
            <li key={idx} className="semester-item">
              {sem}
            </li>
          ))}
        </ul>
        <button className="cancel-btn neon-red" onClick={() => navigate('/study-materials')}>
          ✖ Cancel
        </button>
      </div>
    </div>
  );
}