import React from 'react';
import style from './style';

const Pagination = ({classes, postPerPage, totalPosts, paginate, currentPage}) => {
    
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++ ){
        pageNumbers.push(i);
    }
    return(
        <nav className={classes.pagination}>
            <ul>
                {pageNumbers.map( n => (
                    n === currentPage? 
                    <li key={n} className={classes.actionCurrentPage}>{n}</li> 
                    : <li key={n} onClick={ e => paginate(n)}>{n}</li>
                ))}
            </ul>
        </nav>
    )
}

export default style(Pagination);