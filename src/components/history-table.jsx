const HistoryTable = (history) => {
  const historyArray = history;
  return (
    historyArray.history.map((i) =>
    <tr className='margin text-white font-bold' key={i}>
      <td>{i}</td>
      <td>{historyArray.prop[i]}</td>
    </tr>
  ))
}
export default HistoryTable;