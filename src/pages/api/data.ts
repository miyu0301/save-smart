import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db';

async function getPriceRecords() {
  console.log('price records gets')
  return await prisma.priceRecord.findMany();
}

async function getCategories() {
  type categoryTable = {
    id: number;
    categoryName: string;
  };
  const categories: any[] = await prisma.category.findMany({
    where: { deletedAt: null },
  });
  const categoryNames = categories.reduce(function (
    acc: { [key: number]: string },
    cur: categoryTable
  ) {
    acc[cur.id] = cur.categoryName;
    return acc;
  },
  {});
  return categoryNames;
}

async function getShops() {
  type shopTable = {
    id: string;
    shopName: string;
  };
  const shops: any[] = await prisma.shop.findMany({
    where: { deletedAt: null },
  });
  const shopNames = shops.reduce(function (
    acc: { [key: string]: string },
    cur: shopTable
  ) {
    acc[cur.id] = cur.shopName;
    return acc;
  },
  {});
  return shopNames
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type } = req.query;

  try {
    let data;
    
    switch (type) {
      case 'priceRecords':
        data = await getPriceRecords();
        break;
      case 'categories':
        data = await getCategories();
        break;
      case 'shops':
        data = await getShops();
        break;
      default:
        res.status(400).json({ message: 'Invalid query parameter' });
        return;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}
