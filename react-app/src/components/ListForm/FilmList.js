import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react"
import './ListForm.css'

const FilmList = ({films, addFilmsToList}) => {
    const [showMenu, setShowMenu] = useState(true);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = (e) => {
            if(!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);

    }, [showMenu])

    const ulClassName = "film-list-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <div className={ulClassName} ref={ulRef}>
                {films.map(film =>
                    <div className="film-list-search-tile change-cursor" onClick={() => addFilmsToList(film)}>
                        <h4>{film.title} ({film.year})</h4>
                        <p>{film.director}</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default FilmList
