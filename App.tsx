import React from 'react';
import Questions from './Questions';
import CommentSystem from './CommentSystem';

const App: React.FC = () => {
  return (
    <div>
      <Questions />
      <CommentSystem />
    </div>
  );
};

export default App;
