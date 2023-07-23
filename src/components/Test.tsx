interface Props {
  testProp: string;
}

export const Test = ({ testProp }: Props) => {
  return <div>{testProp}</div>;
};
