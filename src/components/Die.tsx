type DieProps = {
    value: number;
    isHeld: boolean;
    toggleHold: () => void;
};

const Die = ({value, isHeld, toggleHold}: DieProps) => {

    return (
        <button className={"die"} onClick={toggleHold}>
            {value}
        </button>
    )
}
export default Die;