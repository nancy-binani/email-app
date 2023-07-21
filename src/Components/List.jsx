import React, { useEffect, useState } from "react";
import axios from "axios";
import "./List.css";
import Header from "./Header";
import formatDate from "../utils";
import Content from "./Content";

const List = () => {
  const [emailList, setEmailList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [emailContent, setEmailContent] = useState(null);
  const [read, setRead] = useState([]);
  const [unread, setUnRead] = useState([]);
  const [favourite, setFavourite] = useState([]);
  const [selectedState, setSelectedState] = useState("unread");
  const [currentEmail, setCurrentEmail] = useState(null);
  const [favIds, setFavIds] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [allMails, setAllMails] = useState([]);

  const handleClick = (email) => {
    checkIndividualEmail(email.id);
    setCurrentEmail(email);
    setRead((prev) => [...prev, email]);
    setUnRead((mails) => mails.filter((current) => current.id !== email.id));
    setShowEmail(true);
  };

  const filteredEmailList = () => {
    if(selectedState === "read")
        setEmailList(read)
    if(selectedState === "unread")
        setEmailList(unread)
    if(selectedState === "favourites")
        setEmailList(favourite)
    if(selectedState === "all")
        setEmailList(allMails)
  }

  const allEmails = async () => {
    try {
      const { data } = await axios.get(`https://flipkart-email-mock.now.sh/`);
      setLoading(false);
      setEmailList(data.list);
      setUnRead(data.list);
      setAllMails(data.list);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIndividualEmail = async (id) => {
    try {
      const { data } = await axios.get(
        `https://flipkart-email-mock.now.sh/?id=${id}`
      );
      setEmailContent(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    filteredEmailList();
  },[selectedState]);

  useEffect(() => {
    allEmails();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Header selectedState={selectedState} setSelectedState={setSelectedState} showEmail={showEmail} setShowEmail={setShowEmail}/>
      <div className="list">
        <div className={`${showEmail ? "email-box-half" : "email-box-full"}`}>
          {emailList.map((email) => {
            return (
              <div
                className={`list-item ${selectedIds.includes(email.id) ? "isRead" : ""}`}
                onClick={() => {
                  handleClick(email);
                  setSelectedIds((prev) => [...prev, email.id]);
                }}
              >
                <div className="avatar">{(email.from.name[0]).toUpperCase()}</div>
                <div className="list-details">
                  <p className="mb-small">
                    From:{" "}
                    <span>
                      {email.from.name} {email.from.email}
                    </span>
                  </p>
                  <p className="subject mb-1">
                    Subject: <span>{email.subject}</span>
                  </p>
                  <p className="mb-small">{email.short_description}</p>
                  <span className="status">
                    {formatDate(email.date)}
                    {favIds.includes(email.id) && <p className="favourite"> Favourite</p>}
                  </span>
                </div>
              </div>
            );
          })}
          
        </div>
        {showEmail && (
          <Content emailContent={emailContent} favourite={favourite} setFavourite={setFavourite} currentEmail={currentEmail} setFavIds={setFavIds}/>
        )}
      </div>
    </>
  );
};

export default List;
