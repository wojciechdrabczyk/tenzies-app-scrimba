type DieProps = {
    value: number;
};

const Die = ({value}: DieProps) => {
    return (
        <button className={"die"}>
            {value}
        </button>
    )
}
export default Die;