import React, { useEffect, useState } from "react";
import axios from "axios";
import "./List.css";
import Header from "./Header";
import formatDate from "../utils";
import Content from "./Content";

const List = () => {
const [selected, setSelected] = useState(null);
const [emailList, setEmailList] = useState([]);
const [loading, setLoading] = useState(true);
const [showEmail, setShowEmail] = useState(true)

  const handleClick = (option) => {
    setSelected(option);
  };

  const checkIndividualEmail = async () => {
    try {
      const { data } = await axios.get(
        `https://flipkart-email-mock.now.sh/`,
      );
      setLoading(false);
      setEmailList(data.list);
      console.log(emailList)
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    checkIndividualEmail()
  }, [])
  
  if(loading){
    return(
        <div className="loading">Loading...</div>
    )
  }

  return (
    <>
     <Header/>
     <div className="list">
        <div>
     {
        emailList.map((email) => {
            return(
                <div className="list-item selected">
                <div className="avatar">F</div>
                <div className="list-details">
                  <p className="mb-small">
                    From: <span>{email.from.name} {email.from.email}</span>
                  </p>
                  <p className="subject mb-1">
                    Subject: <span>{email.subject}</span>
                  </p>
                  <p className="mb-small">{email.short_description}</p>
                  <span className="status">
                    {
                        formatDate(email.date)
                    }
                    <p className="favourite"> Favourite</p>
                  </span>
                </div>
              </div>
            )
        })
     }</div>
   {showEmail && <Content/>}
   </div>
    </>
  );
};

export default List;
