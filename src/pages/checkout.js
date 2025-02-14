import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import { selectItems } from "../slices/basketSlice";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSession } from "next-auth/react";
import { selectTotal } from "../slices/basketSlice";


function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session, status } = useSession()

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* {left} */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-2xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty."
                : "Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>

        {/* {right} */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
            <h2 className="whitespace-nowrap">Subtotal ({items.length} items):{" "}
            <span className="font-bold">
              ${total}
            </span>
            </h2>
            <button disabled={!session} className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 text-gray-300 cursor-not-allowed'}`}>{!session ? 'Sign in to checkout': "Proceed to checkout" }</button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
