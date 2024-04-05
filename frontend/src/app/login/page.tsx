import Image from 'next/image'

import LoginForm from './LoginForm'

import LoginLogo from '~/assets/login-logo.svg'

const LoginPage = (): JSX.Element => {
  return (
    <div className="flex main-content flex-row items-center justify-center">
      <Image className="w-1/2 hidden md:block" src={LoginLogo} alt="Login Logo" />
      <div className="flex-grow h-full md:h-auto pt-16 md:p-0">
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
