import { Quill } from "react-quill";

export const toolbarOptions = [
  [{ font: ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik", "Arial"] }],
  [
    {
      size: [
        "18px",
        "20px",
        "24px",
        "28px",
        "32px",
        "36px",
        "40px",
        "44px",
        "48px",
        "52px",
      ],
    },
  ],
  [{ align: "" }, { align: "center" }, { align: "right" }],

  ["bold", "italic", "underline"], // toggled buttons

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

  // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["link", "image"],
  [{ color: [] }, { background: ["black", "#bbbaba"] }], // dropdown with defaults from theme
];
var Font = Quill.import("formats/font");
Font.whitelist = ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik", "Arial"];
Quill.register(Font, true);
var Size = Quill.import("attributors/style/size");
Size.whitelist = [
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "36px",
  "40px",
  "44px",
  "48px",
  "52px",
];
Quill.register(Size, true);
export const module = {
  toolbar: toolbarOptions,
};
