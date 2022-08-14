import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setSelectedId} from "./redux/treeReducer";

const TreeItem = ({currentId, isDebug}) => {

    const dispatch = useDispatch()
    const element = useSelector(state => state.tree.value[currentId])

    return (
        <div>
            {console.log("try to spawn" + currentId)}
            {console.log(element)}
            <div style={{backgroundColor: element.color}} onClick={() => dispatch(setSelectedId(currentId))} className="element__content">
                <b style={{display:isDebug}}>{currentId} </b>
                <b>{element.title}</b>
            </div>
            <div className="child__box">
                <div className="child">
                    {console.log("spawned "+currentId)}
                    {
                        element.child.map((i) => <TreeItem isDebug={isDebug} currentId={i} key={i}/>)}
                </div>
            </div>
        </div>
    );
};

export default TreeItem;