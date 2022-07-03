import React, { useState } from 'react';
import TreeItem from "./TreeItem";
import TreeForm from "./TreeForm";

export function Tree() {
    const [elements, setElements] = useState([
        {id: 1, title: 'Main', parentId: 0, color: "aqua"},
        {id: 2, title: 'First', parentId: 1, color: "white"},
        {id: 3, title: 'Second', parentId: 1, color: "white"},
        {id: 4, title: 'Js is magic world', parentId: 2, color: "white"},
        {id: 5, title: 'Who are you today 1 or \'1\'', parentId: 2, color: "white"},
        ])
    
    const [selectedId, setSelectedId] = useState(1)
    
    const setSelectedElement = (id) => {
        var previousSelected = elements.find(e => e.id === selectedId)
            if(previousSelected !== undefined){
                previousSelected.color = "white"
            }
        elements.find(e => e.id === id).color = "aqua"
        setSelectedId(parseInt(id));
    }
    
    // spooky, scary s̶k̶e̶l̶e̶t̶o̶n̶s̶ clones
    const defaultListOfElements = [
        {id: 1, title: 'Main', parentId: 0, color: "aqua"},
        {id: 2, title: 'First', parentId: 1, color: "white"},
        {id: 3, title: 'Second', parentId: 1, color: "white"},
        {id: 4, title: 'Js is magic world', parentId: 2, color: "white"},
        {id: 5, title: 'Who are you today 1 or \'1\'', parentId: 2, color: "white"},
    ]
    
    const createElement = (newElement) => {
        newElement.parentId = selectedId
        setElements([...elements, newElement])
    }
    
    const editElement = (newTitle) => {
        // по возможности надо найти другой способ
        var tempList = [...elements];
        tempList.find(x => x.id === selectedId).title = newTitle 
        setElements(tempList)
        
    }
    
    const removeElement = () => {
        var removeList = []
        removeList.push(elements.find(e => e.id === selectedId))
        removeRecursion(removeList, selectedId)
        setElements(elements.filter((el) => !removeList.includes(el)))
    }
    
    const removeRecursion= (removeList, parentId) => {
        const tempList = elements.filter(e => e.parentId === parentId)
        tempList.forEach(element => {
            removeList.push(element)
            removeRecursion(removeList, element.id)
        })
    }

    const resetElements = () => {
        setSelectedElement(1)
        setElements(defaultListOfElements)
    }

    return (
        <div>
           <h1>Tree editor</h1>
            <div>
                {selectedId}
                <TreeItem setCurrent={setSelectedElement} elements={elements} currentId={1} key={1}/>
                <TreeForm create={createElement} remove={removeElement} reset={resetElements} edit={editElement}/>
            </div>
        </div>
    );
}
