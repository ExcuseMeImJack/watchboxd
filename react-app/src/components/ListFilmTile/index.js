import './ListFilmTile.css'

const ListFilmTile = ({film, removeFilmsFromList}) => {
    return(
        <div className='film-list-confirmation-tile'>
            <div className='left-list-confirm'>
                <div>
                    <img id="file-confirm-img" src={film.tile_img_url} />
                </div>
                <div className='film-list-confirmation-details'>
                    <h1>{film.title}</h1>
                    <h3>{film.year}</h3>
                </div>
            </div>
            <div className='right-list-confirm'>
                <div className='film-list-confirmation-remove'>
                    <i id='remove-film-from-list-button' className="fa-solid fa-xmark change-cursor" onClick={() => removeFilmsFromList(film.id)}></i>
                </div>
            </div>


        </div>
    )

}

export default ListFilmTile
