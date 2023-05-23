import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { thunkGetAllLists } from "../../store/lists";
import ListForm from "../ListForm";

const ListUpdate = () => {
    const {listId} = useParams();
    const dispatch = useDispatch();
    const lists = useSelector(state => state.lists.lists)

    useEffect(() => {
        dispatch(thunkGetAllLists())
    }, [dispatch])

    if(!lists) return null

    const list = lists.find(list => list.id === parseInt(listId));

    return (
        <ListForm
            list={list}
            formType={'update'}/>
    )
}

export default ListUpdate
