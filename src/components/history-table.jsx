const HistoryTable = ({history, prop}) => {
  return (
    history.map((i) =>
    <tr className='margin text-white font-bold' key={i}>
      <td>{i}</td>
      <td>{prop[i]}</td>
    </tr>
  ))
}
export default HistoryTable;