import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNews } from "../../../features/newsReducer";
import { Link } from "react-router-dom";
import "./styles.css";

const Main = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const loading = useSelector((state) => state.news.loading);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <div className="main">
      {loading && (
        <div class="load">
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      )}
      <div className="sort">
        
      </div>
    </div>
  );
};

export default Main;
