import React from "react";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      {/* <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={fullName} /> */}
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
