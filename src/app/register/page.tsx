"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Register() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    peso: "",
    altura: "",
    objetivo: "",
    useBioimpedancia: false,
    percentualGordura: "",
    massaMuscular: ""
  });

  const [imc, setImc] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateIMC = (peso: string, altura: string) => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    
    if (pesoNum > 0 && alturaNum > 0) {
      const imcValue = pesoNum / (alturaNum * alturaNum);
      setImc(Math.round(imcValue * 100) / 100);
    } else {
      setImc(null);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
    
    // Calculate IMC when weight or height changes
    if (field === "peso" || field === "altura") {
      calculateIMC(
        field === "peso" ? value as string : formData.peso,
        field === "altura" ? value as string : formData.altura
      );
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    if (!formData.senha.trim()) newErrors.senha = "Senha é obrigatória";
    if (!formData.peso.trim()) newErrors.peso = "Peso é obrigatório";
    if (!formData.altura.trim()) newErrors.altura = "Altura é obrigatória";
    if (!formData.objetivo) newErrors.objetivo = "Objetivo é obrigatório";
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    
    // Validate numeric fields
    if (formData.peso && (isNaN(Number(formData.peso)) || Number(formData.peso) <= 0)) {
      newErrors.peso = "Peso deve ser um número válido";
    }
    if (formData.altura && (isNaN(Number(formData.altura)) || Number(formData.altura) <= 0)) {
      newErrors.altura = "Altura deve ser um número válido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user data in localStorage for demo
      const userData = {
        ...formData,
        imc,
        registeredAt: new Date().toISOString()
      };
      localStorage.setItem("fitfood_user", JSON.stringify(userData));
      
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Erro no cadastro:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIMCCategory = (imcValue: number) => {
    if (imcValue < 18.5) return { text: "Abaixo do peso", color: "text-blue-600" };
    if (imcValue < 25) return { text: "Peso normal", color: "text-green-600" };
    if (imcValue < 30) return { text: "Sobrepeso", color: "text-yellow-600" };
    return { text: "Obesidade", color: "text-red-600" };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            FitFood
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Criar Conta</h1>
          <p className="text-gray-600 mt-2">
            Preencha seus dados e configure seus objetivos fitness
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>
              Vamos começar com suas informações básicas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    className={errors.nome ? "border-red-500" : ""}
                  />
                  {errors.nome && (
                    <p className="text-sm text-red-500 mt-1">{errors.nome}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  value={formData.senha}
                  onChange={(e) => handleInputChange("senha", e.target.value)}
                  className={errors.senha ? "border-red-500" : ""}
                />
                {errors.senha && (
                  <p className="text-sm text-red-500 mt-1">{errors.senha}</p>
                )}
              </div>

              {/* IMC Test */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Teste de IMC
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="peso">Peso (kg)</Label>
                    <Input
                      id="peso"
                      type="number"
                      step="0.1"
                      placeholder="Ex: 70.5"
                      value={formData.peso}
                      onChange={(e) => handleInputChange("peso", e.target.value)}
                      className={errors.peso ? "border-red-500" : ""}
                    />
                    {errors.peso && (
                      <p className="text-sm text-red-500 mt-1">{errors.peso}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="altura">Altura (m)</Label>
                    <Input
                      id="altura"
                      type="number"
                      step="0.01"
                      placeholder="Ex: 1.75"
                      value={formData.altura}
                      onChange={(e) => handleInputChange("altura", e.target.value)}
                      className={errors.altura ? "border-red-500" : ""}
                    />
                    {errors.altura && (
                      <p className="text-sm text-red-500 mt-1">{errors.altura}</p>
                    )}
                  </div>
                </div>
                
                {imc && (
                  <Alert className="mt-4">
                    <AlertDescription>
                      <strong>Seu IMC: {imc}</strong>
                      <span className={`ml-2 ${getIMCCategory(imc).color}`}>
                        ({getIMCCategory(imc).text})
                      </span>
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Objective */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Qual é seu objetivo?
                </h3>
                <RadioGroup
                  value={formData.objetivo}
                  onValueChange={(value) => handleInputChange("objetivo", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="emagrecimento" id="emagrecimento" />
                    <Label htmlFor="emagrecimento">Emagrecimento</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ganho_massa" id="ganho_massa" />
                    <Label htmlFor="ganho_massa">Ganho de Massa</Label>
                  </div>
                </RadioGroup>
                {errors.objetivo && (
                  <p className="text-sm text-red-500 mt-1">{errors.objetivo}</p>
                )}
              </div>

              {/* Bioimpedance */}
              <div className="border-t pt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    id="bioimpedancia"
                    checked={formData.useBioimpedancia}
                    onCheckedChange={(checked) => 
                      handleInputChange("useBioimpedancia", checked as boolean)
                    }
                  />
                  <Label htmlFor="bioimpedancia">
                    Adicionar dados de bioimpedância (opcional)
                  </Label>
                </div>
                
                {formData.useBioimpedancia && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                    <div>
                      <Label htmlFor="percentualGordura">Percentual de Gordura (%)</Label>
                      <Input
                        id="percentualGordura"
                        type="number"
                        step="0.1"
                        placeholder="Ex: 15.5"
                        value={formData.percentualGordura}
                        onChange={(e) => handleInputChange("percentualGordura", e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="massaMuscular">Massa Muscular (kg)</Label>
                      <Input
                        id="massaMuscular"
                        type="number"
                        step="0.1"
                        placeholder="Ex: 45.2"
                        value={formData.massaMuscular}
                        onChange={(e) => handleInputChange("massaMuscular", e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex flex-col space-y-4 pt-6">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Criando conta..." : "Criar Conta"}
                </Button>
                
                <p className="text-center text-sm text-gray-600">
                  Já tem uma conta?{" "}
                  <Link href="/login" className="text-green-600 hover:underline">
                    Faça login
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
