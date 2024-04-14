import Image from 'next/image'

import { LoginForm } from '~/components/shared/AuthForm'

import LoginLogo from '~/assets/login-logo.svg'

const LoginPage = (): JSX.Element => {
  return (
    <div className="flex grow flex-row items-center justify-center">
      <Image
        className="hidden w-1/2 md:block"
        src={LoginLogo}
        alt="Login Logo"
      />
      <div className="h-full flex-grow pt-16 md:h-auto md:p-0">
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
