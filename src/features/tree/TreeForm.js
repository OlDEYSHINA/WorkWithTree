import React, {useState} from 'react';

const TreeForm = ({create}) => {
    const [element, setElement] = useState({id: 0, title: '', parentId: 0})

    const addNewElement = (e) => {
        e.preventDefault()
        const newPost = {
            ...element, id: Date.now()
        }
        create(newPost)
        setElement({title: '', parentId: 0})
    }
    
    return (
        <div>
            <input
                value={element.title}
                onChange={e=> setElement({...element, title: e.target.value})}
                type="text"
                placeholder="Название элемента"
            />
            <button onClick={addNewElement} >Создать пост</button>
        </div>
    );
};

export default TreeForm;