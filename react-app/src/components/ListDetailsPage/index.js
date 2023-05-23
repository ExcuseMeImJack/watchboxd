import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom";
import './ListDetails.css'
import { useEffect } from "react";
import { thunkGetAllLists } from "../../store/lists";
import OpenModalButton from "../OpenModalButton";
import DeleteListModal from "../DeleteListModal";

const ListDetailsPage = () => {
    const {listId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const list = useSelector(state => state.lists.lists?.find(list => list.id === parseInt(listId)))
    const user = useSelector(state => state.session.user)
    let percentageWatched;

    useEffect(() => {
        dispatch(thunkGetAllLists())
    }, [dispatch])

    if(!list) return null

    const checkAmountWatched = () => {
        const userFilms = user.films_watched;
        const userFilmIds = userFilms.map(film => film.id);
        const listFilms = list.films;
        const watchedFilmsFromList = listFilms.filter(film => userFilmIds.includes(film.id))
        calculatePercentageWatched(watchedFilmsFromList.length, listFilms.length)
        return watchedFilmsFromList.length;
    }

    const calculatePercentageWatched = (numOfWatched, numOfFilms) => {
        percentageWatched = ((numOfWatched / numOfFilms) * 100).toFixed(0);
    }

    return (
        <div className="list-details-page-container">
            <div className="list-details-page">
                <div className="list-background-image-container faded faded-all">
                    <img id="list-background-image" src={list.films[0].background_img_url} />
                </div>
                <div className="list-details-main">
                    <div className="list-details-left">
                        <div className="list-details-list-info-1">
                            <img id="list-details-profile-img-icon" src={list.creator_profile_img_url}/>
                            <p>List by {list.creator_username}</p>
                        </div>
                        <div className="list-details">
                            <h1>{list.list_name}</h1>
                            <p>{list.description}</p>
                        </div>
                    </div>
                    <div className="list-details-right">
                        <div className="list-interactions-panel">
                            {user && user.id === list.user_id &&
                            <div className="list-interactions">
                                <button className="update-film-button change-cursor" onClick={() => history.push(`/lists/${list.id}/edit`)}>UPDATE LIST</button>
                                <OpenModalButton
                                    buttonStyleClass={"delete-profile change-cursor"}
                                    buttonText={"DELETE LIST"}
                                    modalComponent={<DeleteListModal list={list}/>}
                                    modalStyleClass={"delete-profile-modal-content"}
                                />
                            </div>}
                            {user && <div className="list-watch-percentage">
                                <div className="list-watch-percentage-text">
                                    <p>You've watched</p>
                                    <p>{checkAmountWatched()} of {list.films.length}</p>
                                </div>
                                <div className="list-watch-percentage-number">
                                    <h2>{percentageWatched}</h2>
                                    <h3>%</h3>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="list-films">
                    {list.films.map(film =>
                        <Link key={film.title} className="user-profile-recent-films-card list-card" to={`/films/${film.id}`}>
                        <img id="user-profile-recent-films-card-img" src={film.tile_img_url} alt="" />
                      </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ListDetailsPage
