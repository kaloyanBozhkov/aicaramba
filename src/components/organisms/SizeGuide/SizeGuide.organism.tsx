import { Group, Stack, Switch, Table } from '@mantine/core'
import { useToggle } from '@mantine/hooks'

import styles from './styles.module.scss'

const SizeGuide = () => {
  const [unit, setUnit] = useToggle<'cm' | 'in'>(['cm', 'in'])

  return (
    <Stack className={styles.sizeGuide}>
      <Group className={styles.unitWrapper}>
        <Switch
          label="Unit"
          labelPosition="left"
          size="lg"
          offLabel="IN"
          onLabel="CM"
          className={styles.switch}
          checked={unit === 'cm'}
          onChange={(e) => setUnit(e.currentTarget.checked ? 'cm' : 'in')}
        />
      </Group>
      <div className={styles.tableWrapper}>
        <Table>
          <thead>
            <tr>
              <th>Size</th>
              <th>Width</th>
              <th>Height</th>
              <th>Sleeve Length</th>
            </tr>
          </thead>
          <tbody>
            {shirtSizingsCM.map(({ size, width, height, sleeveLength }) => (
              <tr key={size}>
                <td data-title="Size">{size}</td>
                <td data-title="Width">{formatUnit(unit, width)}</td>
                <td data-title="Height">{formatUnit(unit, height)}</td>
                <td data-title="Sleeve Length">{formatUnit(unit, sleeveLength)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Stack>
  )
}

export default SizeGuide

export const shirtSizingsCM = [
    {
      size: 'S',
      width: 51,
      height: 71,
      sleeveLength: 22,
    },
    {
      size: 'M',
      width: 54.4,
      height: 72,
      sleeveLength: 23,
    },
    {
      size: 'L',
      width: 58,
      height: 74,
      sleeveLength: 24,
    },
    {
      size: 'XL',
      width: 61,
      height: 76.5,
      sleeveLength: 24.5,
    },
  ],
  formatUnit = (unit: 'cm' | 'in', n: number) =>
    unit === 'cm' ? `${n} cm` : `${Math.round(n * 0.393701 * 100) / 100} in`
