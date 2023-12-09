import React from "react";
import Layout from "@/components/Layout";
import prisma from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

const page = async ({ params }: { params: { id: string } }) => {
  const record = await prisma?.priceRecord.findUnique({
    where: { id: params.id },
  });

  const updatePriceRecord = async (formData: FormData) => {
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

    const res = await prisma.priceRecord.update({
      where: {
        id: params.id,
      },
      data: {
        itemName: name,
        price: Number(price),
        unit: unit as string | null,
        memo: memo as string | null,
        categoryId: categoryId as string | null,
        shopId: shopId as string | null,
      },
    });
    redirect("/price-tracker");
  };

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
    <div className="flex justify-center items-center bg-black bg-opacity-60 p-5 fixed top-0 left-0 h-full w-full">
      <div className="bg-white text-zinc-900 p-3 w-96">
        <form action={updatePriceRecord} className="">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            defaultValue={record.itemName}
            required
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            defaultValue={record.price}
            required
          />
          <label htmlFor="unit">per</label>
          <input type="text" name="unit" defaultValue={record.unit} />
          <label htmlFor="memo">Memo</label>
          <input type="text" name="memo" defaultValue={record.memo} />
          <label htmlFor="category">category</label>
          <select
            name="category"
            id="category"
            className=""
            defaultChecked={record.categoryId}
          >
            {cateogories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>
          <label htmlFor="shop-name">shop name</label>
          <select
            name="shop-name"
            id="shop-name"
            className=""
            defaultChecked={record.shopId}
          >
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.shopName}
              </option>
            ))}
          </select>
          <button type="submit" className="">
            Save
          </button>
          <Link href=".." className="">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};

export default page;
