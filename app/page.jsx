"use client";

import Cases from "@components/Cases";
import Solutions from "@components/Solutions";
import classNames from "classnames";
//import Slideshow from "@components/Slider";
import Carousell from "@components/Carousell";
// const Home = () => {
//   return (
//     <section className="w-full flex-center ">
//       <h1 className=" head_text text-center">discore & share</h1>
//       <br className="max-md:hidden" />
//       <span className="orange_gradient">IOT</span>
//       <p>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum eveniet
//         repudiandae, fugit nemo velit quaerat sit odio nam voluptas in maxime
//         mollitia laboriosam totam laudantium, natus ut vitae officiis. Facilis?
//       </p>

//     </section>
//   );
// };
import React, { useEffect, useRef } from "react";
//import ReactDOM from "react-dom/client";
import * as ReactDOM from "react-dom/client";

//import "./index.css";
//import App from './App';

//import classNames from "classnames";
//import reportWebVitals from "./reportWebVitals";

//("use strict");
//------------------------------------------//
var UserStatus;
(function (UserStatus) {
  UserStatus["LoggedIn"] = "Logged In";
  UserStatus["LoggingIn"] = "Logging In";
  UserStatus["LoggedOut"] = "Logged Out";
  UserStatus["LogInError"] = "Log In Error";
  UserStatus["VerifyingLogIn"] = "Verifying Log In";
})(UserStatus || (UserStatus = {}));
//--------Pin Reminder at Line 93----------//
var Default;
(function (Default) {
  Default["PIN"] = "1234";
})(Default || (Default = {}));
var WeatherType;
const defaultPosition = () => ({ left: 0, x: 0 });
//----------------------------//
const N = {
  clamp: (min, value, max) => Math.min(Math.max(min, value), max),
  rand: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
};
const T = {
  format: (date) => {
    const hours = T.formatHours(date.getHours()),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
    return `${hours}:${T.formatSegment(minutes)}`;
  },
  formatHours: (hours) => {
    return hours % 12 === 0 ? 12 : hours % 12;
  },
  formatSegment: (segment) => {
    return segment < 10 ? `0${segment}` : segment;
  },
};

//----------------------------//
const LogInUtility = {
  verify: async (pin) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (pin === Default.PIN) {
          resolve(true);
        } else {
          reject(`Invalid pin: ${pin}`);
        }
      }, N.rand(300, 700));
    });
  },
};
const useCurrentDateEffect = () => {
  const [date, setDate] = React.useState(new Date());
  React.useEffect(() => {
    const interval = setInterval(() => {
      const update = new Date();
      if (update.getSeconds() !== date.getSeconds()) {
        setDate(update);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [date]);
  return date;
};

//----------------------------//
const ScrollableComponent = (props) => {
  const ref = React.useRef(null);
  const [state, setStateTo] = React.useState({
    grabbing: false,
    position: defaultPosition(),
  });
  const handleOnMouseDown = (e) => {
    setStateTo(
      Object.assign(Object.assign({}, state), {
        grabbing: true,
        position: {
          x: e.clientX,
          left: ref.current.scrollLeft,
        },
      })
    );
  };
  const handleOnMouseMove = (e) => {
    if (state.grabbing) {
      const left = Math.max(
        0,
        state.position.left + (state.position.x - e.clientX)
      );
      ref.current.scrollLeft = left;
    }
  };
  const handleOnMouseUp = () => {
    if (state.grabbing) {
      setStateTo(Object.assign(Object.assign({}, state), { grabbing: false }));
    }
  };
  return React.createElement(
    "div",
    {
      ref: ref,
      className: classNames("scrollable-component", props.className),
      id: props.id,
      onMouseDown: handleOnMouseDown,
      onMouseMove: handleOnMouseMove,
      onMouseUp: handleOnMouseUp,
      onMouseLeave: handleOnMouseUp,
    },
    props.children
  );
};
const WeatherSnap = () => {
  const [temperature] = React.useState(N.rand(20, 30));
  return (
    <span className="weather">
      <i className="weather-type fa-duotone fa-sun"></i>
      <span className="weather-temperature-value">{temperature}</span>
      <span className="weather-temperature-unit">°C</span>
    </span>
  );
};
const Reminder = () => {
  return React.createElement(
    "div",
    { className: "reminder" },
    React.createElement(
      "div",
      { className: "reminder-icon" },
      React.createElement("i", { className: "fa-regular fa-bell" })
    ),
    React.createElement(
      "span",
      { className: "reminder-ext" },
      "\u514D\u8CBB1\u5C0D1\u667A\u80FD\u5BB6\u5C45\u9867\u554F\u8AEE\u8A62",
      React.createElement("span", { className: "reminder-time" }, "11am-6pm")
    )
  );
};
const Time = () => {
  const date = useCurrentDateEffect();
  return React.createElement("span", { className: "time" }, T.format(date));
};
const Info = (props) => {
  return React.createElement(
    "div",
    { id: props.id, className: "info" },
    React.createElement(Time, null),
    React.createElement(WeatherSnap, null)
  );
};
const PinDigit = (props) => {
  const [hidden, setHiddenTo] = React.useState(false);
  React.useEffect(() => {
    if (props.value) {
      const timeout = setTimeout(() => {
        setHiddenTo(true);
      }, 500);
      return () => {
        setHiddenTo(false);
        clearTimeout(timeout);
      };
    }
  }, [props.value]);
  return React.createElement(
    "div",
    {
      className: classNames("app-pin-digit", {
        focused: props.focused,
        hidden,
      }),
    },
    React.createElement(
      "span",
      { className: "app-pin-digit-value" },
      props.value || ""
    )
  );
};
const Pin = () => {
  const { userStatus, setUserStatusTo } = React.useContext(AppContext);
  const [pin, setPinTo] = React.useState("");
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (
      userStatus === UserStatus.LoggingIn ||
      userStatus === UserStatus.LogInError
    ) {
      ref.current.focus();
    } else {
      setPinTo("");
    }
  }, [userStatus]);
  React.useEffect(() => {
    if (pin.length === 4) {
      const verify = async () => {
        try {
          setUserStatusTo(UserStatus.VerifyingLogIn);
          if (await LogInUtility.verify(pin)) {
            setUserStatusTo(UserStatus.LoggedIn);
          }
        } catch (err) {
          console.error(err);
          setUserStatusTo(UserStatus.LogInError);
        }
      };
      verify();
    }
    if (userStatus === UserStatus.LogInError) {
      setUserStatusTo(UserStatus.LoggingIn);
    }
  }, [pin]);
  const handleOnClick = () => {
    ref.current.focus();
  };
  const handleOnCancel = () => {
    setUserStatusTo(UserStatus.LoggedOut);
  };
  const handleOnChange = (e) => {
    if (e.target.value.length <= 4) {
      setPinTo(e.target.value.toString());
    }
  };
  const getCancelText = () => {
    return React.createElement(
      "span",
      { id: "app-pin-cancel-text", onClick: handleOnCancel },
      "Cancel"
    );
  };
  const getErrorText = () => {
    if (userStatus === UserStatus.LogInError) {
      return React.createElement(
        "span",
        { id: "app-pin-error-text" },
        "Invalid"
      );
    }
  };
  return React.createElement(
    "div",
    { id: "app-pin-wrapper" },
    React.createElement("input", {
      disabled:
        userStatus !== UserStatus.LoggingIn &&
        userStatus !== UserStatus.LogInError,
      id: "app-pin-hidden-input",
      maxLength: 4,
      ref: ref,
      type: "number",
      value: pin,
      onChange: handleOnChange,
    }),
    React.createElement(
      "div",
      { id: "app-pin", onClick: handleOnClick },
      React.createElement(PinDigit, {
        focused: pin.length === 0,
        value: pin[0],
      }),
      React.createElement(PinDigit, {
        focused: pin.length === 1,
        value: pin[1],
      }),
      React.createElement(PinDigit, {
        focused: pin.length === 2,
        value: pin[2],
      }),
      React.createElement(PinDigit, {
        focused: pin.length === 3,
        value: pin[3],
      })
    ),
    React.createElement(
      "h3",
      { id: "app-pin-label" },
      "Enter PIN (1234)",
      getErrorText(),
      "",
      getCancelText()
    )
  );
};

//-------------------------------------------//
const MenuSection = (props) => {
  const getContent = () => {
    if (props.scrollable) {
      return React.createElement(
        ScrollableComponent,
        { className: "menu-section-content" },
        props.children
      );
    }
    return React.createElement(
      "div",
      { className: "menu-section-content" },
      props.children
    );
  };
  return React.createElement(
    "div",
    { id: props.id, className: "menu-section" },
    React.createElement(
      "div",
      { className: "menu-section-title" },
      React.createElement("i", { className: props.icon }),
      React.createElement(
        "span",
        { className: "menu-section-title-text" },
        props.title
      )
    ),
    getContent()
  );
};

//---------------------------------------------//
const QuickNav = () => {
  const getItems = () => {
    return [
      { id: 1, label: "🛍️ 購買智能產品", link: "#weather-section" },
      { id: 2, label: "🪚 改造智能家居", link: "#tools-section" },
      { id: 3, label: "🆘 召喚專業團隊", link: "#smart-home-section" },
      { id: 4, label: "🗂 智能圖書館", link: "#about-section" },
    ].map((item) => {
      return (
        <a
          key={item.id}
          href={item.link}
          className="quick-nav-item clear-button"
        >
          <span className="quick-nav-item-label">{item.label}</span>{" "}
          <div className="quick-nav-item-underline"></div>
        </a>
      );
    });
  };
  return <ScrollableComponent id="quick-nav">{getItems()}</ScrollableComponent>;
};

const Tools = () => {
  const getTools = () => {
    return [
      {
        icon: "fas fa-gifts",
        id: 1,
        image:
          "https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHdlYXRoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        label: "透過IoT接收未來9天天氣",
        name: "天氣預測",
      },
      {
        icon: "fa-solid fa-calculator-simple",
        id: 2,
        image:
          "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FsY3VsYXRvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        label: "童叟無欺，即時顯示報價",
        name: "DIY報價機",
      },
      {
        icon: "fa-solid fa-piggy-bank",
        id: 3,
        image:
          "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmFua3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        label: "預測電費開支，用智能產品節省電費",
        name: "慳電小幫手",
      },
      {
        icon: "fa-solid fa-plane",
        id: 4,
        image:
          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycGxhbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        label: "我們將部分收入捐至碳中和項目",
        name: "追蹤碳足跡",
      },
      {
        icon: "fa-solid fa-gamepad-modern",
        id: 5,
        image:
          "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dmlkZW8lMjBnYW1lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        label: "別錯過限時活動豐富獎品",
        name: "遊戲及活動",
      },
      {
        icon: "fa-solid fa-video",
        id: 6,
        image:
          "https://images.unsplash.com/photo-1578022761797-b8636ac1773c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHZpZGVvJTIwY2hhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        label: "Video Chat",
        name: "Chatty",
      },
    ].map((tool) => {
      const styles = { backgroundImage: `url(${tool.image})` };
      return React.createElement(
        "div",
        { key: tool.id, className: "tool-card" },
        React.createElement("div", {
          className: "tool-card-background background-image",
          style: styles,
        }),
        React.createElement(
          "div",
          { className: "tool-card-content" },
          React.createElement(
            "div",
            { className: "tool-card-content-header" },
            React.createElement(
              "span",
              { className: "tool-card-label" },
              tool.label
            ),
            React.createElement(
              "span",
              { className: "tool-card-name" },
              tool.name
            )
          ),
          React.createElement("i", {
            className: classNames(tool.icon, "tool-card-icon"),
          })
        )
      );
    });
  };
  return React.createElement(
    MenuSection,
    {
      icon: "fa-solid fa-toolbox",
      id: "tools-section",
      title: "Widget工具（即將陸續推出）",
    },
    getTools()
  );
};
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
  return React.createElement(
    MenuSection,
    {
      icon: "fa-regular fa-pot-food",
      id: "restaurants-section",
      title: "智能家居解決方案!",
    },
    getRestaurants()
  );
};
const Movies = () => {
  const getMovies = () => {
    return [
      {
        desc: "年輕夫婦擁抱智能家居，卻遭遇手機系統兼容難題？跨平台兼容服務，讓 iOS 與 Android 和諧共處，輕鬆掌控智能家居！",
        id: 1,
        icon: "fa-solid fa-galaxy",
        image: "https://i.imgur.com/HsiUZwW.jpeg",
        title: "個案一：跨平台兼容，告別手機系統之爭",
      },
      {
        desc: "工作繁忙，渴望回家後徹底放鬆？個性化程序定制服務，打造專屬回家模式，讓智能家居懂你所需，給你想要的舒適與便捷！",
        id: 2,
        icon: "fa-solid fa-hat-wizard",
        image: "https://i.imgur.com/1EayHFG.jpeg",
        title: "個案二：個性化定制，打造專屬的智能生活",
      },
      {
        desc: "夢想擁有一個充滿科技感的電競房？智能燈光系統，玩轉色彩與光影，營造身臨其境的遊戲氛圍，讓你的電競夢想照進現實！.",
        id: 3,
        icon: "fa-solid fa-broom-ball",
        image: "https://i.imgur.com/NtALiKR.jpeg",
        title: "個案三：型棍效果，營造電競房的沉浸式體驗",
      },
      {
        desc: "關注環保，希望為地球出一份力？智能家居節能方案，實時監控用電情況，智能化管理能源消耗，輕鬆開啟綠色環保的智能生活！.",
        id: 4,
        icon: "fa-solid fa-starship-freighter",
        image: "https://i.imgur.com/JWRy5m2.jpeg",
        title: "個案四：節能減排方案，打造綠色智能家居",
      },
    ].map((movie) => {
      const styles = {
        backgroundImage: `url(${movie.image})`,
      };
      const id = `movie-card-${movie.id}`;
      return React.createElement(
        "div",
        { key: movie.id, id: id, className: "movie-card" },
        React.createElement("div", {
          className: "movie-card-background background-image",
          style: styles,
        }),
        React.createElement(
          "div",
          { className: "movie-card-content" },
          React.createElement(
            "div",
            { className: "movie-card-info" },
            React.createElement(
              "span",
              { className: "movie-card-title" },
              movie.title
            ),
            React.createElement(
              "span",
              { className: "movie-card-desc" },
              movie.desc
            )
          ),
          React.createElement("i", { className: movie.icon })
        )
      );
    });
  };
  return React.createElement(
    MenuSection,
    {
      icon: "fa-solid fa-camera-movie",
      id: "movies-section",
      scrollable: true,
      title: "「我們就是成功的例子！」⁽⁽ ◟(∗ ˊωˋ ∗)◞ ⁾⁾",
    },
    getMovies()
  );
};
const UserStatusButton = (props) => {
  const { userStatus, setUserStatusTo } = React.useContext(AppContext);
  const handleOnClick = () => {
    setUserStatusTo(props.userStatus);
  };
  return React.createElement(
    "button",
    {
      id: props.id,
      className: "user-status-button clear-button",
      disabled: userStatus === props.userStatus,
      type: "button",
      onClick: handleOnClick,
    },
    React.createElement("i", { className: props.icon })
  );
};
const Menu = () => {
  return React.createElement(
    "div",
    { id: "app-menu" },
    React.createElement(
      "div",
      { id: "app-menu-content-wrapper" },
      React.createElement(
        "div",
        { id: "app-menu-content" },
        React.createElement(
          "div",
          { id: "app-menu-content-header" },
          React.createElement(
            "div",
            { className: "app-menu-content-header-section" },
            React.createElement(Info, { id: "app-menu-info" }),
            React.createElement(Reminder, null)
          ),
          React.createElement(
            "div",
            { className: "app-menu-content-header-section" },
            React.createElement(UserStatusButton, {
              icon: "fa-solid fa-arrow-right-from-arc",
              id: "sign-out-button",
              userStatus: UserStatus.LoggedOut,
            })
          )
        ),
        React.createElement(QuickNav, null),
        React.createElement(
          "a",
          {
            id: "youtube-link",
            className: "clear-button",
            href: "https://discord.gg/FmkjYKvWVM",
            target: "_blank",
          },
          React.createElement("i", { className: "fa-brands fa-youtube" }),
          React.createElement("span", null, "Discord頻道")
        ),
        //React.createElement(Weather, null),

        React.createElement(Carousell, null),
        React.createElement(Restaurants, null),
        React.createElement(Tools, null),
        React.createElement(Movies, null)
      )
    )
  );
};
const Background = () => {
  const { userStatus, setUserStatusTo } = React.useContext(AppContext);
  const handleOnClick = () => {
    if (userStatus === UserStatus.LoggedOut) {
      setUserStatusTo(UserStatus.LoggingIn);
    }
  };
  return React.createElement(
    "div",
    { id: "app-background", onClick: handleOnClick },
    React.createElement("div", {
      id: "app-background-image",
      className: "background-image",
    })
  );
};
const Loading = () => {
  return React.createElement(
    "div",
    { id: "app-loading-icon" },
    React.createElement("i", { className: "fa-solid fa-spinner-third" })
  );
};
const AppContext = React.createContext(null);
////////////////////////////////////////////////////
const Home = () => {
  const [userStatus, setUserStatusTo] = React.useState(UserStatus.LoggedOut);
  const getStatusClass = () => {
    return userStatus.replace(/\s+/g, "-").toLowerCase();
  };

  //

  return React.createElement(
    AppContext.Provider,
    { value: { userStatus, setUserStatusTo } },
    React.createElement(
      "div",
      { id: "app", className: getStatusClass() },
      React.createElement(Info, { id: "app-info" }),
      React.createElement(Pin, null),
      React.createElement(Menu, null),
      React.createElement(Background, null),
      React.createElement(
        "div",
        { id: "sign-in-button-wrapper" },
        React.createElement(UserStatusButton, {
          icon: "fa-solid fa-arrow-right-to-arc",
          id: "sign-in-button",
          userStatus: UserStatus.LoggingIn,
        })
      ),
      React.createElement(Loading, null)
    )
  );
};
export default Home;
//var ReactDOM = require("react-dom/client");
/*
ReactDOM.render(
  React.createElement(App, null),
  document.getElementById("root")
);
*/

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
