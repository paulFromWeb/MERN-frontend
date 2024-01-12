import React from 'react'

const IconArrowBottom: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<SVGSVGElement>, SVGSVGElement>
> = ({ ...props }) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L8.70711 12.7071C8.31658 13.0976 7.68342 13.0976 7.29289 12.7071L0.292892 5.70711C-0.0976334 5.31658 -0.0976334 4.68342 0.292892 4.29289C0.683416 3.90237 1.31658 3.90237 1.70711 4.29289L8 10.5858L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z'
      fill='currentColor'
    />
  </svg>
)

export default IconArrowBottom
