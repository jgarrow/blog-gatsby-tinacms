import React from "react";
import { Link } from "gatsby";

export default ({ currentPage, numPages, baseSlug }) => {
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const nextPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString();
    const prevPage = (currentPage + 1).toString();

    return (
        <div>
            <li>
                {!isLast && (
                    <Link to={`${baseSlug + prevPage}`} rel="prev">
                        ← Previous
                    </Link>
                )}
            </li>
            <li>
                {!isFirst && (
                    <Link to={`${baseSlug + nextPage}`} rel="next">
                        Next →
                    </Link>
                )}
            </li>
        </div>
    );
};
