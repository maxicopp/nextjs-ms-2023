import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { NotificationContext } from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  async function fetchComments() {
    const response = await fetch(`/api/comments/${eventId}`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetchComments().then((data) => {
        setComments(data.comments);
        setIsFetchingComments(false);
      });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Sending...',
      message: 'Sending comment...',
      status: 'pending',
    });

    try {
      const response = await fetch(`/api/comments/${eventId}`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Sending comment failed!');
      }

      const data = await response.json();
      console.log(data);

      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Comment added successfully!',
        status: 'success',
      });

      setComments((prevComments) => [data.comment, ...prevComments]);
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: 'Sending comment failed!',
        status: 'error',
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
