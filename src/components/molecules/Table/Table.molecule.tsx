import { ReactNode } from 'react'

import { Table as TableMantine, TableProps } from '@mantine/core'

import styles from './styles.module.scss'

interface ITableProps {
  header: ReactNode[]
  // must have data-title on rows (tr) for mobile headers to show
  children: ReactNode[]
  tableProps?: Partial<TableProps>
  mobileFlowWrap?: boolean
}

const Table = ({ header, children, tableProps = {}, mobileFlowWrap = false }: ITableProps) => (
  <div
    className={styles.tableWrapper}
    data-flow-row-wrap-mobile={mobileFlowWrap ? 'true' : undefined}
  >
    <TableMantine {...tableProps}>
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

export default Table
