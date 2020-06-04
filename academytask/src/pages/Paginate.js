import React from 'react';
import leftArrow from '../images/leftArrow.png';
import rightArrow from '../images/rightArrow.png';

function Paginate({ currentPage, nextPage, pageCount}) {

    let pageLinks = [];
    if (pageCount > 1)
        for (let i = 1; i <= pageCount; i++) {
            pageLinks.push(i);
        }

    return (
        <div className="Page__pagination flex-row">
            {
                currentPage > 1 && (
                    <a className="Page__pagination__arrow" onClick={ () => { nextPage(currentPage - 1) } }>
                        <img src={leftArrow} alt="left arrow" className="Page__pagination__arrow__button"/>
                    </a>
                )
            }
            {
                pageLinks.map((i) => {
                    return (
                        <a className={`Page__pagination__number ${currentPage === i ? "active" : ""}`} key={i} onClick={() => nextPage(i)}>
                            {i}
                        </a>
                    );
                })
            }
            { 
                currentPage < pageCount && (
                    <a className="Page__pagination__arrow" onClick={ () => { nextPage(currentPage + 1) } }>
                        <img src={rightArrow} alt="right arrow" className="Page__pagination__arrow__button"/>
                    </a>
                )
            }
        </div>
    );
}
export default Paginate;