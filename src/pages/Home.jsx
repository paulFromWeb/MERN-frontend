import React from "react";
import { useDispatch, useSelector } from "react-redux";
import dateFormat, { masks } from "dateformat";
import { Post } from "../components/Post";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { Header } from "../components";
import { PostSkeleton } from "../components/Post/Skeleton";
import { useState } from "react";
import logo from "../assets/img/75204864543.svg";

import { Link } from "react-router-dom";
import { logout, selectIsAuth } from "../redux/slices/auth";

export const Home = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);
  const { posts } = useSelector((state) => state.posts);
  masks.hammerTime = "mmm. d, yyyy";
  const isPostsLoading = posts.status === "loading";

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };
  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);
  const postPosition = (index, width) => {
    if (width >= 360 && width <= 460) {
      return "vertical";
    }
    if (index !== 0 && width >= 1200) {
      return "horizontal";
    }
    if (index === 0 && width >= 1200) {
      return "vertical";
    }
  };
  const [burgerVisible, setBurgerVisible] = useState(false);
  return (
    <>
      <div
        className={
          "bg-[#b2b2b2cc] flex items-center justify-center w-full h-screen fixed " +
          (burgerVisible === true
            ? "z-50 fixed overflow-hidden top-0 right-0"
            : "hidden")
        }
        onClick={() => setBurgerVisible(false)}
      >
        <div className="flex flex-col justify-between items-center h-[50%] leading-1.5 font-['Inter'] text-[24px] font-medium">
          <img src={logo} className="w-[160px] h-[80px] mb-6" alt="" />
          <Link to="/">
            <p>Блог</p>
          </Link>
          <Link to="/authors">
            <p>Авторы</p>
          </Link>
          <Link to="/profile">
            <p>Профиль</p>
          </Link>
          {isAuth ? (
            <>
              <Link to="/add-post">
                <button>Написать статью</button>
              </Link>
              <button onClick={onClickLogout}>Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="leading-1.5">Войти</button>
              </Link>
              <Link to="/register">
                <button className="leading-1.5">Создать аккаунт</button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div
        className={
          "max-[1200px]:mx-[32px] mx-[160px] mt-[20px] mb-[40px] " +
          (burgerVisible === true && "blur-[6px] ")
        }
      >
        <Header setBurgerVisible={setBurgerVisible} />
        <div className="font-['Inter'] text-center text-[clamp(58px,12vw,243px)]  max-[1200px]:leading-[150%] leading-[295px] leading- font-bold w-full mt-[30px]  border-y border-[#0000004d]">
          THE BLOG
        </div>
        <div className="mt-[60px]">
          <p className="mb-[30px] font-['Inter'] text-[24px] leading-[32px] font-semibold ">
            Недавние публикации
          </p>
          <div className="grid grid-cols-6 max-[640px]:flex max-[640px]:flex-col max-[640px]:justify-between max-[640px]:flex-wrap grid-rows-6 gap-[40px]">
            {isPostsLoading
              ? [...Array(4)].map((_, index) => {
                  return (
                    <PostSkeleton
                      key={index}
                      i={index}
                      recentPost={true}
                      position={postPosition(index, window.screen.availWidth)}
                      className={
                        "shadow-[6px_6px_8px_-3px_rgba(0,0,0,0.1)] " +
                        (index === 0
                          ? "col-span-3 row-span-4 min-[1200px]:h-[520px] max-[640px]:h-[560px]   "
                          : index === 1
                          ? "col-span-3 row-span-2 col-start-4 max-[640px]:h-[560px] min-[1200px]:h-[240px]  "
                          : index === 2
                          ? "col-span-3 row-span-2 col-start-4 row-start-3 max-[640px]:h-[560px]  min-[1200px]:h-[240px] "
                          : "col-span-6 row-span-2 row-start-5 max-[640px]:h-[560px]  min-[1200px]:h-[242px]")
                      }
                    />
                  );
                })
              : posts.items
                  .slice(-4)
                  .reverse()
                  .map((obj, index) => (
                    <Post
                      i={index}
                      id={obj._id}
                      recentPost={true}
                      position={postPosition(index, window.screen.availWidth)}
                      className={
                        "shadow-[6px_6px_8px_-3px_rgba(0,0,0,0.1)] " +
                        (index === 0
                          ? "col-span-3 row-span-4 max-h-[520px] max-[640px]:min-h-[480px]   "
                          : index === 1
                          ? "col-span-3 row-span-2 col-start-4 max-[640px]:min-h-[480px] max-h-[240px]  "
                          : index === 2
                          ? "col-span-3 row-span-2 col-start-4 row-start-3 max-[640px]:min-h-[480px]  max-h-[240px] "
                          : "col-span-6 row-span-2 row-start-5 max-[640px]:min-h-[480px]  max-h-[242px]")
                      }
                      title={obj.title}
                      // imageUrl={
                      //   obj.imageUrl
                      //     ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
                      //     : `${"https://loremflickr.com/600/200/" + index}`
                      // }
                      imageUrl={`${
                        "https://loremflickr.com/640/480/architecture/all?lock=" +
                        Math.random() * 1000
                      }`}
                      text={
                        window.screen.availWidth >= 460
                          ? `${obj.text.slice(0, 120)}…`
                          : `${obj.text.slice(0, 80)}…`
                      }
                      user={obj.user}
                      createdAt={dateFormat(obj.createdAt, "hammerTime")}
                      viewsCount={obj.viewsCount}
                      commentsCount={3}
                      tags={
                        obj.tags?.length > 3 ? obj.tags.slice(0, 3) : obj.tags
                      }
                      isEditable={userData?._id === obj.user?._id}
                    />
                  ))}
          </div>
        </div>
        <div className="mt-[60px]">
          <p className="mb-[30px] font-['Inter'] text-[24px] leading-[32px] font-semibold ">
            Все публикации
          </p>
          <div
            className={`grid max-[640px]:flex max-[640px]:flex-col max-[640px]:flex-wrap grid-cols-4 grid-rows-${Math.ceil(
              posts.items.length / 4
            )} gap-[40px]`}
          >
            {isPostsLoading
              ? [...Array(8)].map((_, index) => {
                  return (
                    <PostSkeleton
                      key={index}
                      i={index}
                      position={"vertical"}
                      className={
                        "shadow-[6px_6px_8px_-3px_rgba(0,0,0,0.1)] max-[640px]:h-[560px] min-[1200px]:h-[500px]"
                      }
                      recentPost={false}
                    />
                  );
                })
              : [...posts.items].reverse().map((obj, index) => (
                  <Post
                    i={index}
                    recentPost={false}
                    id={obj._id}
                    title={obj.title}
                    position={"vertical"}
                    className={"shadow-[6px_6px_8px_-3px_rgba(0,0,0,0.1)]"}
                    // imageUrl={
                    //   obj.imageUrl
                    //     ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
                    //     : `${"https://loremflickr.com/600/200/" + index}`
                    // }
                    imageUrl={`${
                      "https://loremflickr.com/640/480/architecture/all?lock=" +
                      Math.random() * 1000
                    }`}
                    text={
                      window.screen.availWidth >= 460
                        ? `${obj.text.slice(0, 120)}…`
                        : `${obj.text.slice(0, 80)}…`
                    }
                    user={obj.user}
                    createdAt={dateFormat(obj.createdAt, "hammerTime")}
                    viewsCount={obj.viewsCount}
                    commentsCount={3}
                    tags={
                      obj.tags?.length > 3 ? obj.tags.slice(0, 3) : obj.tags
                    }
                    isEditable={userData?._id === obj.user?._id}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};
