/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNews } from "../../../features/newsReducer";
import { Link } from "react-router-dom";
import "./styles.css";
import { useState } from "react";

const Main = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.news.loading);
  const [two, setTwo] = useState(false)
  const [strelka, setStrelka] = useState(true)

  function handleStrelka() {
    setStrelka(!strelka)
  }
  
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <div className="main">
      {loading && (
        <div className="load">
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      )}
      <div className="sort-block">
        <div className="sort">
          Сортировка:
          <div onClick={handleStrelka} className="new-news">Новые {strelka ? "↓" : "↑"}</div>
          <div className="popular-news">Популярные {}</div>
        </div>
      </div>
      <div className={strelka ? "news-block ne" : "news-block"}>
        {props.searcher &&
          props.searcher.map((element, index) => {
                return (
                  <div className="allNews">
                    <div key={element._id} className={two ? "newses two" : 'newses'}>
                      <div>
                        <img className="news-img" src={`http://localhost:4000/${element.img}`} alt="" />
                      </div>
                      <hr className="bock"/>
                      <div className="text-block">
                        <div className="news-title">{element.title}</div>
                        <div className="news-text">{element.text}</div>
                      </div>
                      <Link className="other" to={`/new/${element._id}`}>Подробнее...</Link>
                    </div>
                  </div>
                );
              }
          )
            }
      </div>
    </div>
  );
};

export default Main;
