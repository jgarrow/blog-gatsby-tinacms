import React from "react";
import { Link } from "gatsby";

export default ({
    currentPage,
    numPages,
    baseSlug,
    isSinglePost,
    prevPost,
    nextPost
}) => {
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const nextPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString();
    const prevPage = (currentPage + 1).toString();

    // const prevLink = isSinglePost
    //     ? `${prevPost.fields.slug}`
    //     : `${baseSlug + prevPage}`;
    // const nextLink = isSinglePost
    //     ? `${nextPost.fields.slug}`
    //     : `${baseSlug + nextPage}`;

    // const prevText = isSinglePost
    //     ? `← ${prevPost.frontmatter.title}`
    //     : `← Previous`;
    // const nextText = isSinglePost
    //     ? `${nextPost.frontmatter.title} →`
    //     : `Next →`;

    return (
        <div>
            {/* {(!isSinglePost && !isLast) ||
                (isSinglePost && prevPost && (
                    <li>
                        {prevPost && (
                            <Link to={prevLink} rel="prev">
                                {prevText}
                            </Link>
                        )}
                    </li>
                ))}
            {(!isSinglePost && !isFirst) ||
                (isSinglePost && nextPost && (
                    <li>
                        {nextPost && (
                            <Link to={nextLink} rel="next">
                                {nextText}
                            </Link>
                        )}
                    </li>
                ))} */}

            {isSinglePost ? (
                // pagination for individual blog post
                <>
                    <li>
                        {prevPost && (
                            <Link to={`${prevPost.fields.slug}`} rel="prev">
                                ← {prevPost.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {nextPost && (
                            <Link to={`${nextPost.fields.slug}`} rel="next">
                                {nextPost.frontmatter.title} →
                            </Link>
                        )}
                    </li>
                </>
            ) : (
                // pagination for blog list
                <>
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
                </>
            )}
        </div>
    );
};
