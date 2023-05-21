import { useHistory } from 'react-router-dom'
import './CreateFilm.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { thunkCreateFilm, thunkGetAllFilms } from '../../store/films';

const CreateFilmPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const films = useSelector(state => state.films.films)
    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [genre, setGenre] = useState("");
    const [director, setDirector] = useState("");
    const [description, setDescription] = useState("");
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [tileImage, setTileImage] = useState(null);
    const [errors, setErrors] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [confirmedBackgroundImage, setConfirmedBackgroundImage] = useState("")
    const [confirmedTileImage, setConfirmedTileImage] = useState("")
    const [imageLoading, setImageLoading] = useState(false)

    useEffect(() => {
        dispatch(thunkGetAllFilms())
    }, [dispatch])

    useEffect(() => {
        const valErrors = {}
        films?.forEach(film => (film.title.toLowerCase().replace(/[^a-z0-9]/gi, '') === title.toLowerCase().replace(/[^a-z0-9]/gi, '')) ? valErrors.title = "Film already exists" : null)

        if(parseInt(year) < 1800 || parseInt(year) > new Date().getFullYear() +2) valErrors.year = `Year must be between 1800 and ${new Date().getFullYear() + 2}`

        if(year.length > 1 && year.length < 4) valErrors.year = "Year must have 4 characters"

        if(description.length > 1000) valErrors.description = "Description must be lower than 1000 characters"

        if(description.length < 10) valErrors.description = "Description must be more than 10 characters"

        if(!(trailerUrl.includes('youtube') || trailerUrl.includes('youtu.be'))) valErrors.trailerUrl = "Trailer URL must be a YouTube link"

        const validUrlFileTypes = ['png', 'jpg', 'jpeg'];

        if(backgroundImage) {
            const urlArray = backgroundImage.name.split('.');
            const urlSuffix = urlArray[urlArray.length - 1];
            !validUrlFileTypes.includes(urlSuffix) ? valErrors.backgroundImage = 'Image URL must end in .png, .jpg, or .jpeg' : setConfirmedBackgroundImage(backgroundImage)
        } else {
            valErrors.backgroundImage = "Background Image is required"
        }

        if(tileImage) {
            const urlArray = tileImage.name.split('.');
            const urlSuffix = urlArray[urlArray.length - 1];
            !validUrlFileTypes.includes(urlSuffix) ? valErrors.tileImage = 'Image URL must end in .png, .jpg, or .jpeg' : setConfirmedTileImage(tileImage)
        } else {
            valErrors.backgroundImage = "Tile Image is required"
        }

        setErrors(valErrors)
    }, [title, year, description, backgroundImage, trailerUrl, tileImage])

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsSubmitted(true);
        const formData = new FormData();

        formData.append("title", title);
        formData.append("year", year)
        formData.append("description", description)
        formData.append("trailer_url", trailerUrl)
        formData.append("director", director)
        formData.append("genre", genre)
        formData.append("background_img_url", confirmedBackgroundImage)
        formData.append("tile_img_url", confirmedTileImage)
        formData.append("user_id", user.id)

        const res = await fetch('/api/films', {
            method: "POST",
            body: formData
        })

        if(res.ok) {
            const newFilm = await res.json();
            setImageLoading(false)
            history.push(`/films/${newFilm.id}`)
            dispatch(thunkGetAllFilms())
        }
    }

    return (
        <div className="create-film-page-container">
            <div className="create-film-page">
                <h1>Create a New Film</h1>
                <div>
                    {errors.title && <p className='errors'>{errors.title}</p>}
                    {isSubmitted && errors.year && <p className='errors'>{errors.year}</p>}
                    {isSubmitted && errors.description && <p className='errors'>{errors.description}</p>}
                    {isSubmitted && errors.backgroundImage && <p className='errors'>{errors.backgroundImage}</p>}
                    {isSubmitted && errors.trailerUrl && <p className='errors'>{errors.trailerUrl}</p>}
                    {isSubmitted && errors.tileImage && <p className='errors'>{errors.tileImage}</p>}
                </div>
                <form onSubmit={handleSubmit}>
                <div className="create-film-form">
                    <div className="left-create-film-form">
                        <div className='film-form-title-year'>
                            <div className="film-form-title">
                                <label>Title</label>
                                <input
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required/>
                            </div>
                            <div className="film-form-year">
                                <label>Year</label>
                                <input
                                type='text'
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                required/>
                            </div>
                        </div>
                        <div className='film-form-genre-director'>
                             <div className="film-form-genre">
                                <label>Genre</label>
                                <input
                                type='text'
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                required/>
                            </div>
                            <div className="film-form-director">
                                <label>Director(s)</label>
                                <input
                                type='text'
                                value={director}
                                onChange={(e) => setDirector(e.target.value)}
                                required/>
                            </div>
                        </div>
                        <div className='film-form-description'>
                                <label>Description</label>
                                <textarea
                                type='textarea'
                                value={description}
                                placeholder={'Write a description...'}
                                onChange={(e) => setDescription(e.target.value)}
                                required/>
                        </div>
                        <div className="film-form-background-image">
                            <label>Upload a Film Background Image
                                <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setBackgroundImage(e.target.files[0])}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="right-create-film-form">
                        <div className="film-form-trailer">
                            <label>YouTube Trailer Link URL</label>
                            <input
                            type='text'
                            value={trailerUrl}
                            onChange={(e) => setTrailerUrl(e.target.value)}
                            required/>
                        </div>
                        <div className='film-form-tile-image'>
                            <label>Upload a Film Cover Image
                                <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setTileImage(e.target.files[0])}
                                />
                            </label>
                        </div>
                        {(imageLoading) && null}
                        <div className='film-form-submit'>
                            <button className={Object.keys(errors).length > 0 ? 'button-disabled' : 'button-enabled change-cursor'} disabled={Object.keys(errors).length > 0}>Submit Film</button>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}

export default CreateFilmPage
