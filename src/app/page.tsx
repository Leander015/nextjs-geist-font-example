"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">FitFood</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link href="/register">
                <Button>Cadastrar</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Bem-vindo ao <span className="text-green-600">FitFood</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                O primeiro app de delivery focado exclusivamente em alimentação fitness. 
                Encontre restaurantes e fornecedores especializados em comidas saudáveis 
                para seus objetivos de emagrecimento ou ganho de massa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Começar Agora
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Ver Restaurantes
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/236acc38-1f93-41a8-aef4-eeaba5cdeb66.png" 
                alt="Aplicativo de comida fitness mostrando pratos saudáveis e design moderno com cores vibrantes"
                className="rounded-lg shadow-2xl w-full h-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher o FitFood?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Desenvolvido especialmente para quem leva a alimentação fitness a sério
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">IMC</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Teste de IMC Integrado
              </h4>
              <p className="text-gray-600">
                Calcule seu IMC durante o cadastro e receba recomendações personalizadas
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">🎯</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Objetivos Personalizados
              </h4>
              <p className="text-gray-600">
                Defina se seu foco é emagrecimento ou ganho de massa e veja apenas o que importa
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">📊</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Bioimpedância Opcional
              </h4>
              <p className="text-gray-600">
                Para uma análise ainda mais precisa, adicione dados de bioimpedância
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Pronto para transformar sua alimentação?
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Cadastre-se agora e descubra restaurantes fitness na sua região
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Criar Conta Grátis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 FitFood. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
