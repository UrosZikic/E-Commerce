import { useStored } from "../useStored";

export default function Cart() {
  const { stored } = useStored();

  return (
    stored &&
    stored.map((item, id) => (
      <div key={id}>
        <p style={{ color: "white" }}>{item.name}</p>
      </div>
    ))
  );
}
