import React, {useState} from 'react';

const TreeItem = ({elements, currentId, setCurrent}) => {
    console.log('Rendered item id - ' + currentId)
    const currentElement = elements.find(x => x.id === currentId);
    const child = elements.filter(y => y.parentId === currentElement.id);
    
    return (
        <div>
            <div style={{backgroundColor: currentElement.color}} onClick={() => setCurrent(currentElement.id)} className="element__content">
                <strong>{currentElement.id} {currentElement.title}</strong>
            </div>
            <div className="child__box">
                <div className="child">
                    {child.map((i, n) => <TreeItem elements={elements} setCurrent={setCurrent} currentId={i.id} key={i.id}/>)}
                </div>
            </div>
        </div>
    );
};

export default TreeItem;