'use client'
import Link from 'next/link'
import prisma from '@/db'
import { revalidatePath } from 'next/cache'
import { useState } from 'react'

type PriceRecordItemProps = {
  key: number,
  id: string,
  itemName: string,
  price: number,
  unit: string,
  memo: string,
  categoryId: string,
  shopId: string,
  categoryNames: {[key: string]: string},
  shopNames: {[key: string]: string},
  onDelete: (id: string) => void,
}

const PriceRecordListItem = ({ key, id, itemName, price, unit, memo, categoryId, shopId, categoryNames, shopNames, onDelete }: PriceRecordItemProps) => {
  
  return (
    <div key={key} className=''>
      <p className="">{itemName}</p>
      <p className="">{price}</p>
      <p className="">{unit}</p>
      <p className="">{memo}</p>
      <p className="">{categoryId ? categoryNames[categoryId] : ''}</p>
      <p className="">{shopId ? shopNames[shopId] : ''}</p>
      <Link href={`/price-tracker/edit/${id}`}>Edit</Link>
      <button type='button' onClick={() => onDelete(id)} className="">Delete</button>
    </div>
  )
}

export default PriceRecordListItem