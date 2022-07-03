
const defaultState = {
    currentId: 0,
}

const treeReducer = (state, action) => {
    switch (action.type) {
        case "SELECT_ID": 
            return {...state, }

        default:
            return state
    }
}

export default treeReducer()