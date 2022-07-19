/* eslint-disable array-callback-return */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { deleteNews, getNews } from "../../features/newsReducer";
import {
  createComment,
  deleteComment,
  getComments,
} from "../../features/commentsReducer";
import "./styles.css";
import { getUsers } from "../../features/usersReducer";

const Main = () => {
  
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.news.loading);
  const news = useSelector((state) => state.news.news);
  const users = useSelector((state) => state.users.users);
  const comments = useSelector((state) => state.comments.comments);
  const error = useSelector((state) => state.comments.error);
  const userId = useSelector((state) => state.users.user);
  const role = useSelector((state) => state.users.role);
  const token = useSelector((state) => state.users.token);

  const { id } = useParams();
  const [text, setText] = useState("");
  const [tochki, setTochki] = useState(false);

  function handleText(e) {
    setText(e.target.value);
  }

  function handleCreate() {
    dispatch(createComment({ text, id }));
    setText("");
  }

  function handleDelete(i) {
    dispatch(deleteComment(i));
  }

  function handleTochki() {
    setTochki(!tochki);
  }

  function handleDeleteNew(id) {
    dispatch(deleteNews(id));
    window.location.href = "/";
  }

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getComments({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getUsers());
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
      {news.map((item) => {
        if (id === item._id) {
          return (
            <div key={item._id}>
              <div className="allNew">
                <div key={item._id} className="newse">
                  {role === "admin" && (
                    <>
                      <div className="threeTochka" onClick={handleTochki}>
                        ⋮
                      </div>
                      {tochki && (
                        <div className="tochkiMenu">
                          <button className="changeNew">Редактировать</button>
                          <button
                            className="deleteNew"
                            onClick={() => handleDeleteNew(item._id)}
                          >
                            Удалить
                          </button>
                        </div>
                      )}
                    </>
                  )}
                  <div>
                    <img
                      className="news-im"
                      src={`http://localhost:4000/${item.img}`}
                      alt=""
                    />
                  </div>
                  <hr className="boc" />
                  <div className="text-bloc">
                    <div className="news-titl">{item.title}</div>
                    <div className="news-tex">{item.text}</div>
                  </div>
                </div>
              </div>
              <hr />
              {token || role === "admin" ? (
                <div>
                  <div className="comments-block">
                    {loading && (
                      <div className="load">
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                      </div>
                    )}
                    <div className="comments-amount">
                      {comments.length === 1
                        ? comments.length + " Комментарий"
                        : comments.length + " Комментариев"}
                    </div>
                    <textarea
                      placeholder="Напишите комментарий..."
                      className="comments-input"
                      onChange={handleText}
                      type="text"
                      value={text}
                    />
                  </div>
                  <button
                    onClick={handleCreate}
                    disabled={text && false}
                    className={text ? "submit-comment" : "submit-comment"}
                  >
                    Отправить
                  </button>
                </div>
              ) : (
                <div className="error-block">Войдите в аккаунт</div>
              )}

              <div className="comments-list">
                {comments.length !== 0 ? (
                  comments
                    .map((item) => {
                      return (
                        users &&
                        users.map((user) => {
                          if (user._id === item.name) {
                            return (
                              <div key={user._id} className="all-comment">
                                <div className="comment-user">{user.login}</div>
                                <div className="comment-text-block">
                                  <div className="comment-text">
                                    {item.text}
                                  </div>
                                  {userId === item.name || role === "admin" ? (
                                    <button
                                      onClick={() => handleDelete(item._id)}
                                      className="comment-delete"
                                    >
                                      x
                                    </button>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            );
                          }
                        })
                      );
                    })
                    .reverse()
                ) : (
                  <div>{!error && "Ваш комментарий будет первым!"}</div>
                )}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Main;
