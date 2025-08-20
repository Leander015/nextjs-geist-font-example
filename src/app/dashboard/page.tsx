"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
}

const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    nome: "Fit Gourmet",
    descricao: "Especializada em pratos low carb e proteínas magras",
    categoria: "Comida Saudável",
    objetivo: "emagrecimento",
    avaliacao: 4.8,
    tempoEntrega: "25-35 min",
    taxaEntrega: 3.99,
    especialidades: ["Low Carb", "Proteínas", "Saladas"]
  },
  {
    id: "2",
    nome: "Muscle Food",
    descricao: "Refeições ricas em proteína para ganho de massa",
    categoria: "Alta Proteína",
    objetivo: "ganho_massa",
    avaliacao: 4.7,
    tempoEntrega: "30-40 min",
    taxaEntrega: 4.50,
    especialidades: ["Whey Protein", "Carnes", "Carboidratos"]
  },
  {
    id: "3",
    nome: "Green Life",
    descricao: "Opções veganas e vegetarianas nutritivas",
    categoria: "Vegano/Vegetariano",
    objetivo: "ambos",
    avaliacao: 4.6,
    tempoEntrega: "20-30 min",
    taxaEntrega: 2.99,
    especialidades: ["Vegano", "Orgânico", "Superfoods"]
  },
  {
    id: "4",
    nome: "Lean Kitchen",
    descricao: "Marmitas fitness balanceadas e saborosas",
    categoria: "Marmitas Fit",
    objetivo: "emagrecimento",
    avaliacao: 4.9,
    tempoEntrega: "35-45 min",
    taxaEntrega: 5.00,
    especialidades: ["Marmitas", "Balanceadas", "Porções Controladas"]
  },
  {
    id: "5",
    nome: "Power Meals",
    descricao: "Refeições completas para atletas e praticantes de musculação",
    categoria: "Esportiva",
    objetivo: "ganho_massa",
    avaliacao: 4.8,
    tempoEntrega: "40-50 min",
    taxaEntrega: 6.00,
    especialidades: ["Atletas", "Alto Valor Calórico", "Suplementos"]
  },
  {
    id: "6",
    nome: "Balance Bistro",
    descricao: "Cardápio variado para todos os objetivos fitness",
    categoria: "Variada",
    objetivo: "ambos",
    avaliacao: 4.5,
    tempoEntrega: "25-35 min",
    taxaEntrega: 3.50,
    especialidades: ["Variado", "Personalizado", "Flexível"]
  }
];

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("todos");

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem("fitfood_user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Filter restaurants based on user objective
      const userObjective = parsedUser.objetivo;
      const filtered = mockRestaurants.filter(restaurant => 
        restaurant.objetivo === userObjective || restaurant.objetivo === "ambos"
      );
      setRestaurants(filtered);
      setFilteredRestaurants(filtered);
    } else {
      // If no user data, show all restaurants
      setRestaurants(mockRestaurants);
      setFilteredRestaurants(mockRestaurants);
    }
  }, []);

  useEffect(() => {
    let filtered = restaurants;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(restaurant =>
        restaurant.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.especialidades.some(esp => 
          esp.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by category
    if (filterCategory !== "todos") {
      filtered = filtered.filter(restaurant =>
        restaurant.categoria.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    setFilteredRestaurants(filtered);
  }, [searchTerm, filterCategory, restaurants]);

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
              {user && (
                <span className="text-gray-600">Olá, {user.nome.split(' ')[0]}!</span>
              )}
              <Button variant="outline" onClick={() => {
                localStorage.removeItem("fitfood_user");
                window.location.href = "/";
              }}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info Card */}
        {user && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Seu Perfil Fitness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">IMC</p>
                  <p className="text-lg font-semibold">{user.imc}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Objetivo</p>
                  <Badge className={getObjectiveBadgeColor(user.objetivo)}>
                    {getObjectiveText(user.objetivo)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Peso</p>
                  <p className="text-lg font-semibold">{user.peso} kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Altura</p>
                  <p className="text-lg font-semibold">{user.altura} m</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Restaurantes Fitness
            {user && (
              <span className="text-lg font-normal text-gray-600 ml-2">
                • Recomendados para {getObjectiveText(user.objetivo).toLowerCase()}
              </span>
            )}
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar restaurantes, pratos ou especialidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as categorias</SelectItem>
                <SelectItem value="comida saudável">Comida Saudável</SelectItem>
                <SelectItem value="alta proteína">Alta Proteína</SelectItem>
                <SelectItem value="vegano/vegetariano">Vegano/Vegetariano</SelectItem>
                <SelectItem value="marmitas fit">Marmitas Fit</SelectItem>
                <SelectItem value="esportiva">Esportiva</SelectItem>
                <SelectItem value="variada">Variada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="relative mb-4">
                  <img 
                    src={`https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b41c8931-b566-4bb7-8ede-19614b25b202.png)}+Restaurant+Interior+Modern+Design`}
                    alt={`Interior moderno do restaurante ${restaurant.nome} com ambiente clean e saudável`}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <Badge 
                    className={`absolute top-2 right-2 ${getObjectiveBadgeColor(restaurant.objetivo)}`}
                  >
                    {getObjectiveText(restaurant.objetivo)}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{restaurant.nome}</CardTitle>
                <CardDescription>{restaurant.descricao}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      ⭐ {restaurant.avaliacao}
                    </span>
                    <span>{restaurant.tempoEntrega}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {restaurant.especialidades.map((especialidade, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {especialidade}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-600">
                      Entrega: R$ {restaurant.taxaEntrega.toFixed(2)}
                    </span>
                    <Link href={`/restaurant/${restaurant.id}`}>
                      <Button size="sm">Ver Cardápio</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum restaurante encontrado com os filtros aplicados.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("todos");
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
