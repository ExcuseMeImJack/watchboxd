import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { thunkGetAllLists } from "../../store/lists";
import './ListsPage.css'
import UserProfilePage from "../UserProfilePage";
import { thunkGetAllUsers } from "../../store/session";

const ListsPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const lists = useSelector(state => state.lists.lists?.filter(list => list.is_private === false && list.films.length >= 4))
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkGetAllLists())
    }, [dispatch])

    if(!lists) return null
    console.log(lists)

    return (
        <div className="lists-page-container">
            <div className="lists-page">
                <div className="lists-page-intro">
                    <h1>Collect and curate. Lists are the perfect way to group films.</h1>
                    {user && <button className="change-cursor" onClick={() => history.push('/lists/create')}>Start your own list</button>}
                </div>
                <div className="lists-container">
                    {lists.map(list =>
                        <div className="list-tile-container" onClick={() => history.push(`/lists/${list.id}`)}>
                            <div className="list-tile">
                                <span className="list-tile-overlap change-cursor">
                                    <img src={list.films[0]?.tile_img_url}/>
                                    <img src={list.films[1]?.tile_img_url}/>
                                    <img src={list.films[2]?.tile_img_url}/>
                                    <img src={list.films[3]?.tile_img_url}/>
                                </span>
                            </div>
                            <div className="list-tile-info">
                                <h2 className="change-cursor" id="list-name-text" >{list.list_name}</h2>
                                <div className="list-info-content">
                                    <img src={list.creator_profile_img_url} />
                                    <div className="list-info-line">
                                        <p>{list.creator_username}</p>
                                        <p>{list.films.length} films</p>
                                    </div>
                                </div>
                                <p>{list.description}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ListsPage
