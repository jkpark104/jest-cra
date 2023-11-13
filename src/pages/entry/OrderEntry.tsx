import { formatCurrency } from "../../utils";
import Options from "./Options";
import { useUserOrderDetails } from "../../contexts/OrderDetails";

export default function OrderEntry() {
  const { totals } = useUserOrderDetails();
  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
    </div>
  );
}
