//import React from "react";
import "./SidebarOption.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {add} from '../../store/songSlice';

function SidebarOption(props) {
  const dispatch = useDispatch();
  const Icon = props.Icon;
  const title = props.title;
  const sideBarRef = useRef();
  const href = props.href;
  const clickevent = props.clickevent;
  const handleClick = async () => {
    sideBarRef.current.click();
    dispatch(add([]))
    console.log(typeof clickevent);
    if (clickevent && typeof clickevent === 'function') {
      clickevent();
    }
  }
  return (
    <div className="sidebarOption" onClick={handleClick}>
      {Icon && <Icon className="sidebarOption__icon" />}
      <Link ref={sideBarRef} to={href} />
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>

    // <Button onClick={() => { sideBarRef.current.click(); }} startIcon={Icon && <Icon />}>
    //   <Link ref={sideBarRef} to={href} />
    //   {title}
    // </Button>
  );
}

export default SidebarOption;
