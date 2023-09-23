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

  return (
    <div>
      <h1 className="main">UploadPage</h1>
      <form>
        <label className="uploader__label">
          <Button onClick={onUpload}>upload</Button>
          <input type="file" ref={fileInput} className="uploader__input" />
        </label>

        <div
          className={`uploader__drag_area ${isDragging ? "active" : ""}`}
          onDragStart={onDragStart}
          onDragLeave={onDragLeave}
          onDragOver={onDragStart}
        >
          <div>{isDragging ? "Leave file here" : "Drag files here"}</div>
        </div>

        <Button>Save photo</Button>
      </form>
    </div>
  );
};
