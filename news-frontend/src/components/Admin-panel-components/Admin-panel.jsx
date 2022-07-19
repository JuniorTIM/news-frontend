import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCategory } from "../../features/categoriesReducer";
import { createNews } from "../../features/newsReducer";
import { deleteUser, getUsers } from "../../features/usersReducer";
import "./styles.css";

const Panel = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.news.loading);
  const categories = useSelector((state) => state.categories.categories);

  const [text, setText] = useState("");
  const [categoryText, setCategoryText] = useState('')
  const [titleText, setTitleText] = useState('')
  const [newsText, setNewsText] = useState('')
  const [list, setList] = useState(false);
  const [newsCreate, setNewsCreate] = useState(false);
  const [categoryCreate, setCategoryCreate] = useState(false);

  const searcher = users.filter(
    (item) => item.login.toLowerCase().indexOf(text.toLowerCase()) !== -1
  );

  function handleText(e) {
    setText(e.target.value);
  }

  function handleCategoryText(e) {
    setCategoryText(e.target.value);
  }

  function handleTitleText(e) {
    setTitleText(e.target.value)
  }

  function handleNewsText(e) {
    setNewsText(e.target.value)
  }

  function handleBanUser(id) {
    dispatch(deleteUser(id));
  }

  function handleUsersList() {
    setList(!list);
    setCategoryCreate(false);
    setNewsCreate(false);
  }

  function handleCreateNews() {
    setNewsCreate(!newsCreate);
    setCategoryCreate(false);
    setList(false);
  }

  function handleCreateCategoryButton() {
    dispatch(createCategory(categoryText))
    setCategoryText('')
  }

  // function handleCreateNewsBtn() {
  //   dispatch(createNews({img, categoryId, titleText, newsText}))
  //   setTitleText('')
  //   setNewsText('')
  // }

  function handleCreateCategory() {
    setCategoryCreate(!categoryCreate);
    setNewsCreate(false);
    setList(false);
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="panel">
      {loading && (
        <div className="load">
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      )}
      <div className="admin_title">Панель администратора</div>
      <div className="admin_tools">
        <div className="users_list">
          <button className="users_list_button" onClick={handleUsersList}>
            Список пользователей
          </button>
          <div>
            {list && (
              <div className="users_map">
                <input
                  onChange={handleText}
                  value={text}
                  className="users_search"
                  type="text"
                  placeholder="Поиск пользователей..."
                />
                {searcher &&
                  searcher.map((element, index) => {
                    return (
                      <div className="one_user">
                        <div>{index + 1})</div>
                        <div>{element.login}</div>
                        <button
                          onClick={() => handleBanUser(element._id)}
                          className="ban_user"
                        >
                          x
                        </button>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
        <div>
          <button className="create_news" onClick={handleCreateNews}>
            Создание новости
          </button>
          {newsCreate ? (
            <div className="create_news_form">
              <div>Добавьте фото:</div>
              <input type="file" />
              <div>Категория:</div>
              <select type="text">
                <option disabled>Выберите категорию</option>
                {categories.map((element) => {
                  return <option>{element.name}</option>;
                })}
              </select>
              <div>Заголовок:</div>
              <input onChange={handleTitleText} value={titleText} type="text" />
              <div>Текст:</div>
              <textarea onChange={handleNewsText} value={newsText} type="text" />
              {/* <button onClick={handleCreateNewsBtn} className="create_news_btn">Запостить</button> */}
            </div>
          ) : null}
        </div>
        <div>
          <button className="create_category" onClick={handleCreateCategory}>
            Создание категории
          </button>
          {categoryCreate ? (
          <div className="category_create_form">
            <div>Название категории:</div>
            <input value={categoryText} onChange={handleCategoryText} type="text" />
            <button onClick={handleCreateCategoryButton} className="create_category_btn">Создать</button>
          </div>) : null}
        </div>
      </div>
    </div>
  );
};

export default Panel;
