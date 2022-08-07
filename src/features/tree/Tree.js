import React, {useState} from 'react';
import TreeItem from "./TreeItem";
import TreeForm from "./TreeForm";

export function Tree() {
    const [debugMode, setDebugMode] = useState("none")

    return (
        <div>
           <h1>Tree editor</h1>
            <div>
                <TreeItem isDebug={debugMode} currentId={1} key={1}/>
                <TreeForm setDebug={setDebugMode} debugState={debugMode}/>
            </div>
        </div>
    );
}
