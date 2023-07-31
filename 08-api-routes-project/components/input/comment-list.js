import classes from './comment-list.module.css';

function CommentList({ items }) {
  return (
    <ul className={classes.comments}>
      {items.map(({ _id, text, name }) => (
        <li key={_id}>
          <p>{text}</p>
          <div>
            By <address>{name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
