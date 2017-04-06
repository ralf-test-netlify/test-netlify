import React from "react"
import {Link} from "phenomic"

import styles from "./index.css"

const AdminLink = () => {
  return (
    <div>
      <h2 className={ styles.adminLink }>
        { "Admin" }
      </h2>
      <ul>
        <li><Link to="/admin">Goto CMS Admin Page</Link></li>
      </ul>
    </div>
  )
}

AdminLink.propTypes = {}

AdminLink.contextTypes = {}

export default AdminLink
