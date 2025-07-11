import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockData } from '../../data/mockData';
import './Leaderboard.css';

const Leaderboard = () => {
  const { user } = useAuth();
  const [timeFilter, setTimeFilter] = useState('all-time');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Sort users by points in descending order
  const sortedUsers = [...mockData.users]
    .filter(u => u.role === 'student')
    .sort((a, b) => b.points - a.points);

  const getUserRank = (userId) => {
    return sortedUsers.findIndex(u => u.id === userId) + 1;
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getProgressPercentage = (points, maxPoints) => {
    return Math.min((points / maxPoints) * 100, 100);
  };

  const maxPoints = sortedUsers.length > 0 ? sortedUsers[0].points : 0;
  const currentUserRank = getUserRank(user?.id);

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h1 className="leaderboard-title">🏆 Campus Leaderboard</h1>
        <p className="leaderboard-subtitle">Compete with fellow students and earn recognition</p>
      </div>

      <div className="leaderboard-controls">
        <div className="filter-group">
          <label>Time Period:</label>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all-time">All Time</option>
            <option value="this-month">This Month</option>
            <option value="this-week">This Week</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Activities</option>
            <option value="events">Events</option>
            <option value="study-groups">Study Groups</option>
            <option value="materials">Study Materials</option>
          </select>
        </div>
      </div>

      <div className="user-stats">
        <div className="user-rank-card">
          <div className="rank-icon">{getRankIcon(currentUserRank)}</div>
          <div className="rank-info">
            <div className="rank-title">Your Rank</div>
            <div className="rank-value">{currentUserRank} of {sortedUsers.length}</div>
          </div>
        </div>

        <div className="user-points-card">
          <div className="points-icon">⭐</div>
          <div className="points-info">
            <div className="points-title">Your Points</div>
            <div className="points-value">{user?.points || 0}</div>
          </div>
        </div>

        <div className="user-progress-card">
          <div className="progress-icon">📈</div>
          <div className="progress-info">
            <div className="progress-title">Progress</div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${getProgressPercentage(user?.points || 0, maxPoints)}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {getProgressPercentage(user?.points || 0, maxPoints).toFixed(1)}% to #1
            </div>
          </div>
        </div>
      </div>

      <div className="leaderboard-content">
        <div className="top-three">
          {sortedUsers.slice(0, 3).map((student, index) => (
            <div key={student.id} className={`podium-card rank-${index + 1}`}>
              <div className="podium-rank">
                <div className="rank-medal">{getRankIcon(index + 1)}</div>
                <div className="rank-position">#{index + 1}</div>
              </div>
              <div className="podium-avatar">
                <div className="avatar-circle">
                  {student.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="podium-info">
                <div className="podium-name">{student.name}</div>
                <div className="podium-department">{student.department}</div>
                <div className="podium-points">{student.points} points</div>
              </div>
            </div>
          ))}
        </div>

        <div className="leaderboard-list">
          <div className="list-header">
            <h3>Full Rankings</h3>
            <span className="list-subtitle">All students ranked by points</span>
          </div>
          
          <div className="ranking-list">
            {sortedUsers.map((student, index) => (
              <div 
                key={student.id} 
                className={`ranking-item ${student.id === user?.id ? 'current-user' : ''}`}
              >
                <div className="ranking-position">
                  <span className="position-number">{getRankIcon(index + 1)}</span>
                </div>
                
                <div className="ranking-avatar">
                  <div className="avatar-circle">
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                
                <div className="ranking-info">
                  <div className="ranking-name">{student.name}</div>
                  <div className="ranking-details">
                    <span className="ranking-department">{student.department}</span>
                    <span className="ranking-year">{student.year} Year</span>
                  </div>
                </div>
                
                <div className="ranking-points">
                  <div className="points-value">{student.points}</div>
                  <div className="points-label">points</div>
                </div>
                
                <div className="ranking-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${getProgressPercentage(student.points, maxPoints)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="points-info-section">
        <h3>How to Earn Points</h3>
        <div className="points-guide">
          <div className="points-item">
            <div className="points-icon">🎉</div>
            <div className="points-text">
              <strong>Event Participation:</strong> 30-50 points per event
            </div>
          </div>
          <div className="points-item">
            <div className="points-icon">📚</div>
            <div className="points-text">
              <strong>Upload Study Materials:</strong> 20 points per upload
            </div>
          </div>
          <div className="points-item">
            <div className="points-icon">👥</div>
            <div className="points-text">
              <strong>Join Study Groups:</strong> 15 points per group
            </div>
          </div>
          <div className="points-item">
            <div className="points-icon">📸</div>
            <div className="points-text">
              <strong>Share Content:</strong> 10 points per post
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;