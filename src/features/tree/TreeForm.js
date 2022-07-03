import React, {useState} from 'react';

const TreeForm = ({create, edit, remove, reset}) => {
    const [element, setElement] = useState({id: 0, title: '', parentId: 0, color: ""})

    const [isEnableEditor, setEnableEditor] = useState("none")

    const [editableTitle, setEditableTitle] = useState("")
    
    const addNewElement = (e) => {
        e.preventDefault()
        const newElement = {
            element, id: Date.now(), color: "white",
        }
        create(newElement)
        setElement({title: ''})
    }
    
    const beginEditElement = (e) => {
        e.preventDefault()
        setEnableEditor("block")        
    }
    
    const finishEditElement = (e) => {
        e.preventDefault()
        edit(editableTitle)
        setEnableEditor("none")
        setEditableTitle("")
    }
    
    const removeElement = (e) => {
        e.preventDefault()
        remove()
        setElement({title: ''})
    }
    
    return (
        <div>
            <div style={{display: isEnableEditor, border: "2px red dotted", paddingBottom: "5px", backgroundColor: "lightsalmon"}}>
                <a>Новое именование</a> 
                <br/>
                <input
                    value={editableTitle}
                    onChange={e => setEditableTitle(e.target.value)}
                    type="text"
                    placeholder="Новое именование"
                />
                <button onClick={finishEditElement}>Подтвердить</button>
            </div>
            
            <input
                value={element.title}
                onChange={e=> setElement({...element, title: e.target.value})}
                type="text"
                placeholder="Название элемента"
            />
            
            <div>
                <button onClick={addNewElement} >Создать элемент</button>
                <button onClick={beginEditElement} style={{marginLeft: 10, marginRight: 10}}> Изменить выбранный</button>
                <button onClick={removeElement}>Удалить элемент(ы)</button>
            </div>
            <button onClick={reset}>Восстановить исходные данные</button>
        </div>
    );
};

export default TreeForm;