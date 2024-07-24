import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getNumPizzas } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";

function CartOverview() {
  const numPizzas = useSelector(getNumPizzas)
  const totalPrice = useSelector(getTotalCartPrice)

  if (!numPizzas) return null

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 px-4 py-4 uppercase text-stone-200 sm:px-6">
      <p className="space-x-4 text-sm font-semibold text-stone-300 sm:space-x-4 md:text-base">
        <span>{numPizzas} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
