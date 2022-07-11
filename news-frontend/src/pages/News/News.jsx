import React, { useState } from "react";

import Header from "../../components/News-components/Header/Header";
import Sidebar from "../../components/News-components/Sidebar/Sidebar";
import Main from "../../components/News-components/Main/Main";
import Footer from "../../components/News-components/Footer/Footer";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const News = () => {
  const [text, setText] = useState("");
  const news = useSelector((state) => state.news.news);
  const { categoryId } = useParams();

  const filteredNews = news.filter((item) => {
    if (!categoryId) return true;

    return item.categoryId === String(categoryId);
  });

  const searcher = filteredNews.filter(
    (item) =>
      item.title.toLowerCase().indexOf(text.toLowerCase()) !== -1
  );

  return (
    <div>
      <Header text={text} setText={setText} />
      <Sidebar news={news} />
      <Main searcher={searcher} />
      <Footer />
    </div>
  );
};

export default News;
