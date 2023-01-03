// import React from 'react'
import Image, { type ImageProps } from 'next/image'

import { ProductStatus } from '@prisma/client'

const MainIcons = ({ icon, ...props }: { icon: ProductStatus } & Partial<ImageProps>) => {
  let iconComponent = null

  if (icon === ProductStatus.GONE)
    iconComponent = (
      <Image src="/assets/svg/gone.svg" alt="bulb icon" height={20} width={20} {...props} />
    )
  if (icon === ProductStatus.SOLD)
    iconComponent = (
      <Image src="/assets/svg/sold.svg" alt="bulb icon" height={20} width={20} {...props} />
    )
  if (icon === ProductStatus.NEW)
    iconComponent = (
      <Image src="/assets/svg/bulb.svg" alt="bulb icon" height={20} width={20} {...props} />
    )
  if (icon === ProductStatus.FIRE)
    iconComponent = (
      <Image src="/assets/svg/fire.svg" alt="bulb icon" height={20} width={20} {...props} />
    )

  return iconComponent
}

export default MainIcons
