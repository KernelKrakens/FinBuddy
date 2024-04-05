import Image from 'next/image'

import { RegisterForm } from '~/components/shared/AuthForm'

import LoginLogo from '~/assets/login-logo.svg'

const RegisterPage = (): JSX.Element => {
  return (
    <div className="main-content flex flex-row items-center justify-center">
      <Image
        className="hidden w-1/2 md:block"
        src={LoginLogo}
        alt="Login Logo"
      />
      <div className="h-full flex-grow pt-16 md:h-auto md:p-0">
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage
