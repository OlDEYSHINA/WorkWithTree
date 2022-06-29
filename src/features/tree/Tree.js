import React, { useState } from 'react';
import TreeItem from "./TreeItem";
import TreeForm from "./TreeForm";

export function Tree() {
    const [elements, setElements] = useState([
        {id: 1, title: 'Main', parentId: 0},
        {id: 2, title: 'First', parentId: 1},
        {id: 3, title: 'Second', parentId: 1},
        {id: 4, title: 'Hate it', parentId: 2},
        {id: 5, title: 'Who are you today 1 or \'1\'', parentId: 2},
        ])
    
    const [selectedId, setSelectedId] = useState(0)
    
    const SetSelectedElement = (id) => {
        setSelectedId(parseInt(id));
    }

    const createElement = (newElement) => {
        newElement.parentId = selectedId
        setElements([...elements, newElement])
    }

    return (
        <div>
           <p>Tree editor</p>
            <div>
                {selectedId}
                <TreeItem setCurrent={SetSelectedElement} elements={elements} currentId={1} key={1}/>
                <TreeForm create={createElement}/>
                
                <div>
                    <button>Изменить элемент</button>
                    <button>Удалить элемент</button>
                </div>
            </div>
        </div>
    );
}
