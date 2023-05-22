import FilmForm from "../FilmForm";

const FilmCreate = () => {
    const film = {
        title: '',
        year: '',
        genre: '',
        director: '',
        description: '',
        background_img_url: null,
        trailer_url: '',
        tile_img_url: ''
    }

    return (
        <FilmForm
            film={film}
            formType={'create'}/>
    )
}

export default FilmCreate
