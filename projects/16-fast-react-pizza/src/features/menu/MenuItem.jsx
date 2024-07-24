import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utilities/helpers";
import Button from "../ui/Button";
import {addItem, getCurrentQuantityById} from '../cart/cartSlice'
import DeleteButton from "../cart/DeleteButton";

function MenuItem({ pizza }) {
  const dispatch = useDispatch()
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id))
  const isInCart = currentQuantity > 0

  function handleAddToCart() {
    const newItem = {
      id, name, quantity: 1, unitPrice, totalPrice: unitPrice * 1
    }
    dispatch(addItem(newItem))
  }

  return (
    <li className="flex gap-4">
      <img src={imageUrl} alt={name} className={`h-24 py-2 ${soldOut ? 'grayscale opacity-70' : ''}`}/>
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          {isInCart && <DeleteButton pizzaId={id} />}
          {!soldOut && <Button type="small" onClick={handleAddToCart}>Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
