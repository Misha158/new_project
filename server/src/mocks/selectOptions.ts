export const defaultOptions = [
  {
    value: "jack-1",
    label: "Jack-1",
  },
  {
    value: "lucy-1",
    label: "Lucy-1",
  },
  {
    value: "tom-1",
    label: "Tom-1",
  },
];

export const mockHandleSelectOptions = (req: any, res: any) => {
  const search = req.query?.search as string;

  if (search) {
    setTimeout(() => {
      res.json(defaultOptions.filter((option) => option.value.includes(search)));
    }, 1000); // Задержка в миллисекундах (1 секунда)
    return;
  }

  setTimeout(() => {
    res.json(defaultOptions);
  }, 1000); // Задержка в миллисекундах (1 секунда)
};
