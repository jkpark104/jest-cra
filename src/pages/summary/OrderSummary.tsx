import { useUserOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utils";

export default function OrderSummary() {
  const { totals, optionCounts } = useUserOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops);
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>{`${value} ${key}`}</li>
  ));

  const toppingArray = Object.entries(optionCounts.toppings);
  const toppingList = toppingArray.map(([key, value]) => (
    <li key={key}>{`${value} ${key}`}</li>
  ));

  return (
    <>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingList}</ul>
    </>
  );
}
