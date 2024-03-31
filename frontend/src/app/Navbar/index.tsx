import Image from 'next/image'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'

import logo from '~/assets/logo.png'

const LINKS = [
  {
    name: 'Home',
    href: '/',
  },
]

const Navbar = (): JSX.Element => {
  return (
    <nav className="border-b-[1px] border-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="">
            <Image className="h-12 w-12" src={logo} alt="Logo" />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Popover>
              <PopoverTrigger
                className="inline-flex items-center justify-center rounded-md p-2"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="material-symbols-outlined">menu</span>
              </PopoverTrigger>
              <PopoverContent>
                {LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-base font-medium"
                    aria-current="page"
                  >
                    {link.name}
                  </a>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
