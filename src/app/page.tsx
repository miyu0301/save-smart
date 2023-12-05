import Layout from "@/components/Layout"
import Link from 'next/link'
import prisma from '@/db'
import { redirect } from 'next/navigation'

const login = async (formData: FormData) => {
  'use server'
  const email = formData.get('email')?.valueOf();
  const password = formData.get('password')?.valueOf();

  const res = await prisma.user.findMany({
    where: {
      email: email,
      password: password,
    }
  })
  if(res.length !== 0){
    redirect('/calculator')  
  }else{
    // cannot login
  }
}
const page = () => {
  return (
    <Layout pageTitle="Login">
      <div>
        <form action={login} className='flex flex-col'>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <button type="submit">Login</button>
          <Link className="border border-zinc-100 text-zinc-100 px-2 py-1 text-center hover:bg-zinc-900" href='/register'>Sign up</Link>
        </form>
      </div>
    </Layout>
  )
}

export default page