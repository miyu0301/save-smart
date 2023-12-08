import React from 'react'
import Link from 'next/link'
import Layout from "@/components/Layout"
import PriceRecordListItem from '@/components/PriceRecordListItem'
import { revalidatePath } from 'next/cache'
import prisma from '@/db'

const onDelete = async (id: string) => {
  'use server'
  await prisma.priceRecord.delete({ where: { id }})
  revalidatePath('/price-tracker')
}

const page = async() => {
  let priceRecords: any[] = [];
  priceRecords = await prisma.priceRecord.findMany();
  
  let categoryNames: {} = {};
  type categoryTable = {
    id: string,
    categoryName: string,
  }
  const categories = await prisma.category.findMany({ where: { deletedAt: null }});
  categoryNames = categories.reduce(function(acc: {[key: string]: string}, cur: categoryTable){
    acc[cur.id] = cur.categoryName;
    return acc;
  }, {})
  
  let shopNames: {} = {};
  type shopTable = {
    id: string,
    shopName: string,
  }
  const shops = await prisma.shop.findMany({ where: { deletedAt: null }});
  shopNames = shops.reduce(function(acc: {[key: string]: string}, cur: shopTable){
    acc[cur.id] = cur.shopName;
    return acc;
  }, {})

  return (
    <Layout pageTitle="Price Tracker">
      <div className=''>
        tracker page
        <Link href="/price-tracker/add">Add</Link>
      </div>
      <div>
      {priceRecords.map((priceRecord, key) => (
        <PriceRecordListItem key={key} {...priceRecord} categoryNames={categoryNames} shopNames={shopNames} onDelete={onDelete} />
      ))}
      </div>
    </Layout>
  )
}

export default page