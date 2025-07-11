import React, { useState } from 'react';
import './MediaCard.css';

const MediaCard = ({ item }) => {
  const [likes, setLikes] = useState(item.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTypeIcon = (type) => {
    return type === 'meme' ? '😂' : '🖼️';
  };

  const getTypeColor = (type) => {
    return type === 'meme' ? 'accent' : 'secondary';
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <div className="media-card">
      <div className="media-image">
        <img src={item.imageUrl} alt={item.title} />
        <div className={`media-type ${getTypeColor(item.type)}`}>
          {getTypeIcon(item.type)} {item.type}
        </div>
      </div>
      
      <div className="media-content">
        <h3 className="media-title">{item.title}</h3>
        <p className="media-caption">{item.caption}</p>
        
        <div className="media-tags">
          {item.tags.map((tag, index) => (
            <span key={index} className="media-tag">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="media-meta">
          <div className="media-author">
            <span className="author-icon">👤</span>
            <span className="author-name">{item.uploadedBy}</span>
          </div>
          
          <div className="media-date">
            <span className="date-icon">📅</span>
            <span className="date-text">{formatDate(item.createdAt)}</span>
          </div>
        </div>
      </div>
      
      <div className="media-actions">
        <button 
          className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <span className="action-icon">{isLiked ? '❤️' : '🤍'}</span>
          <span className="action-text">{likes}</span>
        </button>
        
        <button 
          className="action-btn comment-btn"
          onClick={() => setShowComments(!showComments)}
        >
          <span className="action-icon">💬</span>
          <span className="action-text">{item.comments.length}</span>
        </button>
        
        <button className="action-btn share-btn">
          <span className="action-icon">🔗</span>
          <span className="action-text">Share</span>
        </button>
      </div>
      
      {showComments && (
        <div className="media-comments">
          <div className="comments-header">
            <h4>Comments ({item.comments.length})</h4>
            <button 
              className="close-comments-btn"
              onClick={() => setShowComments(false)}
            >
              ×
            </button>
          </div>
          
          <div className="comments-list">
            {item.comments.length > 0 ? (
              item.comments.map(comment => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-author">{comment.user}</div>
                  <div className="comment-text">{comment.text}</div>
                  <div className="comment-date">{formatDate(comment.createdAt)}</div>
                </div>
              ))
            ) : (
              <div className="no-comments">
                <p>No comments yet. Be the first to comment!</p>
              </div>
            )}
          </div>
          
          <div className="add-comment">
            <input
              type="text"
              placeholder="Add a comment..."
              className="comment-input"
            />
            <button className="btn btn-primary comment-submit-btn">
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaCard;