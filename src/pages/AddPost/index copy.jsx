import React from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import axios from "../../axios";
import "./AddPost.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import iconGirl from "../../assets/img/icon-girl.svg";
import iconMan from "../../assets/img/icon-man.svg";
import iconImg from "../../assets/img/icon-img.svg";
import iconClose from "../../assets/img/icon-close-bold.svg";
import { Header } from "../../components/Header";
import { module } from "../../utils/react-quill";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postSchema as schema } from "../../utils/yup";
import { Input } from "../../components/Input";

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const inputFileRef = React.useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);

      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      // alert("Ошибка при загрузке файла!");
    }
  };
  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        imageUrl,
        tags,
        text,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании статьи!");
    }
  };

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags.join(","));
        })
        .catch((err) => {
          console.warn(err);
          alert("Ошибка при получении статьи!");
        });
    }
  }, []);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-[1200px]:mx-[32px] mx-[160px] mt-5">
      <Header />
      <div className="font-['Inter'] text-center text-[clamp(58px,6vw,200px)]  max-[1200px]:leading-[150%] leading-[1.2]  font-bold w-full mt-[30px]  border-y border-[#0000004d]">
        {isEditing ? title : "NEW POST"}
      </div>
      <div className="flex flex-row mt-8">
        <div className="flex items-center fixed left-[160px] max-[1200px]:hidden  bottom-[10px] z-[-10]  justify-start ">
          <img src={iconMan} className=" w-[250px] " alt="" />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-8 min-[1200px]:px-[150px] min-[1200px]:absolute min-[1200px]:top-[0+50%] min-[1200px]:left-[calc(50%-35%)] min-[1200px]:w-[70%] w-full flex flex-col justify-between "
        >
          {!imageUrl && (
            <div
              onClick={() => inputFileRef.current.click()}
              className="min-h-[60px] flex items-center justify-center rounded-[10px] border-dashed border-[2px] border-[grey] cursor-pointer"
            >
              <p className="flex flex-row items-center font-['Poppins']  text-[22px] leading-[24px] ">
                <img src={iconImg} className="mr-2 w-6 h-6" alt="" />
                Добавить
              </p>
            </div>
          )}
          <input
            ref={inputFileRef}
            type="file"
            onChange={handleChangeFile}
            hidden
          />
          {imageUrl && (
            <div className="relative border-[2px] border-[gray] border-dashed">
              <div className="w-7 h-7 flex items-center justify-center rounded-[50%] absolute top-5 right-5 bg-[#c4c4c4] ">
                <img
                  src={iconClose}
                  alt=""
                  className="w-5 h-5  cursor-pointer"
                  onClick={onClickRemoveImage}
                />
              </div>
              <img
                className={"w-full max-h-[400px] rounded-[10px] object-cover"}
                src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
                alt="Uploaded"
              />
            </div>
          )}

          {/* <input
            className={
              "font-['Poppins'] mt-6 px-6 min-h-[60px] rounded-[10px] border border-[grey] text-[26px] leading-[28px] font-medium p-2"
            }
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /> */}
          <Input
            label="Title"
            name="title"
            register={register}
            placeholder="Заголовок"
            required
            className="font-['Poppins'] min-h-[60px] rounded-[10px]  text-[26px] leading-[28px] font-medium p-2"
            errorMessage={errors.title && errors.title.message}
          />
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className={
              "font-['Poppins'] min-h-[60px] rounded-[10px]  mt-6 px-6 text-[22px] leading-[24px] border border-[grey] font-normal p-2"
            }
            placeholder="Тeги"
          />
          <div className="quill-cont  mt-6">
            <ReactQuill
              theme="snow"
              value={text}
              onChange={onChange}
              placeholder="Ваш текст"
              modules={module}
              className="text-[40px]"
            />
            <div className={"quill-sub flex flex-row flex-nowrap justify-end"}>
              <button>
                <a
                  href="/"
                  className="mr-[15px] text-[blue] flex items-center py-2 px-8"
                >
                  Отмена
                </a>
              </button>
              <button
                type="submit"
                className="bg-[blue] rounded-[10px] text-white py-2 px-8 flex items-center"
              >
                {isEditing ? "Сохранить" : "Отправить"}
              </button>
            </div>
          </div>
        </form>
        <div className="flex fixed right-[160px] bottom-[10px] max-[1200px]:hidden  z-[-10] items-center  justify-center ">
          <img src={iconGirl} className=" w-[250px]" alt="" />
        </div>
      </div>
    </div>
  );
};
