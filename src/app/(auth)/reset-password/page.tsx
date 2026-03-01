'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TrendingUp, 
  Lock,
  Loader2, 
  ArrowLeft,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  KeyRound,
} from 'lucide-react';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Password strength indicators
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidating(false);
        setErrorMessage('Token não fornecido. Solicite uma nova recuperação de senha.');
        return;
      }

      try {
        const response = await fetch(`/api/auth/reset-password?token=${token}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setIsValidToken(true);
          setMaskedEmail(data.email);
        } else {
          setErrorMessage(data.error || 'Token inválido ou expirado.');
        }
      } catch (err) {
        setErrorMessage('Erro ao validar token. Tente novamente.');
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

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
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Erro ao redefinir senha.');
      } else {
        setSuccessMessage(data.message);
        setTimeout(() => {
          router.push('/login?reset=true');
        }, 3000);
      }
    } catch (err) {
      setErrorMessage('Ocorreu um erro ao redefinir sua senha. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <header className="p-4">
          <div className="max-w-7xl mx-auto">
            <Link href="/login" className="inline-flex items-center gap-2 text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar para o login</span>
            </Link>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
        </main>
      </div>
    );
  }

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

          {/* Reset Password Card */}
          <Card className="border-slate-200 dark:border-slate-800 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                  <KeyRound className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Redefinir Senha</CardTitle>
              <CardDescription>
                {isValidToken 
                  ? `Crie uma nova senha para ${maskedEmail}`
                  : 'Redefina sua senha de acesso'}
              </CardDescription>
            </CardHeader>

            {isValidToken ? (
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
                    <Label htmlFor="password">Nova senha</Label>
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
                        disabled={isLoading || !!successMessage}
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
                    <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
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
                        disabled={isLoading || !!successMessage}
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
                    disabled={isLoading || !!successMessage}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Redefinindo...
                      </>
                    ) : (
                      'Redefinir Senha'
                    )}
                  </Button>
                </CardFooter>
              </form>
            ) : (
              <CardContent className="space-y-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
                <div className="flex flex-col gap-2">
                  <Link href="/forgot-password">
                    <Button className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700">
                      Solicitar nova recuperação
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" className="w-full">
                      Voltar para o login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
