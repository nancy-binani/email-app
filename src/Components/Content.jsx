import React, { useEffect, useState } from "react";
import "../styles/Content.css";
import formatDate from "../utils";
const Content = ({ emailContent, setFavourite, currentEmail, setFavIds }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (emailContent?.body) {
      setLoading(false);
    }
  }, [emailContent]);
  return (
    <article className="email-content">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="heading">
            <div className="title">
              <span className="avatar">
                {currentEmail.from.name[0].toUpperCase()}
              </span>
              <h2>{currentEmail.subject}</h2>
            </div>
            <p
              className="fav"
              onClick={() => {
                setFavourite((prev) => [...prev, currentEmail]);
                setFavIds((prev) => [...prev, currentEmail.id]);
              }}
            >
              Mark as Favourite
            </p>
          </div>
          <p className="date">{formatDate(currentEmail.date)}</p>

          <p
            dangerouslySetInnerHTML={{ __html: emailContent?.body }}
            className="content"
          />
        </>
      )}
    </article>
  );
};

export default Content;
