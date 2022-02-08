// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItems = props => {
  const {commentDetails} = props
  const {id, name, comment, date, initialClassName, isLiked} = commentDetails
  const initial = name[0].toUpperCase()
  const likeTextClassName = isLiked ? 'button active' : 'button'
  const postedDate = formatDistanceToNow(date)
  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }
  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div className="username-date-containers">
          <p>{name}</p>
          <p>{postedDate} ago</p>
        </div>
        <p>{comment}</p>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img src={likeImgUrl} alt="like" className="like-image" />
          <button
            type="button"
            className={likeTextClassName}
            onClick={onClickLike}
          >
            Like
          </button>
        </div>
        <button
          type="button"
          className={likeTextClassName}
          onClick={onDeleteComment}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete-btn"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default CommentItems
