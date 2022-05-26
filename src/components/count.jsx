import { useState } from "react";
import HistoryTable from "./history-table";

const Count = (props) => {
  const tableRows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [sort, setSort] = useState(false);

  const handleSort = () => setSort(!sort)

  return (
    <table className='text-white text-base'>
      <thead>
        <tr className='border border-slate-400'>
          <th>
            <button
              variant="link"
              className='text-decoration-none px-2'
              onClick={handleSort}
            >{sort ? 'Λ' : 'V'}
            </button>
          </th>
          <th>
            <p className='px-5 font-extrabold'>
              History
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          <HistoryTable
            history={sort ? tableRows.reverse() : tableRows}
            prop={props.squares}
          />
        }
      </tbody>
    </table>
  )
}

export default Count;