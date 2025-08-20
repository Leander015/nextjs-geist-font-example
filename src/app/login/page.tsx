"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    if (!formData.senha.trim()) newErrors.senha = "Senha é obrigatória";
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
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
      
      // Check if user exists in localStorage (for demo purposes)
      const userData = localStorage.getItem("fitfood_user");
      if (userData) {
        const user = JSON.parse(userData);
        if (user.email === formData.email) {
          // Successful login
          window.location.href = "/dashboard";
          return;
        }
      }
      
      // If no user found, show error
      setErrors({ email: "Email ou senha incorretos" });
    } catch (error) {
      console.error("Erro no login:", error);
      setErrors({ email: "Erro interno. Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-gray-900">
            FitFood
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Faça login na sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{" "}
            <Link href="/register" className="font-medium text-green-600 hover:text-green-500">
              crie uma nova conta
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>
              Digite suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  autoComplete="current-password"
                  value={formData.senha}
                  onChange={(e) => handleInputChange("senha", e.target.value)}
                  className={errors.senha ? "border-red-500" : ""}
                  placeholder="Sua senha"
                />
                {errors.senha && (
                  <p className="text-sm text-red-500 mt-1">{errors.senha}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link href="#" className="font-medium text-green-600 hover:text-green-500">
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            {/* Demo Info */}
            <Alert className="mt-6">
              <AlertDescription>
                <strong>Demo:</strong> Para testar, primeiro crie uma conta na página de registro.
                O login funcionará com o email cadastrado.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Quick Access for Demo */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Acesso rápido para demonstração:
          </p>
          <div className="space-y-2">
            <Link href="/dashboard">
              <Button variant="outline" className="w-full">
                Ver Dashboard (sem login)
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
