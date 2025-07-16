import React, { use } from 'react';
import './semForm.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function SemForm({selectedSemester,setSelectedSemester,onCancel}) {
  const semesters = [
    "1st Sem", "2nd Sem", "3rd Sem", "4th Sem",
    "5th Sem", "6th Sem", "7th Sem", "8th Sem"
  ];

  const handleSemClick = (e) => {
    setSelectedSemester(e.target.textContent.replace(" Sem", ""))
    onCancel();
  };
  useEffect(() => {
    console.log(selectedSemester);
  },[selectedSemester])
  return (
    <div className="semform-wrapper">
      <div className="semform-container animate-fade">
        <h1 className="semform-title">📚 Select Your Semester</h1>
        <ul className="semester-list">
          {semesters.map((sem, idx) => (
            <li key={`sem${idx}`} className="semester-item" onClick={(e)=>handleSemClick(e)}>
              {sem}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}