"use client"

import { useState } from "react";
import { styled } from "../../../stitches.config";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface BuyBookProps {
  price: string;
  priceId: string;
}

const ButtonStyle = styled("div", {
  background: "$green100",
  width: "100%"
})
export default function BuyButton({ price, priceId }: BuyBookProps) {
  const { data: session, status } = useSession();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post('/api/checkout', {
        priceId: priceId,
      })

      const { checkoutUrl } = response.data;
      console.log(checkoutUrl)
      window.location.href = checkoutUrl;
    } catch (error) {
      console.log(error)
      setIsCreatingCheckoutSession(false);
    }
  }

  return (
    <ButtonStyle>
      {session ? (
        <button onClick={handleCheckout}>
          Buy now {price}
        </button>
      ) : (
        <Link href="/login">
          Log in to buy for {price}
        </Link>
      )}

    </ButtonStyle>
  )
}