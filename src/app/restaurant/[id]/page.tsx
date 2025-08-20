"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface MenuItem {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  categoria: string;
  objetivo: "emagrecimento" | "ganho_massa" | "ambos";
}

interface Restaurant {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  objetivo: "emagrecimento" | "ganho_massa" | "ambos";
  avaliacao: number;
  tempoEntrega: string;
  taxaEntrega: number;
  especialidades: string[];
  endereco: string;
  telefone: string;
  horarioFuncionamento: string;
  menu: MenuItem[];
}

const mockRestaurantData: Record<string, Restaurant> = {
  "1": {
    id: "1",
    nome: "Fit Gourmet",
    descricao: "Especializada em pratos low carb e proteínas magras",
    categoria: "Comida Saudável",
    objetivo: "emagrecimento",
    avaliacao: 4.8,
    tempoEntrega: "25-35 min",
    taxaEntrega: 3.99,
    especialidades: ["Low Carb", "Proteínas", "Saladas"],
    endereco: "Rua das Flores, 123 - Centro",
    telefone: "(11) 99999-9999",
    horarioFuncionamento: "Segunda a Domingo: 11h às 22h",
    menu: [
      {
        id: "1",
        nome: "Salmão Grelhado com Legumes",
        descricao: "Filé de salmão grelhado acompanhado de brócolis, abobrinha e aspargos no vapor",
        preco: 32.90,
        calorias: 380,
        proteinas: 35,
        carboidratos: 8,
        gorduras: 22,
        categoria: "Pratos Principais",
        objetivo: "emagrecimento"
      },
      {
        id: "2",
        nome: "Salada Caesar Fit",
        descricao: "Mix de folhas verdes, frango grelhado, tomate cereja e molho caesar light",
        preco: 24.90,
        calorias: 280,
        proteinas: 28,
        carboidratos: 12,
        gorduras: 15,
        categoria: "Saladas",
        objetivo: "emagrecimento"
      },
      {
        id: "3",
        nome: "Bowl de Quinoa",
        descricao: "Quinoa, grão de bico, abacate, tomate e molho tahine",
        preco: 26.90,
        calorias: 420,
        proteinas: 18,
        carboidratos: 45,
        gorduras: 20,
        categoria: "Bowls",
        objetivo: "ambos"
      }
    ]
  },
  "2": {
    id: "2",
    nome: "Muscle Food",
    descricao: "Refeições ricas em proteína para ganho de massa",
    categoria: "Alta Proteína",
    objetivo: "ganho_massa",
    avaliacao: 4.7,
    tempoEntrega: "30-40 min",
    taxaEntrega: 4.50,
    especialidades: ["Whey Protein", "Carnes", "Carboidratos"],
    endereco: "Av. Paulista, 456 - Bela Vista",
    telefone: "(11) 88888-8888",
    horarioFuncionamento: "Segunda a Sábado: 10h às 23h",
    menu: [
      {
        id: "4",
        nome: "Frango com Batata Doce",
        descricao: "Peito de frango grelhado (200g) com batata doce assada e salada verde",
        preco: 28.90,
        calorias: 520,
        proteinas: 45,
        carboidratos: 35,
        gorduras: 18,
        categoria: "Pratos Principais",
        objetivo: "ganho_massa"
      },
      {
        id: "5",
        nome: "Shake Proteico Massa",
        descricao: "Whey protein, banana, aveia, pasta de amendoim e leite",
        preco: 18.90,
        calorias: 380,
        proteinas: 30,
        carboidratos: 28,
        gorduras: 16,
        categoria: "Bebidas",
        objetivo: "ganho_massa"
      }
    ]
  }
};

export default function RestaurantDetails() {
  const params = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [user, setUser] = useState<any>(null);
  const [cart, setCart] = useState<Record<string, number>>({});

  useEffect(() => {
    const restaurantId = params.id as string;
    const restaurantData = mockRestaurantData[restaurantId];
    
    if (restaurantData) {
      setRestaurant(restaurantData);
    }

    // Load user data
    const userData = localStorage.getItem("fitfood_user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [params.id]);

  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    if (!restaurant) return 0;
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = restaurant.menu.find(m => m.id === itemId);
      return total + (item ? item.preco * quantity : 0);
    }, 0);
  };

  const getObjectiveText = (objetivo: string) => {
    switch (objetivo) {
      case "emagrecimento": return "Emagrecimento";
      case "ganho_massa": return "Ganho de Massa";
      default: return "Ambos";
    }
  };

  const getObjectiveBadgeColor = (objetivo: string) => {
    switch (objetivo) {
      case "emagrecimento": return "bg-blue-100 text-blue-800";
      case "ganho_massa": return "bg-green-100 text-green-800";
      default: return "bg-purple-100 text-purple-800";
    }
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Restaurante não encontrado
          </h1>
          <Link href="/dashboard">
            <Button>Voltar ao Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const menuCategories = [...new Set(restaurant.menu.map(item => item.categoria))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              FitFood
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline">← Voltar</Button>
              </Link>
              {user && (
                <span className="text-gray-600">Olá, {user.nome.split(' ')[0]}!</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Restaurant Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {restaurant.nome}
                  </h1>
                  <p className="text-gray-600 mb-4">{restaurant.descricao}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className={getObjectiveBadgeColor(restaurant.objetivo)}>
                      {getObjectiveText(restaurant.objetivo)}
                    </Badge>
                    {restaurant.especialidades.map((especialidade, index) => (
                      <Badge key={index} variant="secondary">
                        {especialidade}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Avaliação</p>
                  <p className="font-semibold">⭐ {restaurant.avaliacao}</p>
                </div>
                <div>
                  <p className="text-gray-600">Tempo de entrega</p>
                  <p className="font-semibold">{restaurant.tempoEntrega}</p>
                </div>
                <div>
                  <p className="text-gray-600">Taxa de entrega</p>
                  <p className="font-semibold">R$ {restaurant.taxaEntrega.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <img 
                src={`https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d21b86cb-7321-4493-9e3f-b31ab9e6014d.png)}+Restaurant+Food+Display`}
                alt={`Pratos especiais do restaurante ${restaurant.nome} com apresentação moderna e saudável`}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cardápio</CardTitle>
                <CardDescription>
                  Pratos selecionados para seu objetivo fitness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={menuCategories[0]} className="w-full">
                  <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
                    {menuCategories.map((category) => (
                      <TabsTrigger key={category} value={category}>
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {menuCategories.map((category) => (
                    <TabsContent key={category} value={category} className="space-y-4">
                      {restaurant.menu
                        .filter(item => item.categoria === category)
                        .map((item) => (
                          <div key={item.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">{item.nome}</h3>
                                <p className="text-gray-600 text-sm mb-2">{item.descricao}</p>
                                
                                <div className="grid grid-cols-4 gap-2 text-xs text-gray-500 mb-2">
                                  <div>
                                    <span className="font-medium">{item.calorias}</span>
                                    <br />kcal
                                  </div>
                                  <div>
                                    <span className="font-medium">{item.proteinas}g</span>
                                    <br />proteína
                                  </div>
                                  <div>
                                    <span className="font-medium">{item.carboidratos}g</span>
                                    <br />carbo
                                  </div>
                                  <div>
                                    <span className="font-medium">{item.gorduras}g</span>
                                    <br />gordura
                                  </div>
                                </div>
                                
                                <Badge className={getObjectiveBadgeColor(item.objetivo)} variant="secondary">
                                  {getObjectiveText(item.objetivo)}
                                </Badge>
                              </div>
                              
                              <div className="text-right ml-4">
                                <p className="text-lg font-bold text-green-600 mb-2">
                                  R$ {item.preco.toFixed(2)}
                                </p>
                                
                                {cart[item.id] ? (
                                  <div className="flex items-center space-x-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      -
                                    </Button>
                                    <span className="font-medium">{cart[item.id]}</span>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => addToCart(item.id)}
                                    >
                                      +
                                    </Button>
                                  </div>
                                ) : (
                                  <Button 
                                    size="sm"
                                    onClick={() => addToCart(item.id)}
                                  >
                                    Adicionar
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cart */}
            {Object.keys(cart).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Seu Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(cart).map(([itemId, quantity]) => {
                      const item = restaurant.menu.find(m => m.id === itemId);
                      if (!item) return null;
                      
                      return (
                        <div key={itemId} className="flex justify-between items-center">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.nome}</p>
                            <p className="text-xs text-gray-500">
                              {quantity}x R$ {item.preco.toFixed(2)}
                            </p>
                          </div>
                          <p className="font-semibold">
                            R$ {(item.preco * quantity).toFixed(2)}
                          </p>
                        </div>
                      );
                    })}
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <span>Subtotal:</span>
                      <span className="font-semibold">R$ {getCartTotal().toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Taxa de entrega:</span>
                      <span>R$ {restaurant.taxaEntrega.toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span>R$ {(getCartTotal() + restaurant.taxaEntrega).toFixed(2)}</span>
                    </div>
                    
                    <Button className="w-full mt-4">
                      Finalizar Pedido
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Restaurant Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Endereço</p>
                  <p className="font-medium">{restaurant.endereco}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Telefone</p>
                  <p className="font-medium">{restaurant.telefone}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Horário de funcionamento</p>
                  <p className="font-medium">{restaurant.horarioFuncionamento}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
