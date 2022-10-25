import React, {useReducer, useState} from 'react';
import Todo from "../todo";
import {initialState, reducer, ACTION_TYPES} from "../reducer";
import './todolist.css'


function TodoList() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [deletable, setDeletable] = useState(false)
    
    const onDelete = (e, id) => {
        e.stopPropagation()
        dispatch({type: ACTION_TYPES.DELETE_TODO, payload: {id}})
    }
    
    const onDone = (id) => {
        dispatch({type: ACTION_TYPES.SET_DONE, payload: {id}})
    }
    
    const onEdit = (e, id = null, title = '') => {
        e.stopPropagation()
        dispatch({type: ACTION_TYPES.EDIT_TODO, payload: {id, title}})
    }
    
    const onSelect = (e, id) => {
        e.stopPropagation()
        dispatch({
            type: ACTION_TYPES.SELECT_TODO,
            payload: {id}
        })
    }
    
    const onCompleteTodo = (e, id) => {
        e.stopPropagation()
        dispatch({type: ACTION_TYPES.COMPLETE_TODO, payload: {id}})
    }
    
    const isDeletable = (e) => {
        e.stopPropagation()
        setDeletable(!deletable)
    }
    
    
    return (
        <div className='TodoList'>
            <div>
                <span>Deletabe <input type="checkbox" onChange={(e) => isDeletable(e)}/></span>
                
                <input
                    value={state.input}
                    onChange={(e) => dispatch({
                        type: ACTION_TYPES.UPDATE_INPUT,
                        payload: {inputValue: e.target.value}
                    })} type="text"/>
                
                <button
                    disabled={!state.input.trim()}
                    onClick={() => dispatch({
                        type: ACTION_TYPES.ADD_TODO,
                        payload : {
                            Deletable : deletable
                        }
                    })}>Add
                </button>
            </div>
            
            <div className='Todos'>
                {
                    state.todos.map(todo =>
                        <Todo
                            isSelected={todo.isSelected}
                            {...todo}
                            key={todo.id}
                            onSelect={onSelect}
                            onEdit={onEdit}
                            onDone={onDone}
                            onDelete={onDelete}
                            editMode={state.editMode}
                            onComplete={onCompleteTodo}>
                            {todo.title}
                        </Todo>)
                }
            </div>
            <button onClick={(e) => onDelete(e)}>Delete</button>
        
        </div>
    );
}

export default TodoList;