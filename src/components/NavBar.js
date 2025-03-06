import React from 'react'
import {Link} from 'react-router-dom'
import "./QrCodeGenerator.css";
const NavBar = () => {
  return (
    <nav>
        <ul>
            <li>
                <Link className='linkr'  to="/dcis2025/philippines/ticket_generator">Home</Link>
            </li>
          
            <li>
                <Link className='linkr'  to="/downloadqr">Download Ticket</Link>
            </li>
            
            
        </ul>
</nav>
  )
}

export default NavBar;
