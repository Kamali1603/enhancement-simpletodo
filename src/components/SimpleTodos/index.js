import {Component} from 'react'

import TodoItem from '../TodoItem'

import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    completed: false,
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    completed: false,
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    completed: false,
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    completed: false,
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
    completed: false,
  },
  {
    id: 6,
    title: 'Fix the production issue',
    completed: false,
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
    completed: false,
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
    completed: false,
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    newTodoTitle: '',
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleAddTodo = () => {
    const {newTodoTitle} = this.state

    const trimmedTitle = newTodoTitle.trim()
    if (trimmedTitle === '') {
      return
    }

    const match = trimmedTitle.match(/^(.*)\s(\d+)$/)
    let title = trimmedTitle
    let todoCount = 1

    if (match) {
      ;[, title, todoCount] = match
      todoCount = parseInt(todoCount, 10)
    }

    const newTodos = Array.from({length: todoCount}, (_, i) => ({
      id: Date.now() + i,
      title: title.trim(),
      completed: false,
    }))
    this.setState(prevState => ({
      todosList: [...prevState.todosList, ...newTodos],
      newTodoTitle: '',
    }))
  }

  toggleComplete = id => {
    const {todosList} = this.state
    const updatedTodoList = todosList.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo,
    )
    this.setState({todosList: updatedTodoList})
  }

  deleteTodo = id => {
    const {todosList} = this.state
    const updatedTodosList = todosList.filter(eachTodo => eachTodo.id !== id)

    this.setState({
      todosList: updatedTodosList,
    })
  }

  updateTodo = (id, newTitle) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, title: newTitle} : todo,
      ),
    }))
  }

  render() {
    const {todosList, newTodoTitle} = this.state

    return (
      <div className="app-container">
        <div className="simple-todos-container">
          <h1 className="heading">Simple Todos</h1>
          <div className="add-todo">
            <div>
              <input
                type="text"
                name="newTodoTitle"
                value={newTodoTitle}
                onChange={this.handleChange}
                placeholder="Enter todo title"
                className="input"
              />
            </div>
            <button
              onClick={this.handleAddTodo}
              type="button"
              className="btn-add"
            >
              Add
            </button>
          </div>
          <ul className="todos-list">
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
                toggleComplete={this.toggleComplete}
                updateTodo={this.updateTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
