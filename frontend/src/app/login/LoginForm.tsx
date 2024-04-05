import Image from 'next/image'

import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'

import GoogleIcon from '~/assets/google-logo.svg'

const LoginForm = (): JSX.Element => {
  return (
    <div className="flex justify-center">
      <div className="w-5/6 max-w-sm">
        <div>
          <h2 className="mt-6 text-start text-3xl font-extrabold">會員登入</h2>
        </div>
        <form className="space-y-6" action="#" method="POST">
          <div>
            <Label htmlFor="email" className="my-6">
              Email
            </Label>
            <Input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email"
            />
          </div>
          <div>
            <Label htmlFor="password">密碼</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>

          <div className="flex flex-row justify-between">
            <Button className="w-[45%] justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              註冊
            </Button>
            <Button
              type="submit"
              className="w-[45%] justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              登入
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">社群登入</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3">
            <div>
              <Button className="w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                <Image
                  src={GoogleIcon}
                  alt="Google"
                  className="mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                Google 登入
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
