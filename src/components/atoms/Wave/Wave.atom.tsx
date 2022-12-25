import Image from 'next/image'

import styles from './styles.module.scss'

const Wave = ({ position }: { position: 'top' | 'bottom' }) => (
  <Image
    src={`/assets/svg/wave-${position}.svg`}
    alt="border"
    className={styles.wave}
    data-position={position}
    width={500}
    height={500}
  />
)

export default Wave
