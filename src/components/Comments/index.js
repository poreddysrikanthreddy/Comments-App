import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {inputText: '', inputComment: '', commentsList: []}

  changeNameInput = event => {
    this.setState({inputText: event.target.value})
  }

  changeCommentInput = event => {
    this.setState({inputComment: event.target.value})
  }

  deleteComment = id => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(eachComment => eachComment.id !== id),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsLists = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        commentDetails={eachComment}
        key={eachComment.id}
        deleteComment={this.deleteComment}
        toggleIsLiked={this.toggleIsLiked}
      />
    ))
  }

  addComments = event => {
    event.preventDefault()
    const {inputText, inputComment} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: inputText,
      comment: inputComment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      inputText: '',
      inputComment: '',
    }))
  }

  render() {
    const {inputText, inputComment, commentsList} = this.state
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Comments</h1>
          <div className="comments-inputs">
            <form onSubmit={this.addComments} className="form">
              <p className="form-description">
                Say Something about 4.0 Technologies
              </p>
              <input
                type="text"
                placeholder="Your Name"
                value={inputText}
                onChange={this.changeNameInput}
                className="input-name"
              />
              <textarea
                placeholder="Your Comment"
                value={inputComment}
                className="text-area"
                onChange={this.changeCommentInput}
                rows="6"
              />
              <button type="submit" className="add-comment">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-img"
            />
          </div>
          <hr className="hr-line" />
          <p className="comments-heading">
            <span className="counts">{commentsList.length}</span> Comments
          </p>
          <ul className="comments-lists">{this.renderCommentsLists()}</ul>
        </div>
      </div>
    )
  }
}
export default Comments
