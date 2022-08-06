import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setSelectedId} from "./redux/treeReducer";

const TreeItem = ({currentId}) => {

    const dispatch = useDispatch()
    const element = useSelector(state => state.tree.value[currentId])

    return (
        <div>
            <div style={{backgroundColor: element.color}} onClick={() => dispatch(setSelectedId(currentId))} className="element__content">
                <strong>{element.id} {element.title}</strong>
            </div>
            <div className="child__box">
                <div className="child">
                    {
                        element.child.map((i) => <TreeItem currentId={i} key={i}/>)}
                </div>
            </div>
        </div>
    );
};

export default TreeItem;