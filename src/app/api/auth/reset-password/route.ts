import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyResetToken, resetPassword, validatePassword } from '@/lib/auth/utils';

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  confirmPassword: z.string().min(8, 'Confirmação de senha é obrigatória'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = resetPasswordSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Dados inválidos' },
        { status: 400 }
      );
    }

    const { token, password, confirmPassword } = validationResult.data;

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'As senhas não coincidem' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { success: false, error: passwordValidation.errors.join(', ') },
        { status: 400 }
      );
    }

    // Verify token
    const verificationToken = await verifyResetToken(token);
    if (!verificationToken) {
      return NextResponse.json(
        { success: false, error: 'Token inválido ou expirado. Solicite uma nova recuperação de senha.' },
        { status: 400 }
      );
    }

    // Reset password
    await resetPassword(verificationToken.identifier, password);

    return NextResponse.json({
      success: true,
      message: 'Senha redefinida com sucesso! Você já pode fazer login com sua nova senha.',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao redefinir senha. Tente novamente.' },
      { status: 500 }
    );
  }
}

// Verify token endpoint
export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token não fornecido' },
        { status: 400 }
      );
    }

    const verificationToken = await verifyResetToken(token);
    
    if (!verificationToken) {
      return NextResponse.json(
        { success: false, error: 'Token inválido ou expirado' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      email: verificationToken.identifier.replace(/(.{2})(.*)(@.*)/, '$1***$3'), // Masked email
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao verificar token' },
      { status: 500 }
    );
  }
}
