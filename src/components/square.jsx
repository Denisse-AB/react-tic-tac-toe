const Square = (props) => {
  return (
    <button
      /*append true or false to this class
        if the square is in the winners array
      */
      className={"square xs:h-[35px] xs:w-[35px] " + (props.ifWinner ? "square-winning" : null) }
      data-pro={props.value}
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

export default Square;