import React from 'react';
import TreeItem from "./TreeItem";
import TreeForm from "./TreeForm";

export function Tree() {
    return (
        <div>
           <h1>Tree editor</h1>
            <div>
                <TreeItem currentId={1} key={1}/>
                <TreeForm/>
            </div>
        </div>
    );
}
