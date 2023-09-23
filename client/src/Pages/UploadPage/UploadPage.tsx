import React, { useRef, useState } from "react";
import { Button } from "antd";

import "./style.scss";

// use react hook form
export const UploadPage = () => {
  const [file, setFile] = useState(null);

  const fileInput = useRef();

  return (
    <div>
      <h1 className="main">UploadPage</h1>
      <form>
        <input type="file" ref={fileInput} />
        <Button>Save photo</Button>
      </form>
    </div>
  );
};
