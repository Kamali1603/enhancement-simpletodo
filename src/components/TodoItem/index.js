import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  state = {
    edit: false,
    updateTitle: '',
  }

  handleEdit = () => {
    const {todoDetails} = this.props
    this.setState({edit: true, updateTitle: todoDetails.title})
  }

  handleSave = () => {
    const {updateTodo, todoDetails} = this.props
    const {updateTitle} = this.state
    updateTodo(todoDetails.id, updateTitle)
    this.setState({edit: false})
  }

  handleChange = event => {
    this.setState({updateTitle: event.target.value})
  }

  render() {
    const {todoDetails, deleteTodo, toggleComplete} = this.props
    const {edit, updateTitle} = this.state

    return (
      <li className="todo-item">
        {edit ? (
          <>
            <input
              type="text"
              value={updateTitle}
              onChange={this.handleChange}
              className="save-input"
            />
            <button
              onClick={this.handleSave}
              type="button"
              className="save-btn"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              checked={todoDetails.completed}
              onChange={() => toggleComplete(todoDetails.id)}
            />
            <p
              className={
                todoDetails.completed ? 'todo-item-completed' : 'not-completed'
              }
            >
              {todoDetails.title}
            </p>
            <div className="buttons">
              <button
                onClick={this.handleEdit}
                type="button"
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todoDetails.id)}
                type="button"
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </li>
    )
  }
}

export default TodoItem
