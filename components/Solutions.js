import React from "react";
import styles from "./solutions.styles.module.css";
import Image from "next/image";

const Solutions = ({ solnplaceholder }) => {
  return (
    <section>
      <div>Solutions</div>
      <div className={styles.solutions_title_text}>智能家居解決方案!</div>
      <br />
      <div>
        <div className="mt-8 grid grid-cols-4">
          <div className={styles.solutionCard}>
            <img src="/assets/images/caring.jpeg" alt="caring" class="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;

const solnplaceholder = [
  { title: "", image: "", descr: "", id: "1" },
  { title: "", image: "", descr: "", id: "2" },
];

/*
const Restaurants = () => {
  const getRestaurants = () => {
    return [
      {
        desc: "跨平台，跨品牌兼容，家居設備輕鬆連接",
        id: 1,
        image: "https://i.imgur.com/QLjeu08.jpeg",
        title: "配件銜接及編程服務",
      },
      {
        desc: "個性化定制，高科技自動化程序隨心設置",
        id: 2,
        image: "https://i.imgur.com/7IO7atI.jpeg",
        title: "自動化及聯動設置支援",
      },
      {
        desc: "酷炫燈光效果，1600萬色營造個性家居氛圍。",
        id: 3,
        image: "https://i.imgur.com/41Y1qh9.jpeg",
        title: "電競影視照明同步方案",
      },
      {
        desc: "監測用電，節能減排方案，打造綠色智能家居",
        id: 4,
        image: "https://i.imgur.com/Zj6zGlS.jpeg",
        title: "可持續發展目標計劃",
      },
    ].map((restaurant) => {
      const styles = {
        backgroundImage: `url(${restaurant.image})`,
      };
      return React.createElement(
        "div",
        {
          key: restaurant.id,
          className: "restaurant-card background-image",
          style: styles,
        },
        React.createElement(
          "div",
          { className: "restaurant-card-content" },
          React.createElement(
            "div",
            { className: "restaurant-card-content-items" },
            React.createElement(
              "span",
              { className: "restaurant-card-title" },
              restaurant.title
            ),
            React.createElement(
              "span",
              { className: "restaurant-card-desc" },
              restaurant.desc
            )
          )
        )
      );
    });
  };
  */
