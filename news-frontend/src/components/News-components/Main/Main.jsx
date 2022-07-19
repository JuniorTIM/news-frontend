/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNews } from "../../../features/newsReducer";
import { Link } from "react-router-dom";
import "./styles.css";
import { useState } from "react";
import {PropTypes} from 'prop-types'


const Main = ({searcher}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.news.loading);
  const [two, setTwo] = useState(false)
  const [newSt, setNewSt] = useState(true)
  // const [popular, setPopular] = useState(true)

  Main.propTypes = {
    searcher: PropTypes.array
  } 

  function handleNewSt() {
    setNewSt(!newSt)
  }

  // function handlePopular() {
  //   setPopular(!popular)
  // }
  
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
          <div onClick={handleNewSt} className="new-news">Новые {newSt ? "↓" : "↑"}</div>
          {/* <div onClick={handlePopular} className="popular-news">Популярные {popular ? "↓" : "↑"}</div> */}
        </div>
      </div>
      <div className={newSt ? "news-block ne" : "news-block"}>
        {searcher &&
          searcher.map((element) => {
                return (
                  <div key={element._id} className="allNews">
                    <div className={two ? "newses two" : 'newses'}>
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
