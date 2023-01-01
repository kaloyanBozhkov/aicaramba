import MainIcons from 'components/atoms/MainIcons/MainIcons.atom'

import { Group } from '@mantine/core'
import { ProductStatus } from '@prisma/client'

interface IArtworkModalTitle {
  status: ProductStatus
  title: string
}
const ArtworkModalTitle = ({ status, title }: IArtworkModalTitle) => (
  <Group spacing="xs" noWrap>
    <MainIcons icon={status} />
    {title}
  </Group>
)

export default ArtworkModalTitle
