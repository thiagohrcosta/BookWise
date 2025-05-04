"use client"

import { useState } from "react";
import { styled } from "../../../stitches.config";
import axios from "axios";

interface BuyBookProps {
  price: string;
  priceId: string;
}

const ButtonStyle = styled("div", {
  background: "$green100",
  width: "100%"
})
export default function BuyButton({ price, priceId }: BuyBookProps) {
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
      <button onClick={handleCheckout}>
        Buy now {price}
      </button>
    </ButtonStyle>
  )
}