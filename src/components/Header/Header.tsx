import { Link, Navigate } from "react-router-dom";


export const Header = () => {
    return (
      <div >
       <Link to='/'>Home</Link>
       <Link to='/admin'>adm</Link> 
      </div>
    );
  };