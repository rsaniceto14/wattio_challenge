"use client"

import Image from "next/image";
import EnergyInput from "./components/EnergyInput";
import { useState } from "react";
import OffersList from "./components/OfferList";
import { cooperatives } from "./data/Cooperatives";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, DollarSign, MapPin, Users, Zap } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [value, setValue] = useState<number | null>(null)

  const filteredOffers = value
    ? cooperatives.filter(
        (coop) =>
          value >= coop.valorMinimoMensal && value <= coop.valorMaximoMensal
      )
    : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-12 w-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Energia Cooperativa</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre a cooperativa de energia ideal para seu perfil e economize na sua conta de luz
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-2xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-6 w-6 mr-2 text-green-600" />
              Encontre sua Cooperativa
            </CardTitle>
            <CardDescription>Informe seus dados para descobrir as cooperativas disponíveis para você</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">Tipo de Pessoa</Label>
              <RadioGroup value={userType} onValueChange={(value: "pf" | "pj") => setUserType(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pf" id="pf" />
                  <Label htmlFor="pf" className="cursor-pointer">
                    Pessoa Física (PF) - Residencial
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pj" id="pj" />
                  <Label htmlFor="pj" className="cursor-pointer">
                    Pessoa Jurídica (PJ) - Empresarial
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label htmlFor="monthly-bill" className="text-base font-medium">
                Valor da Conta Mensal (R$)
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="monthly-bill"
                  type="text"
                  placeholder="Ex: 350,00"
                  value={monthlyBill}
                  onChange={(e) => handleBillChange(e.target.value)}
                  className="pl-10 text-lg"
                />
              </div>
            </div>

            <Button
              onClick={handleSearch}
              className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
              disabled={!monthlyBill}
            >
              <Zap className="h-5 w-5 mr-2" />
              Buscar Cooperativas
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {showResults && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cooperativas Disponíveis</h2>
              <div className="flex items-center justify-center space-x-4 text-lg">
                <Badge variant="outline" className="px-4 py-2">
                  {userType === "pf" ? "Pessoa Física" : "Pessoa Jurídica"}
                </Badge>
                <Badge variant="outline" className="px-4 py-2">
                  R$ {monthlyBill}
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  {eligibleCooperatives.length} cooperativa(s) encontrada(s)
                </Badge>
              </div>
            </div>

            {eligibleCooperatives.length === 0 ? (
              <Card className="max-w-2xl mx-auto">
                <CardContent className="text-center py-12">
                  <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma cooperativa encontrada</h3>
                  <p className="text-gray-600">
                    Não encontramos cooperativas que atendam aos seus critérios. Tente ajustar o valor da sua conta
                    mensal.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eligibleCooperatives.map((coop) => (
                  <Card key={coop.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-2">{coop.name}</CardTitle>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {coop.location}
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">{coop.savings} economia</Badge>
                      </div>
                      <CardDescription className="text-base">{coop.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Mínimo:</span>
                          <p>{formatCurrency(coop.minMonthlyValue)}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Máximo:</span>
                          <p>{formatCurrency(coop.maxMonthlyValue)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{coop.members.toLocaleString()} membros</span>
                        </div>
                        <div className="flex space-x-1">
                          {coop.types.map((type) => (
                            <Badge key={type} variant="outline" className="text-xs">
                              {type.toUpperCase()}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="font-medium text-gray-700 text-sm">Benefícios:</span>
                        <div className="grid grid-cols-2 gap-1">
                          {coop.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-xs text-gray-600">
                              <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700">Solicitar Proposta</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
