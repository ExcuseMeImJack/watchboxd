const GET_ALL_LISTS = "lists/GET_LISTS"
const GET_ONE_LIST = "lists/GET_LIST"
const CREATE_LIST = "lists/CREATE_LIST"
const DELETE_LIST = "lists/DELETE_LIST"

const actionGetAllLists = (lists) => ({
    type: GET_ALL_LISTS,
    payload: lists
})

const actionGetOneList = (list) => ({
    type: GET_ONE_LIST,
    payload: list
})

const actionCreateList = (newList) => ({
    type: CREATE_LIST,
    payload: newList
})

const actionDeleteList = (list) => ({
    type: DELETE_LIST,
    payload: list
})


export const thunkGetAllLists = () => async(dispatch) => {
    const res = await fetch('/api/lists');
    if(res.ok) {
        const lists = await res.json();
        dispatch(actionGetAllLists(lists));
        return lists;
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkGetListById = (listId) => async(dispatch) => {
    const res = await fetch(`/api/lists/${listId}`);
    if(res.ok) {
        const list = await res.json();
        dispatch(actionGetOneList(list));
        return list;
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkCreateList = (list) => async(dispatch) => {
    const res = await fetch('/api/lists', {
        method: "POST",
        body: list
    })

    if(res.ok) {
        const newList = await res.json();
        if(newList.errors) return newList.errors
        dispatch(actionCreateList(newList))
        return newList;
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkUpdateList = (list, listId) => async(dispatch) => {
    const res = await fetch(`/api/lists/${listId}`, {
        method: "PUT",
        body: list
    })
    if(res.ok) {
        const updatedList = await res.json();
        return updatedList;
    }
}

export const thunkDeleteList = (list) => async(dispatch) => {
    const res = await fetch(`/api/lists/${list.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(res.ok) {
        const data = await res.json();
        if(data.errors) {
            return data.errors;
        }
        dispatch(actionDeleteList(list))
    }
}

const initialState = { lists: null }

export default function reducer(state = initialState, action) {
    switch(action.type){
        case GET_ALL_LISTS: {
            const newState = {...state, lists: action.payload.lists}
            return newState
        }
        case GET_ONE_LIST: {
            const newState = {...state, lists: action.payload.list}
            return newState
        }
        case CREATE_LIST: {
            const newState = {...state, lists: action.payload.newList}
            return newState
        }
        case DELETE_LIST: {
            const newState = {...state}
            delete newState[action.list]
            return newState
        }
        default:
            return state;
    }
}
