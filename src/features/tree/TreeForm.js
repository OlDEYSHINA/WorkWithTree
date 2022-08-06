import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {add, edit, remove, reset} from "./redux/treeReducer";

const TreeForm = () => {

    //#region Properties

    const [isEnableEditor, setEnableEditor] = useState("none")
    const [isEnableCreator, setEnableCreator] = useState("none")

    const [title, setTitle] = useState("")

    //#endregion Properties

    const beginCreateElement =(e) => {
        e.preventDefault()
        setTitle("")
        setEnableEditor("none")
        setEnableCreator("block")
    }

    const finishCreateElement = (e) => {
        e.preventDefault()

        if(!title || !title.trim())
        {
            alert('Имя не может быть пустым')
            return
        }
        dispatch(add({title: title, color: "lightgreen"} ))
        setEnableCreator("none")
    }

    const cancelCreateElement = (e) => {
        e.preventDefault()
        setEnableCreator("none")

    }

    //#region EditElement

    const beginEditElement = (e) => {
        e.preventDefault()
        setTitle("")
        setEnableCreator("none")
        setEnableEditor("block")        
    }

    const finishEditElement = (e) => {
        e.preventDefault()

        if(!title || !title.trim())
        {
            alert('Имя не может быть пустым')
            return
        }

        dispatch(edit(title))
        setEnableEditor("none")
    }

    const cancelEditElement = (e) => {
        e.preventDefault()
        setEnableEditor("none")
    }

    //#endregion EditElement

    const removeElement = (e) => {
        e.preventDefault()
        dispatch(remove())
        setTitle( '')
    }

    const dispatch = useDispatch()

    return (
        <div>
            <div style={{display: isEnableEditor, border: "2px red dotted", paddingBottom: "5px", backgroundColor: "lightsalmon"}}>
                <a>Новое именование</a> 
                <br/>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    placeholder="Новое именование"
                />
                <br/>
                <button style={{marginRight: 20}} onClick={cancelEditElement}>Отмена</button>
                <button onClick={finishEditElement}>Подтвердить</button>
            </div>

            <div style={{display: isEnableCreator, border: "2px red dotted", paddingBottom: "5px", backgroundColor: "lightgreen"}}>
                <a>Название</a>
                <br/>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    placeholder="Название"
                />
                <br/>
                <button style={{marginRight: 20}} onClick={cancelCreateElement}>Отмена</button>
                <button  onClick={finishCreateElement}>Подтвердить</button>
            </div>

            <div>
                <button onClick={beginCreateElement} >Создать элемент</button>
                <button onClick={beginEditElement} style={{marginLeft: 10, marginRight: 10}}> Изменить выбранный</button>
                <button onClick={removeElement}>Удалить элемент(ы)</button>
            </div>
            <button onClick={()=> dispatch(reset())}>Восстановить исходные данные</button>
        </div>
    );
};

export default TreeForm;