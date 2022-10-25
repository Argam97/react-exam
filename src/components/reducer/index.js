export const initialState = {
    input: "",
    todos: [],
    editMode: {
        todoId: '',
        editedTodo: '',
    }
}

export const ACTION_TYPES = {
    ADD_TODO: 'ADD_TODO',
    EDIT_TODO: 'EDIT_TODO',
    DELETE_TODO: 'DELETE_TODO',
    UPDATE_INPUT: 'UPDATE_INPUT',
    SET_DONE: 'SET_DONE',
    COMPLETE_TODO: 'COMPLETE_TODO',
    SELECT_TODO: 'SELECT_TODO',

    
}

export const reducer = (state, action) => {
    console.log(state.todos)
    switch (action.type) {
       
        case ACTION_TYPES.ADD_TODO : {
            const { Deletable } = action.payload
            return {
                ...state,
                input: '',
                todos: [...state.todos,
                    {id: Math.random(), title: state.input, isDone: false,isSelect:false, isDeletable: Deletable}]
            }
        }
        case ACTION_TYPES.UPDATE_INPUT : {
            return {...state, input: action.payload.inputValue}
        }
        case ACTION_TYPES.EDIT_TODO : {
            const {id, title} = action.payload
            return {...state, editMode: {todoId: id, editedTodo: title}}
        }
        case ACTION_TYPES.SET_DONE : {
            const {id} = action.payload
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === id) {
                        todo.isDone = !todo.isDone
                    }
                    return todo
                })
            }
        }
        case ACTION_TYPES.COMPLETE_TODO : {
            const {id} = action.payload
            return {
                ...state,
                editMode: {
                    // id: null,
                    editedTodo: '',
                },
                todos: state.todos.map(todo => {
                    if (todo.id === id) {
                        todo.title = state.editMode.editedTodo
                    }
                    return todo
                })
            }
        }
        case ACTION_TYPES.DELETE_TODO : {
            return {
                ...state,
                todos: state.todos.filter(todo => {
                    if(todo.isDeletable) {
                        return todo.isSelect !== true
                    }
                    return todo
                })
            }
        }
        case ACTION_TYPES.SELECT_TODO : {
            const {id} = action.payload
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === id) {
                        todo.isSelect = !todo.isSelect
                    }
                    return todo
                })
            }
        }
        default :return state;
    }
}

