import React from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import dateFormat, { masks } from "dateformat";
import { Post } from "../components/Post";
import "react-quill/dist/quill.snow.css";
import { Header } from "../components";
import "./AddPost/AddPost.css";

export const FullPost = () => {
  masks.hammerTime = "mmm. d, yyyy";
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении статьи");
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <div className="max-[1200px]:mx-[32px] mx-[160px]  my-5">
        <Header />
        <div className="flex flex-col justify-center items-center ">
          <p className="font-['Inter'] text-center break-words text-[clamp(28px,5vw,120px)]   max-[1200px]:leading-[150%] leading-[1.2]  font-extrabold max-w-[900px] mt-[30px]">
            {data.title}
          </p>
          <div className="flex flex-row max-[1200px]:flex-col items-center mb-4 mt-[30px]">
            <div className="flex flex-row items-center">
              <div className="w-10 h-10 max-[1200px]:w-8 max-[1200px]:h-8 rounded-[50%] bg-[grey] mr-2"></div>
              <p className="mr-2 font-medium">Автор {data?.user?.fullName}</p>
            </div>
            {window.screen.availWidth >= 640 && <span>{"•"}</span>}

            <p className="min-[1200px]:ml-2">
              {dateFormat(data.createdAt, "hammerTime")}
            </p>
          </div>
          {data.imageUrl && (
            <div className="w-full flex flex-row justify-center">
              <img
                src={
                  data.imageUrl
                    ? `${process.env.REACT_APP_API_URL}${data.imageUrl}`
                    : ""
                }
                alt=""
              />
            </div>
          )}

          <div className=" ql-snow max-w-[900px] flex flex-row items-center justify-center ">
            <div className="ql-editor">
              <div
                className="text-justify break-all hyphens-auto"
                dangerouslySetInnerHTML={{
                  __html: data.text,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
