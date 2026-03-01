'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TrendingUp, 
  Mail,
  Loader2, 
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  KeyRound,
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resetUrl, setResetUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    setResetUrl(null);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Erro ao processar solicitação.');
      } else {
        setSuccessMessage(data.message);
        // In development, show the reset URL
        if (data._dev_url) {
          setResetUrl(data._dev_url);
        }
      }
    } catch (err) {
      setErrorMessage('Ocorreu um erro ao processar sua solicitação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="p-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/login" className="inline-flex items-center gap-2 text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para o login</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
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

          {/* Forgot Password Card */}
          <Card className="border-slate-200 dark:border-slate-800 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <KeyRound className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Esqueceu a senha?</CardTitle>
              <CardDescription>
                Digite seu email para receber instruções de como redefinir sua senha
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

                {resetUrl && (
                  <Alert className="border-blue-500 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400">
                    <AlertDescription>
                      <p className="font-medium mb-2">Link de recuperação (dev):</p>
                      <Link 
                        href={resetUrl} 
                        className="underline text-teal-600 hover:text-teal-700 break-all"
                      >
                        {resetUrl}
                      </Link>
                    </AlertDescription>
                  </Alert>
                )}

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
                      Enviando...
                    </>
                  ) : (
                    'Enviar instruções'
                  )}
                </Button>

                <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                  Lembrou sua senha?{' '}
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
            Se o email existir em nossa base, você receberá um link para redefinir sua senha.
            O link expira em 1 hora.
          </p>
        </div>
      </main>
    </div>
  );
}
