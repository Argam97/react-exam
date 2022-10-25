import React from 'react';
import "./todo.css"
function Todo({isSelected,title, isDone, children, id, onDone, onEdit,editMode,onComplete,onSelect}) {
    console.log(isSelected)
    return (
        
        <div className={isDone ? 'done' : ''} onClick={() => onDone(id)}>
            {id === editMode.todoId
                ?
                <div className='todo'>
                    <input value={editMode.editedTodo} type="text" onChange={(e) => onEdit(e, id, e.target.value)}/>
                    <div>
                        <button onClick={(e) => onComplete(e,id)}>complete</button>
                        <button onClick={(e) => onEdit(e)}>cancel</button>
                    </div>
                </div>
                :
                <div className='todo'>
                    {children}
                    <div className="todoOpt">
                        <input
                            onChange={(e) => onSelect(e, id)}
                            value={isSelected}
                            className='checkBox'
                            type="checkbox"
                        />
                        <button onClick={(e) => onEdit(e, id, title)}>Edit</button>
                    </div>
                </div>}
        </div>
    );
}

export default Todo;