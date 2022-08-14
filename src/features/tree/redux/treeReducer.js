import {createSlice} from "@reduxjs/toolkit";

const defaultState ={
    lastId: 6, // last include default, hardcode but now, i don't know how it fix
    selectedId: 1,
    value: {
        1: {title: 'Main', child: [2,3], parentId: undefined,color: "aqua"},
        2: {title: 'First', child: [], parentId: 1, color: "white"},
        3: {title: 'Second', child: [4,5], parentId: 1, color: "white"},
        4: {title: 'GIGA CHAD', child: [], parentId: 3, color: "white"},
        5: {title: 'Rayon Gosling', child: [], parentId: 3, color: "white"},
}};

const initialState  = {...defaultState};

const removeRecursion = (state, deleteId) =>{
    const child = state.value[deleteId].child
    delete state.value[deleteId]

    child.forEach((i)=> removeRecursion(state, i))
}

export const treeSlice = createSlice({
    name: 'tree',
    initialState,
    reducers: {
        add: (state, action) => {
            state.lastId++
            state.value[state.lastId] = {title: action.payload.title, child: [], parentId: state.selectedId, color: action.payload.color}
            state.value[state.selectedId].child.push(state.lastId)
        },
        edit: (state, action) => {

            console.log(state.value[state.selectedId])
            if(action.payload.id){
                if(state.value.hasOwnProperty(action.payload.id)){
                    alert("Данный ID занят")
                    return;
                }

                const element = state.value[state.selectedId]
                delete state.value[state.selectedId]
                state.value[action.payload.id] = {
                    title: action.payload.title,
                    child: element.child,
                    parentId: element.parentId,
                    color: element.color}

                const index = state.value[element.parentId].child.indexOf(state.selectedId)
                state.value[element.parentId].child.splice(index,1)
                state.value[element.parentId].child.push(action.payload.id)
                state.selectedId = action.payload.id
                console.log(state.selectedId + " to " + action.payload.id)
            }
            else {
                state.value[state.selectedId].title = action.payload.title
            }
        },
        remove: (state) => {
            if(state.selectedId == 1){
                alert("Невозможно удалить корневой элемент")
                return
            }
            const element = state.value[state.selectedId]
            const index = state.value[element.parentId].child.indexOf(state.selectedId)
            state.value[element.parentId].child.splice(index,1)
            removeRecursion(state, state.selectedId)
            console.log("selected id - " + state.selectedId + " and removed")
            state.selectedId = 1
            state.value[state.selectedId].color = 'aqua'
        },
        setSelectedId: (state, action) => {
            state.value[state.selectedId].color = 'white'
            state.selectedId = action.payload
            state.value[state.selectedId].color = 'aqua'
            console.log("selected id - " + state.selectedId)
        },
        reset: (state) => {
            state.value = defaultState.value
            state.selectedId = 1;
        },
        importFromJson: (state, action) => {
            if(!action.payload.selectedId || !action.payload.value || !action.payload.lastId){
                alert("Неправильный формат файла")
                return
            }
                    state.selectedId = action.payload.selectedId
                    state.value = action.payload.value
                    state.lastId = action.payload.lastId
        },
        exportToJson: (state) => {
            const json =
                `data:text/json;chatset=utf-8,${encodeURIComponent(
                    JSON.stringify(state)
                )}`;
            const link = document.createElement("a");
            link.href = json;
            link.download = "tree.json";

            link.click();

        }
    }
})

export const { add, reset, edit, remove, setSelectedId, exportToJson, importFromJson} = treeSlice.actions;

export default treeSlice.reducer;