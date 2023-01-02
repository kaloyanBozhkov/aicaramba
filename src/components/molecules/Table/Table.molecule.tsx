import { ReactNode } from 'react'

import { Table as TableMantine } from '@mantine/core'

import styles from './styles.module.scss'

interface ITableProps {
  header: ReactNode[]
  // must have data-title on rows (tr) for mobile headers to show
  children: ReactNode[]
}

const Table = ({ header, children }: ITableProps) => {
  return (
    <div className={styles.tableWrapper}>
      <TableMantine>
        <thead>
          <tr>
            {header.map((h, idx) => (
              <th key={idx}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </TableMantine>
    </div>
  )
}

export default Table
