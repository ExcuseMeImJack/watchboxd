import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const CreateButton = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "profile-dropdown-create" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button
        id="nav-bar-log-button"
        onClick={openMenu}
        className="change-cursor"
        // className="change-cursor"
      >
        <i class="fa-solid fa-plus navbar-log-plus"></i>
        <p>CREATE</p>
      </button>
      <div className={ulClassName} ref={ulRef}>
        <div
          className="hoverable"
          onClick={() => history.push("/films/create")}
        >
          <p>Create Film</p>
        </div>
        <div
          className="hoverable"
          onClick={() => history.push("/lists/create")}
        >
          <p>Create List</p>
        </div>
      </div>
    </>
  );
};

export default CreateButton;
