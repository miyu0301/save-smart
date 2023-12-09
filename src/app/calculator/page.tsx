"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";

const page = () => {
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(1);
  const [unitName, setUnitName] = useState("item");
  const [unitValue, setUnitValue] = useState(1);
  const [radioValue, setRadioValue] = useState(0);
  const [showPrice, setShowPrice] = useState(0);

  const radios = [
    { name: "item", display: "item", unitValue: 1, value: 0 },
    { name: "g", display: "g", unitValue: 1, value: 1 },
    { name: "00g", display: "100g", unitValue: 1, value: 2 },
    { name: "dozen", display: "item", unitValue: 12, value: 3 },
    { name: "lb", display: "lb", unitValue: 1, value: 4 },
    { name: "oz", display: "oz", unitValue: 1, value: 5 },
  ];

  useEffect(() => {
    let calculatedPrice = price / (amount * unitValue);
    if (Number.isInteger(calculatedPrice)) {
      setShowPrice(calculatedPrice);
    } else {
      setShowPrice(Number(calculatedPrice.toFixed(2)));
    }
  }, [price, amount, radioValue]);

  return (
    <Layout pageTitle="Calculator">
      <h2 className="mb-4">Calculate</h2>
      <label>$</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      ></input>
      <label>per</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      ></input>
      <div>
        {radios.map((radio, idx) => (
          <button
            key={idx}
            id={`radio-${idx}`}
            name="radio"
            value={radio.value}
            onClick={(e) => {
              setUnitName(radio.display);
              setUnitValue(radio.unitValue);
              setRadioValue(Number(e.currentTarget.value));
            }}
          >
            {radio.name}
          </button>
        ))}
      </div>
      <p className="" id="display-price">
        $ {showPrice} per {unitName}
      </p>
      <button
        className="my-3"
        onClick={() => {
          setPrice(0);
          setAmount(1);
          setUnitName("item");
          setRadioValue(0);
        }}
      >
        Clear
      </button>
    </Layout>
  );
};

export default page;
