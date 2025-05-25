type Offer = {
    name: string
    valorMinimoMensal: number
    valorMaximoMensal: number
    desconto: number
  }
  
  type Props = {
    baseValue: number
    offers: Offer[]
  }
  
  export default function OffersList({ baseValue, offers }: Props) {
    if (offers.length === 0) {
      return (
        <div className="p-4 text-center text-red-600 font-semibold">
          Nenhuma cooperativa disponível para o valor informado.
        </div>
      )
    }
  
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Ofertas Disponíveis</h2>
        <ul>
          {offers.map((coop, index) => {
            const discount = coop.desconto * baseValue
            return (
              <li
                key={index}
                className="mb-4 p-4 border rounded shadow-sm bg-white"
              >
                <p className="font-semibold">{coop.name}</p>
                <p>
                  Faixa de consumo: R$ {coop.valorMinimoMensal.toLocaleString()} a R$ {coop.valorMaximoMensal.toLocaleString()}
                </p>
                <p>Desconto: {(coop.desconto * 100).toFixed(0)}%</p>
                <p>Você economiza: R$ {discount.toFixed(2)}</p>
                <p>Total a pagar: R$ {(baseValue - discount).toFixed(2)}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  