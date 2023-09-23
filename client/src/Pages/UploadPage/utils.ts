import { ChangeEvent, Dispatch, DragEvent, SetStateAction } from "react";

export const setPhotoPreview = ({ setFileURL, files }: { setFileURL: Dispatch<SetStateAction<string | ArrayBuffer>>; files: File[] }) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    setFileURL(event!.target!.result!);
  };

  reader.readAsDataURL(files[0]);
};

export const prepareFormData = (e: DragEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) => {
  const droppableFile = (e as DragEvent<HTMLInputElement>).dataTransfer;
  const inputFile = (e as ChangeEvent<HTMLInputElement>).target;

  const files = [...(droppableFile ? droppableFile.files : inputFile.files!)];
  const formData = new FormData();

  formData.append("file", files[0]);

  return { formData, files };
};
