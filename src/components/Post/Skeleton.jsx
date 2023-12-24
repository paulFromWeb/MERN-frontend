import React from "react";

export const PostSkeleton = ({ className, recentPost, position, i }) => {
  return (
    <div
      className={
        className +
        " relative " +
        (position === "vertical"
          ? " flex-wrap flex flex-row "
          : recentPost && i !== 0 && " flex-nowrap flex flex-row")
      }
    >
      <div
        className={
          " bg-[#e1e1e1] animate-pulse " +
          (position === "vertical" ? "w-full h-[50%]" : "w-[50%] h-full")
        }
      ></div>

      <div
        className={
          " flex flex-col min-[1200px]:p-6 " +
          (position === "vertical"
            ? "w-full h-[50%] max-[1200px]:py-6"
            : "w-[50%]")
        }
      >
        <div className={"  flex flex-col justify-between h-full"}>
          <div className={" min-h-[20px] flex flex-row w-full text-[#6941C6]"}>
            <span
              className={
                " min-w-[100px] rounded-[15px] bg-[#e1e1e1] animate-pulse"
              }
            ></span>
            <span
              className={
                "ml-4 min-w-[100px] rounded-[15px] bg-[#e1e1e1] animate-pulse"
              }
            ></span>
          </div>

          <p
            className={
              "min-h-[30px] max-w-[260px] rounded-[25px]  bg-[#e1e1e1] animate-pulse " +
              (window.screen.availWidth >= 360 && "pt-4")
            }
          ></p>
          <p
            className={
              " min-h-[90px] rounded-[15px] bg-[#e1e1e1] animate-pulse " +
              (window.screen.availWidth >= 360 && "pt-4")
            }
          ></p>
          <div className={" flex  flex-row flex-wrap "}>
            {[...Array(2)].map((name) => (
              <p
                key={name}
                className="mr-2 text-[#026AA2] min-h-[30px] min-w-[80px] bg-[#e1e1e1] animate-pulse rounded-[16px] px-[16px] max-[640px]:mb-5 py-[2px]"
              ></p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
