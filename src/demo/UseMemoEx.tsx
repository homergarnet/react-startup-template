import React, { useMemo, useState } from "react";
import { initialItems } from "./utils/utils";

interface Props {}

const UseMemoEx: React.FC<Props> = () => {
  const [count, setCount] = React.useState(0);
  const [items] = useState(initialItems);

  //without memo
  //   const selectedItem = items.find((item) => item.isSelected);

  // with memo
  const selectedItem = useMemo(
    () => items.find((item) => item.id === count),
    [count, items]
  );

  return (
    <div className="tutorial">
      <h1>Number of items: {count}</h1>
      <h1>Selected Item: {selectedItem?.id}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default UseMemoEx;
