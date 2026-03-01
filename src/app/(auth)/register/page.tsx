'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TrendingUp, 
  Mail, 
  Lock, 
  User,
  Loader2, 
  ArrowLeft,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Password strength indicators
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (!hasMinLength || !hasUppercase || !hasLowercase || !hasNumber) {
      setErrorMessage('A senha não atende aos requisitos de segurança.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Erro ao criar conta.');
      } else {
        setSuccessMessage('Conta criada com sucesso! Redirecionando para o login...');
        setTimeout(() => {
          router.push('/login?registered=true');
        }, 2000);
      }
    } catch (err) {
      setErrorMessage('Ocorreu um erro ao criar sua conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="p-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para o início</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-slate-900 dark:text-white">
                B3 Dividendos
              </span>
            </Link>
          </div>

          {/* Register Card */}
          <Card className="border-slate-200 dark:border-slate-800 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
              <CardDescription>
                Preencha os dados abaixo para criar sua conta gratuita
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {errorMessage && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}

                {successMessage && (
                  <Alert className="border-green-500 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>{successMessage}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  
                  {/* Password strength indicators */}
                  {password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className={hasMinLength ? 'text-green-500' : 'text-slate-400'}>
                          {hasMinLength ? <CheckCircle2 className="h-3 w-3" /> : '○'} Mínimo 8 caracteres
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={hasUppercase ? 'text-green-500' : 'text-slate-400'}>
                          {hasUppercase ? <CheckCircle2 className="h-3 w-3" /> : '○'} Uma letra maiúscula
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={hasLowercase ? 'text-green-500' : 'text-slate-400'}>
                          {hasLowercase ? <CheckCircle2 className="h-3 w-3" /> : '○'} Uma letra minúscula
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={hasNumber ? 'text-green-500' : 'text-slate-400'}>
                          {hasNumber ? <CheckCircle2 className="h-3 w-3" /> : '○'} Um número
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-red-500">As senhas não coincidem</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    'Criar Conta'
                  )}
                </Button>

                <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                  Já tem uma conta?{' '}
                  <Link
                    href="/login"
                    className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium"
                  >
                    Fazer login
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>

          {/* Info Text */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-500 mt-6">
            Ao criar uma conta, você concorda com nossos{' '}
            <a href="#" className="underline hover:text-teal-600">Termos de Uso</a>
            {' '}e{' '}
            <a href="#" className="underline hover:text-teal-600">Política de Privacidade</a>
          </p>
        </div>
      </main>
    </div>
  );
}
