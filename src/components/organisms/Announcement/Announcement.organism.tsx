import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'
import FluidContainer from 'components/templates/FluidContainer/FluidContainer.template'

import styles from './styles.module.scss'

const Announcement = () => {
  // @TODO get from somewhere else?
  const bannerMsgFromStore = 'AI Caramba'

  return (
    <FluidContainer className={styles.announcement}>
      <CappedContainerTemplate className={styles.wrapper}>
        <p>{bannerMsgFromStore}</p>
      </CappedContainerTemplate>
    </FluidContainer>
  )
}

export default Announcement
