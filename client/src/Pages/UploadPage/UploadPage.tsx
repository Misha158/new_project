import React, { useRef, useState } from "react";
import { Button } from "antd";

import "./style.scss";

// use react hook form
export const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInput = useRef<HTMLInputElement | null>(null);

  const onUpload = () => {
    fileInput.current?.click();
  };

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    console.log("e", e.target.files);
    const files = [...e.dataTransfer.files];
    console.log("file", files);
    const formData = new FormData();

    formData.append("file", files[0]);

    // Создаем объект FileReader
    const reader = new FileReader();

    // Устанавливаем обработчик события, который сработает после успешного чтения файла
    reader.onload = (event) => {
      // Устанавливаем содержимое файла как источник для элемента <img>
      setFile(event.target.result);
    };

    // Читаем файл в формате Data URL
    reader.readAsDataURL(files[0]);

    setIsDragging(false);
  };

  return (
    <div>
      <h1 className="main">UploadPage</h1>
      <form>
        <label className="uploader__label">
          <Button onClick={onUpload}>upload</Button>
          <input type="file" ref={fileInput} className="uploader__input" onChange={onDrop} />
        </label>

        <div
          className={`uploader__drag_area ${isDragging ? "active" : ""}`}
          onDragStart={onDragStart}
          onDragLeave={onDragLeave}
          onDragOver={onDragStart}
          onDrop={onDrop}
        >
          <div>{isDragging ? "Leave file here" : "Drag files here"}</div>
        </div>

        <img src={file} alt="" />
        <Button>Save photo</Button>
      </form>
    </div>
  );
};
