import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getNews } from "../../features/newsReducer";
import "./styles.css";

const Main = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.news.loading);
  const news = useSelector((state) => state.news.news)
  const { id } = useParams()

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <div className="new">
      {loading && (
        <div className="load">
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      )}
        {news.map(item => {
            if (id === item._id) {
                return (
                <div className="allNew">
                    <div key={item._id} className='newse'>
                      <div>
                        <img className="news-im" src={`http://localhost:4000/${item.img}`} alt="" />
                      </div>
                      <hr className="boc"/>
                      <div className="text-bloc">
                        <div className="news-titl">{item.title}</div>
                        <div className="news-tex">{item.text}</div>
                      </div>
                    </div>
                  </div>
        )
            }
        })}
    </div>
  );
};

export default Main;
