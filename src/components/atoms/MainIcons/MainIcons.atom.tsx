// import React from 'react'
import Image from 'next/image'

import { ProductStatus } from '@prisma/client'

const MainIcons = ({ icon }: { icon: ProductStatus }) => {
  let iconComponent = null

  if (icon === ProductStatus.GONE)
    iconComponent = <Image src="/assets/svg/gone.svg" alt="bulb icon" height={20} width={20} />
  if (icon === ProductStatus.SOLD)
    iconComponent = <Image src="/assets/svg/sold.svg" alt="bulb icon" height={20} width={20} />
  if (icon === ProductStatus.NEW)
    iconComponent = <Image src="/assets/svg/bulb.svg" alt="bulb icon" height={20} width={20} />
  if (icon === ProductStatus.FIRE)
    iconComponent = <Image src="/assets/svg/fire.svg" alt="bulb icon" height={20} width={20} />

  return iconComponent
}

export default MainIcons
