import './pagination.css';
import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

function Pagination({ usersPerPage, totalUsers, paginate }) {
  const pageNumbers = [];
  
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="component-pagination" data-aos="fade-left">
      <ul className="pagination">
          <p className='titulo-pagina'><b>Páginas</b></p>
        {pageNumbers.map((number) => (
            <li key={number} className="page-item">
            <a href="!#" onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
