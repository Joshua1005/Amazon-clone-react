import formatCurrency from "../utilities/formatCurrency";
import useCart from "../context/CartContext/useCart";
import { Product } from "@/context/ProductsContext/ProductsProvider";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "./ui/use-toast";

type ProductProps = {
  product: Product;
};

const ProductsCard = ({ product }: ProductProps) => {
  const { cart, addItem, updateItem } = useCart();
  const { toast } = useToast();

  const { id, image, name, rating, priceCents } = product;
  const { stars, count } = rating;
  const ratingUrl = `src/assets/images/ratings/rating-${stars * 10}.png`;

  return (
    <article className="border-b border-r border-gray-300 p-5 flex flex-col">
      <section className="flex justify-center items-center h-40 mb-1">
        <img className="max-w-full max-h-full" src={image} />
      </section>
      <p className="line-clamp-2 leading-5 h-10">{name}</p>
      <section className="flex items-center gap-1 mb-4">
        <img className="w-24" src={ratingUrl} />
        <span className="text-sky-500 cursor-pointer mt-[2px]">{count}</span>
      </section>
      <p className="font-bold mb-4">${formatCurrency(priceCents)}</p>
      <section>
        <Select>
          <SelectTrigger className="max-w-40">
            <SelectValue placeholder="Select a quantity" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select quantity:</SelectLabel>
              <SelectSeparator />
              {Array.from({ length: 10 }, (_, index) => {
                return (
                  <SelectItem
                    className="cursor-pointer"
                    key={index}
                    value={(index + 1).toLocaleString()}
                  >
                    <span className="quantity">{index + 1}</span>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>
      <section className="flex-1"></section>
      <Button
        className="my-2"
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          const q = (event.target as HTMLElement)
            .closest("article")
            ?.querySelector(".quantity");

          if (q?.textContent) {
            const inCart = cart.find((cartItem) => cartItem.productId === id);

            if (inCart) {
              updateItem({
                id: inCart.id,
                productId: id,
                quantity: inCart.quantity + parseFloat(q.textContent),
                deliveryOptionId: inCart.deliveryOptionId,
              });
            } else {
              addItem({
                id: crypto.randomUUID(),
                productId: id,
                quantity: parseFloat(q.textContent),
                deliveryOptionId: "1",
              });
            }

            toast({
              title: "Successfully added to cart",
              description: (
                <blockquote className="mt-6 italic inline-block">
                  "{name}"
                </blockquote>
              ),
            });
          } else {
            toast({
              variant: "destructive",
              title: "Uh oh! You must select a quantity!",
              description: (
                <div>
                  How many{" "}
                  <blockquote className="mt-6 italic inline-block">
                    "{name}"
                  </blockquote>{" "}
                  do you want to add?
                </div>
              ),
            });
          }
        }}
      >
        Add to Cart
      </Button>
    </article>
  );
};

export default ProductsCard;
