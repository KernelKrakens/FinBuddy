import { type PropsWithChildren } from 'react'
import { buttonVariants } from '~/components/ui/button'

const DemoLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <nav className="my-2">
        <ul className="flex flex-wrap gap-2">
          <li>
            <a
              href="/demo/server"
              className={buttonVariants({
                className: 'bg-orange-400 hover:bg-orange-500',
              })}
            >
              Server Demo
            </a>
          </li>
          <li>
            <a
              href="/demo/client"
              className={buttonVariants({
                className: 'bg-sky-500 hover:bg-sky-600',
              })}
            >
              Client Demo
            </a>
          </li>
        </ul>
      </nav>
      {children}
    </>
  )
}
export default DemoLayout
