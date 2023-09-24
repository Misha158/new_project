import { useRef, useState, DragEvent, ChangeEvent } from "react";
import { Button } from "antd";

import { prepareFormData, setPhotoPreview } from "./utils";

import "./style.scss";
import { UploadService } from "../../services/UploadService";
import { useAppDispatch } from "../../store/hooks";
import { upload } from "../../store/slices/uploadsSlice";

// use react hook form
export const UploadPage = () => {
  const [fileURL, setFileURL] = useState<ArrayBuffer | string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const fileInput = useRef<HTMLInputElement | null>(null);

  const onUpload = () => {
    fileInput.current?.click();
  };

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { formData, files } = prepareFormData(e);
    setFormData(formData);
    setPhotoPreview({ files, setFileURL });

    setIsDragging(false);
  };

  const dispatch = useAppDispatch();

  const onSavePhoto = async () => {
    const avatarUrl = await UploadService.upload({ formData: formData as FormData });
    dispatch(upload(avatarUrl));
  };

  return (
    <div>
      <h1 className="main">UploadPage</h1>
      <form>
        <label className="uploader__label">
          <Button onClick={onUpload}>upload</Button>
          <input type="file" ref={fileInput} className="uploader__input" onChange={(e) => onDrop(e)} />
        </label>

        <div
          className={`uploader__drag_area ${isDragging ? "active" : ""}`}
          onDragStart={onDragStart}
          onDragLeave={onDragLeave}
          onDragOver={onDragStart}
          onDrop={(e: DragEvent<HTMLInputElement>) => onDrop(e)}
        >
          <div>{isDragging ? "Leave file here" : "Drag files here"}</div>
        </div>

        <img src={fileURL} alt="" />
        <Button onClick={onSavePhoto}>Save photo</Button>
      </form>
    </div>
  );
};
