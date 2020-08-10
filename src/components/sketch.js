import React from 'react'

export default function Sketch({ activeStep }) {
  return (
    <>
      <Arrow active={activeStep === 0} />
      <ArrowDotted active={activeStep === 1} />
      <Arrow active={activeStep === 2} />
      <ArrowLeft active={activeStep === 3} />
      <ArrowLongLeft active={activeStep === 4} />
      <ArrowLeft active={activeStep === 5} />
    </>
  )
}
