import React from 'react'
import "./Header.scss"
import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <>

      <header className="header__big">
        <div className="container">
          <div className="header">
            <NavLink className='header__logo' to={'/'}>LOGO</NavLink>
            <NavLink className='header__rout' to={'/'}>Home</NavLink>
            <NavLink className='header__rout' to={'/crud'}>Crud User</NavLink>
          </div>
        </div>
      </header>

    </>
  )
}

export default Header