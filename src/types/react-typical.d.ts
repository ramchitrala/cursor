declare module 'react-typical' {
  import { ComponentType } from 'react'
  
  interface TypicalProps {
    steps: (string | number)[]
    loop?: number
    wrapper?: string
    speed?: number
    backSpeed?: number
    backDelay?: number
    children?: React.ReactNode
  }
  
  const Typical: ComponentType<TypicalProps>
  export default Typical
} 