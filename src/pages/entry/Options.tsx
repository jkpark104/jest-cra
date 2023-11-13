import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import { pricePerItem } from "../../constants";
import { useUserOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utils";
import AlertBanner from "../common/AlertBanner";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";

export type OptionType = "scoops" | "toppings";

export type Props = {
  optionType: OptionType;
};

export type Item = {
  name: string;
  imagePath: string;
};

export default function Options({ optionType }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState(false);

  const { totals } = useUserOrderDetails();

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(`http://localhost:3030/${optionType}`, {
        signal: controller.signal,
      })
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        setError(true);
      });

    return () => {
      controller.abort();
    };
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  // TODO: replace null with ToppingOption when available
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}
