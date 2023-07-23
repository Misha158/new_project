
interface Props {
    testProp: string | any
}

export const Test = ({testProp}: Props) => {
    return (
        <div>
            {testProp}

        </div>
    );
};
