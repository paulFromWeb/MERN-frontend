// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { UserInfo } from "../UserInfo";
// import { fetchRemovePost } from "../../redux/slices/posts";
// import closeIcon from "../../assets/img/icon-close.svg";
// import editIcon from "../../assets/img/icon-edit.svg";

// export const Post = ({
//   id,
//   i,
//   title,
//   text,
//   recentPost,
//   createdAt,
//   imageUrl,
//   user,
//   viewsCount,
//   commentsCount,
//   tags,
//   children,
//   isFullPost,
//   isLoading,
//   position,
//   isEditable,
//   className,
// }) => {
//   const dispatch = useDispatch();

//   const onClickRemove = () => {
//     if (window.confirm("Вы действительно хотите удалить статью?")) {
//       dispatch(fetchRemovePost(id));
//     }
//   };
//   const [visible, setVisible] = useState(false);
//   console.log(visible);
//   return position === "vertical" ? (
//     <div
//       className={className + " relative flex-wrap flex flex-row"}
//       onMouseEnter={() => setVisible(true)}
//       onMouseLeave={() => setVisible(false)}
//     >
//       {isEditable && (
//         <div
//           className={
//             "absolute top-4 right-4 flex flex-row justify-between " +
//             (!visible ? " hidden" : "")
//           }
//         >
//           <Link to={`/posts/${id}/edit`}>
//             <img className="w-6 h-6 mr-2" src={editIcon} alt="editIcon" />
//           </Link>

//           <img
//             onClick={onClickRemove}
//             className="w-6 h-6 cursor-pointer"
//             src={closeIcon}
//             alt="closeIcon"
//           />
//         </div>
//       )}
//       {imageUrl && (
//         <img
//           className={
//             "object-cover w-full h-[50%] max-[640px]:max-h-[200px] grayscale"
//           }
//           src={imageUrl}
//           alt={title}
//         />
//       )}
//       <div
//         className={
//           "flex flex-col w-full min-[1200px]:p-6   h-[50%] max-[1200px]:py-6 max-[1200px]:h-[100%]"
//         }
//       >
//         <div className={" flex flex-col justify-between h-full"}>
//           <UserInfo {...user} additionalText={createdAt} />
//           <p
//             className={
//               "font-['Poppins'] text-[26px] leading-[28px] font-semibold " +
//               (window.screen.availWidth >= 360 && "pt-4")
//             }
//           >
//             {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
//           </p>
//           <p
//             className={
//               "font-['Poppins'] text-[18px] leading-[24px] font-normal text-[#667085] " +
//               (window.screen.availWidth >= 360 && "pt-4")
//             }
//           >
//             {text}
//           </p>
//           <div
//             className={
//               "flex flex-row flex-wrap " +
//               (window.screen.availWidth >= 360 && "pt-5")
//             }
//           >
//             {tags?.map((name) => (
//               <p
//                 key={name}
//                 className="mr-2 text-[#026AA2] bg-[#026aa224] rounded-[16px] px-[16px] max-[640px]:mb-5 py-[2px]"
//               >
//                 <Link to={`/tag/${name}`}>{name}</Link>
//               </p>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     /////////
//     <div
//       className={
//         className +
//         " relative " +
//         (recentPost && i !== 0 ? " flex-nowrap flex flex-row" : "")
//       }
//       onMouseEnter={() => setVisible(true)}
//       onMouseLeave={() => setVisible(false)}
//     >
//       {isEditable && (
//         <div
//           className={
//             "absolute top-4 right-4 flex flex-row justify-between " +
//             (!visible ? " hidden" : "")
//           }
//         >
//           <Link to={`/posts/${id}/edit`}>
//             <img className="w-6 h-6 mr-2" src={editIcon} alt="editIcon" />
//           </Link>

//           <img
//             onClick={onClickRemove}
//             className="w-6 h-6 cursor-pointer"
//             src={closeIcon}
//             alt="closeIcon"
//           />
//         </div>
//       )}
//       {imageUrl && (
//         <img
//           className={"object-cover w-[50%] h-full grayscale "}
//           src={imageUrl}
//           alt={title}
//         />
//       )}
//       <div className={"flex flex-col w-[50%] min-[1200px]:p-6"}>
//         <div className={" flex flex-col justify-between h-full"}>
//           <UserInfo {...user} additionalText={createdAt} />
//           <p
//             className={
//               "font-['Poppins'] text-[26px] leading-[28px] font-semibold"
//             }
//           >
//             {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
//           </p>
//           <p
//             className={
//               "font-['Poppins'] text-[18px] leading-[24px] font-normal text-[#667085]"
//             }
//           >
//             {text}
//           </p>
//           <div className={"flex flex-row flex-wrap "}>
//             {tags?.map((name) => (
//               <p
//                 key={name}
//                 className="mr-2 text-[#026AA2] bg-[#026aa224] rounded-[16px] px-[16px] py-[2px] max-[640px]:mb-5"
//               >
//                 <Link to={`/tag/${name}`}>{name}</Link>
//               </p>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
