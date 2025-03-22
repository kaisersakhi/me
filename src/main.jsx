import React from "react";
import ReactDOM from "react-dom/client";
import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";
import { FaBlog } from "react-icons/fa";
import "./styles.css";

const img = [
  "https://cdn.pixabay.com/photo/2018/04/19/08/22/background-3332557_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/05/17/08/55/tree-7999477_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg",
  "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/04/18/22/05/seashells-1337565_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/07/05/13/44/beach-832346_1280.jpg",
  "https://cdn.pixabay.com/photo/2012/07/16/10/10/bridal-veil-fall-52450_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/03/02/16/54/iceland-2111810_1280.jpg",
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <section className="h-screen" style={{ position: "relative" }}>
      <img
        src={img[Math.floor(Math.random() * img.length)]}
        alt="Image"
        style={{ filter: "blur(8px)" }}
        className="w-full h-full object-cover"
      />
      <div
        className="flex items-center w-full h-full column"
        style={{ position: "absolute", top: 0 }}
      >
        <h1
          className="text-white p-10 text-center text-6xl w-full"
          style={{ fontFamily: "BrittnaySignature" }}
        >
          Kaiser Sakhi
        </h1>
      </div>
      <div
        className="flex items-center justify-center w-full h-full column"
        style={{ position: "absolute", top: 0 }}
      >
        <ul className="flex justify-between mt-20 pt-20 text-sm gap-6">
          <li>
            <a href="https://github.com/kaisersakhi">
              <AiFillGithub className="text-white text-3xl hover:text-orange-300" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/kaisersakhi/">
              <AiFillLinkedin className="text-white text-3xl  hover:text-orange-300" />
            </a>
          </li>

          <li>
            <a href="https://blog.kaisersakhi.com">
              <FaBlog className="text-white text-3xl hover:text-orange-300" />
            </a>
          </li>

          <li>
            <a href="mailto:mail@kaisersakhi.com">
              <AiFillMail className="text-white text-3xl hover:text-orange-300" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  </React.StrictMode>
);
