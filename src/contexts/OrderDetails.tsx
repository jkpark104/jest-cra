import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

type OrderDetailsType = {
  scoops: Record<string, number>;
  toppings: Record<string, number>;
};

const OrderDetails = createContext<{
  optionCounts: OrderDetailsType;
  updateItemCount: (
    itemName: string,
    newItemCount: number,
    optionType: "scoops" | "toppings"
  ) => void;
  resetOrder: () => void;
  calculateSubtotal: (optionType: "scoops" | "toppings") => number;
  totals: {
    scoops: number;
    toppings: number;
  };
} | null>(null);

export function useUserOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "userOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return contextValue;
}

export function OrderDetailsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [optionCounts, setOptionCounts] = useState<OrderDetailsType>({
    scoops: {},
    toppings: {},
  });

  const updateItemCount = (
    itemName: string,
    newItemCount: number,
    optionType: "scoops" | "toppings"
  ) => {
    const newOptionCounts = { ...optionCounts };

    newOptionCounts[optionType][itemName] = newItemCount;

    setOptionCounts(newOptionCounts);
  };

  const resetOrder = () => {
    setOptionCounts({
      scoops: {},
      toppings: {},
    });
  };

  const calculateSubtotal = (optionType: "scoops" | "toppings") => {
    const countsArray = Object.values(optionCounts[optionType]);

    const totalCount = countsArray.reduce((acc, curr) => acc + curr, 0);

    return totalCount * pricePerItem[optionType];
  };

  const totals = {
    scoops: calculateSubtotal("scoops"),
    toppings: calculateSubtotal("toppings"),
  };

  const value = {
    optionCounts,
    updateItemCount,
    resetOrder,
    calculateSubtotal,
    totals,
  };

  return (
    <OrderDetails.Provider value={value}>{children}</OrderDetails.Provider>
  );
}
