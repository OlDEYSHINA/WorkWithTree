import {createSlice} from "@reduxjs/toolkit";

const defaultState ={
    lastId: 6, // last include default, hardcode but now, i don't know how it fix
    selectedId: 1,
    value: {
        1: {title: 'Main', child: [2,3], parentId: undefined,color: "aqua"},
        2: {title: 'First', child: [], parentId: 1, color: "white"},
        3: {title: 'Second', child: [4,5], parentId: 1, color: "white"},
        4: {title: 'GIGA CHAD', child: [], parentId: 3, color: "white"},
        5: {title: 'OH YEAH, MISTER CRABS', child: [], parentId: 3, color: "white"},
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
            state.value[state.selectedId].title = action.payload
        },
        remove: (state) => {
            const element = state.value[state.selectedId]
            const index = state.value[element.parentId].child.indexOf(element.parentId)
            state.value[element.parentId].child.splice(index,1)

            removeRecursion(state, state.selectedId)

            state.selectedId = 1
            state.value[state.selectedId].color = 'aqua'
            console.log("selected id - " + state.selectedId)
        },
        setSelectedId: (state, action) => {
            state.value[state.selectedId].color = 'white'
            state.selectedId = action.payload
            state.value[state.selectedId].color = 'aqua'
            console.log("selected id - " + state.selectedId)
        },
        reset: (state)=> {
            state.value = defaultState.value
        }
    }
})

export const { add, reset, edit, remove, setSelectedId} = treeSlice.actions;

export default treeSlice.reducer;