import React, { useState } from 'react';

interface Comment {
  id: number;
  text: string;
  replies: Comment[];
}

const CommentSystem: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  const addComment = (text: string, parentId: number | null = null) => {
    if (parentId === null) {
      setComments([...comments, { id: Date.now(), text, replies: [] }]);
    } else {
      const addReply = (commentsList: Comment[]): Comment[] =>
        commentsList.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [
                ...comment.replies,
                { id: Date.now(), text, replies: [] },
              ],
            };
          }
          return {
            ...comment,
            replies: addReply(comment.replies),
          };
        });
      setComments(addReply(comments));
    }
  };

  const renderComments = (commentsList: Comment[]): JSX.Element[] => {
    return commentsList.map((comment) => (
      <div
        key={comment.id}
        style={{
          margin: '10px 0',
          textAlign: 'left',
          border: '1px solid #ddd',
          padding: '10px',
          borderRadius: '5px',
          background: '#f9f9f9',
        }}
      >
        <p style={{ fontSize: '16px', marginBottom: '10px' }}>{comment.text}</p>
        <input
          type="text"
          placeholder="Reply..."
          style={{
            width: '90%',
            margin: '5px 0',
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
              addComment(e.currentTarget.value.trim(), comment.id);
              e.currentTarget.value = '';
            }
          }}
        />
        {comment.replies.length > 0 && (
          <div
            style={{
              marginTop: '10px',
              marginLeft: '20px',
              borderLeft: '2px solid #ddd',
              paddingLeft: '10px',
              maxWidth: '95%',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
            }}
          >
            <strong style={{ display: 'block', marginBottom: '5px' }}>
              Replies:
            </strong>
            <div style={{ display: 'inline-block', width: 'max-content' }}>
              {renderComments(comment.replies)}
            </div>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: "'Roboto', Arial, sans-serif",
        margin: '0 auto',
        width: '80%',
      }}
    >
      <h1 style={{ margin: '20px 0', color: '#333', fontSize: '36px' }}>
        Comment Section
      </h1>
      <p style={{ margin: '10px 0 30px', fontSize: '18px', color: '#555' }}>
        Feel free to leave a comment
      </p>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Enter new comment"
        style={{
          width: '60%',
          margin: '10px 0',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '16px',
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && newComment.trim()) {
            addComment(newComment.trim());
            setNewComment('');
          }
        }}
      />
      <div style={{ marginTop: '20px' }}>{renderComments(comments)}</div>
    </div>
  );
};

export default CommentSystem;
