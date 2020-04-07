import React from "react"
import PropTypes from "prop-types"
import "../styles/styles.scss"

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="app--wrapper">
        <nav className="app--nav container">
          <div className="navlogo">
            <span>Grana.ab</span>
          </div>
          <ul className="navitems">
            <li>Home</li>
            <li>Blog</li>
          </ul>
        </nav>
        <main className="container--main">{children}</main>
        <footer className="container--footer">
          © {new Date().getFullYear()}, developed by
          {` `}
          <a href="https://www.github.com/rush2di">rush2di</a>
        </footer>
        <div className="borders">
          <div className="top thickness-hight"></div>
          <div className="bottom thickness-hight"></div>
          <div className="left thickness-width"></div>
          <div className="right thickness-width"></div>
        </div>
      </div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
