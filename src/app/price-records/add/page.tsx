import React from "react";
import Layout from "@/components/Layout";
import prisma from "@/db";
import { redirect } from "next/navigation";
import PriceRecordListItem from "@/components/PriceRecordListItem";
import { revalidatePath } from "next/cache";

const addPriceRecord = async (formData: FormData) => {
  "use server";
  const name = formData.get("name")?.valueOf();
  const price = formData.get("price")?.valueOf();
  const unit = formData.get("unit")?.valueOf();
  const memo = formData.get("memo")?.valueOf();
  const categoryId = formData.get("category")?.valueOf();
  const shopId = formData.get("shop-name")?.valueOf();

  if (typeof name !== "string" || name.length === 0) {
    throw new Error();
  }
  if (typeof price !== "string" || price.length === 0) {
    throw new Error();
  }

  await prisma.priceRecord.create({
    data: {
      itemName: name,
      price: Number(price),
      unit: unit as string | null,
      memo: memo as string | null,
      categoryId: categoryId as string | null,
      shopId: shopId as string | null,
    },
  });
  redirect("/price-records");
};

const page = async () => {
  let cateogories: any[] = [];
  let shops: any[] = [];
  try {
    cateogories = await prisma.category.findMany({
      where: {
        deletedAt: null,
      },
    });
    shops = await prisma.shop.findMany({
      where: {
        deletedAt: null,
      },
    });
  } catch (error) {
    console.log("errr", error);
  }
  return (
    <Layout pageTitle="Price Record List">
      <div className="">
        <form action={addPriceRecord} className="">
          <label htmlFor="name">Product Name</label>
          <input type="text" name="name" required />
          <label htmlFor="price">Price</label>
          <input type="number" name="price" required />
          <label htmlFor="unit">per</label>
          <input type="text" name="unit" />
          <label htmlFor="memo">Memo</label>
          <input type="text" name="memo" />
          <label htmlFor="category">category</label>
          <select name="category" id="category" className="">
            {cateogories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>
          <label htmlFor="shop-name">shop name</label>
          <select name="shop-name" id="shop-name" className="">
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.shopName}
              </option>
            ))}
          </select>
          <button type="submit" className="">
            Save
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default page;
