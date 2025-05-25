"use client"

import Image from "next/image";
import EnergyInput from "./components/EnergyInput";
import { useState } from "react";
import OffersList from "./components/OfferList";
import { cooperatives } from "./data/Cooperatives";

export default function Home() {
  const [value, setValue] = useState<number | null>(null)

  const filteredOffers = value
    ? cooperatives.filter(
        (coop) =>
          value >= coop.valorMinimoMensal && value <= coop.valorMaximoMensal
      )
    : []

  return (
    <main className="min-h-screen bg-gray-100">
      <h1 className="text-center text-2xl font-bold mt-6">
        Simulador de Economia de Energia
      </h1>
      <EnergyInput onSubmit={setValue} />
      {value && <OffersList baseValue={value} offers={filteredOffers} />}
    </main>
  )
}
