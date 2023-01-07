import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group } from '@mantine/core'

import MessageContent from '../MessageContent/MessageContent.atom'

const ShippingCost = () => (
  <MessageContent>
    <Group>
      <FontAwesomeIcon icon={faTruck} /> <p>Free Standard delivery over €80</p>
    </Group>
  </MessageContent>
)

export default ShippingCost
