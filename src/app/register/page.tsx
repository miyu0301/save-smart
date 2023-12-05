import React from 'react'
import Layout from "@/components/Layout"
import Link from 'next/link'
import prisma from '@/db'
import { redirect } from 'next/navigation'

const signup = async (formData: FormData) => {
  'use server'
  const name = formData.get('name')?.valueOf();
  const email = formData.get('email')?.valueOf();
  const password = formData.get('password')?.valueOf();

  if(typeof name !== 'string' || name.length === 0){
    throw new Error
  }
  if(typeof email !== 'string' || email.length === 0){
    throw new Error
  }
  if(typeof password !== 'string' || password.length === 0){
    throw new Error
  }
  const count = await prisma.user.count({
    where: {
      email: email,
      password: password,
    }
  })
  if(count === 0){
    const res = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      }
    })
    console.log('res', res.id)
    // global.userId = res.id;
    redirect('/calculator')  
  }else{
    // error
  }
}
const page = () => {
  return (
    
    <Layout pageTitle="Sign Up">
      <div>
        <form action={signup} className='flex flex-col text-zinc-900'>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" required />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" required />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
          <Link href='/' className="border border-zinc-100 text-zinc-100 px-2 py-1 text-center hover:bg-zinc-900">Cancel</Link>
          <button type="submit" className='text-zinc-100'>Sign up</button>
        </form>
      </div>
    </Layout>
  )
}

export default page