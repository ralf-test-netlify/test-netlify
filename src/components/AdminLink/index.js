import React from "react"

import styles from "./index.css"

const AdminLink = () => {
  return (
    <div>
      <h2 className={ styles.adminLink }>
        { "Admin" }
      </h2>
      <ul>
        <li><a href="/admin/index.html">Goto CMS Admin Page</a></li>
      </ul>
    </div>
  )
}

AdminLink.propTypes = {}

AdminLink.contextTypes = {}

export default AdminLink
