import React, { useRef, useState } from "react";
import { Button } from "antd";

import "./style.scss";

// use react hook form
export const UploadPage = () => {
  const [file, setFile] = useState(null);

  const fileInput = useRef<HTMLInputElement>(null);

  const onUpload = () => {
    fileInput.current?.click();
  };

  return (
    <div>
      <h1 className="main">UploadPage</h1>
      <form>
        <label className="uploader__label">
          <Button onClick={onUpload}>upload</Button>
          <input type="file" ref={fileInput} className="uploader__input" />
        </label>

        <Button>Save photo</Button>
      </form>
    </div>
  );
};
