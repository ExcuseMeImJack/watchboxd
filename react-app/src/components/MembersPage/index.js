import { useDispatch, useSelector } from 'react-redux';
import './MembersPage.css'
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { thunkGetAllUsers, thunkGetCurrentUser } from '../../store/session';

const MembersPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const users = useSelector(state => state.session.users)

    useEffect(() => {
        dispatch(thunkGetAllUsers())
    }, [dispatch])

    if(!users) return null

    console.log(users)

    const topProfiles = () =>  users.sort((a, b) => b.films_watched.length - a.films_watched.length).slice(0, 5)


    const publicLists = (user) => user.lists.filter(list => list.is_private === false).length

    const topUsers = topProfiles();

    return (
        <div className="members-page-container">
            <div className="members-page">
                <div className="members-page-header">
                    <h1>Film lovers, critics and friends - find members.</h1>
                </div>
                <div className='members-top-title'>
                    <p>TOP USERS</p>
                </div>
                <div className="members-page-random-users">
                    {topUsers.map(user => (
                        <div key={user.id} className='members-big-tiles'>
                            <div className='members-big-profile-img'>
                                <img src={user.profile_img_url} />
                            </div>
                            <div className='members-big-details-tiles'>
                                <div className='members-big-username'>
                                    <h3>{user.username}</h3>
                                </div>
                                <div className='members-big-films-watched'>
                                    <p>{user.films_watched.length} films</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="members-page-all-users">
                    <p id='member-page-title-page'>ALL USERS</p>
                    <div className='members-page-all-users-grid'>
                        {users.map((user) => (
                            <div key={user.id} className='members-page-user-info'>
                                <div className='members-page-user-details'>
                                    <div className='members-page-user-icons'>
                                        <img src={user.profile_img_url} />
                                    </div>
                                    <div>
                                        <h3>{user.username}</h3>
                                    </div>
                                </div>
                                <div className='members-page-user-info-panel'>
                                    <div className='members-page-user-watches'>
                                        <i className='fa-solid fa-eye'/>
                                        <p>{user.films_watched.length}</p>
                                    </div>
                                    <div className='members-page-user-lists'>
                                        <i className='fa-solid fa-table-cells-large'/>
                                        <p>{publicLists(user)}</p>
                                    </div>
                                    <div className='members-page-user-views'>
                                        <i className='fa-solid fa-heart'/>
                                        <p>{user.likes.length}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MembersPage
