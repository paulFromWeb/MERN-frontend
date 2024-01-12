import React from "react";

export const UserInfo = ({ fullName, additionalText }) => {
  return (
    <div className={"flex items-center"}>
      <div className={"flex flex-row w-full text-[#6941C6]"}>
        <span
          className={
            "font-['Poppins'] text-[16px] leading-[24px] font-semibold"
          }
        >
          {fullName}
        </span>
        <span
          className={
            "ml-4 font-['Poppins'] text-[16px] leading-[24px] font-semibold"
          }
        >
          {additionalText}
        </span>
      </div>
    </div>
  );
};
