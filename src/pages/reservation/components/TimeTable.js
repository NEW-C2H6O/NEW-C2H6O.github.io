import '../style/index.css';
import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';

function TimeTable({ onSelectTimes }) {
  const data = useMemo(
    () =>
      Array(24)
        .fill()
        .map(() => Array(6).fill(' ')),
    [],
  );

  const columns = useMemo(
    () => [
      { Header: '00', accessor: 't0' },
      { Header: '10', accessor: 't1' },
      { Header: '20', accessor: 't2' },
      { Header: '30', accessor: 't3' },
      { Header: '40', accessor: 't4' },
      { Header: '50', accessor: 't5' },
      { Header: '60', accessor: 't6' },
    ],
    [],
  );

  return (
    <SelectableTable
      columns={columns}
      data={data}
      onSelectTimes={onSelectTimes}
    />
  );
}

function SelectableTable({ columns, data, onSelectTimes }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);

  const startSelecting = (rowIndex, colId) => {
    setIsSelecting(true);
    setSelectedCells([{ rowIndex, colId }]);
  };

  const selectCell = (rowIndex, colId) => {
    if (isSelecting && !isSelected(rowIndex, colId)) {
      setSelectedCells((prev) => [...prev, { rowIndex, colId }]);
      onSelectTimes(selectedCells);
    }
  };

  const stopSelecting = () => {
    setIsSelecting(false);
  };

  const isSelected = (rowIndex, colId) => {
    return selectedCells.some(
      (cell) => cell.rowIndex === rowIndex && cell.colId === colId,
    );
  };

  return (
    <table
      {...getTableProps()}
      onMouseUp={stopSelecting}
      onMouseLeave={stopSelecting}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()} className='table-body'>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  className='noselect'
                  {...cell.getCellProps()}
                  onMouseDown={() => startSelecting(i, cell.column.id)}
                  onMouseOver={() => selectCell(i, cell.column.id)}
                  style={{
                    background: isSelected(i, cell.column.id)
                      ? '#9DD7C6'
                      : undefined,
                  }}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export { TimeTable };
