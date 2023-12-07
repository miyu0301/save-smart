import React from 'react'
import Layout from "@/components/Layout"
import prisma from '@/db'
import CategoryListItem from '@/components/CategoryListItem'
import { revalidatePath } from 'next/cache'

const saveCategoryName = async (formData: FormData) => {
  'use server'
  const name = formData.get('name')?.valueOf();

  if(typeof name !== 'string' || name.length === 0){
    throw new Error
  }
  const res = await prisma.category.create({
    data: {
      userId: 'test',
      categoryName: name,
    }
  })
  revalidatePath('/setting/category')
}
const onDelete = async (id: string) => {
  'use server'
  await prisma.category.update({
    where: {
      id: id
    },
    data: {
      deletedAt: new Date(),
    }
  })
  revalidatePath('/setting/category')
}
const onEdit = async (id: string, name: string) => {
  'use server'
  await prisma.category.update({
    where: {
      id: id
    },
    data: {
      categoryName: name,
    }
  })
  revalidatePath('/setting/category')
}

const page = async () => {
  let cateogories: any[] = [];
  try {
    cateogories = await prisma.category.findMany({
      where: {
        // userId: id,
        deletedAt: null,
      }
    })      
  } catch (error) {
    console.log('errr', error)
  }

  return (
    <Layout pageTitle="Setting Category">
      <div className=''>
      <form action={saveCategoryName} className=''>
        <label htmlFor="name">Category Name</label>
        <input type="text" name="name" required />
        <button type="submit" className=''>Save</button>
      </form>
      <div>
      {cateogories.map((category, key) => (
        <CategoryListItem key={key} {...category} onDelete={onDelete} onEdit={onEdit} />
      ))}
      </div>
      </div>
    </Layout>
  )
}

export default page