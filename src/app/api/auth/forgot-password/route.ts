import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserByEmail, generateResetToken } from '@/lib/auth/utils';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = forgotPasswordSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Email inválido' },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // Check if user exists (but don't reveal this to the user)
    const user = await getUserByEmail(email);
    
    if (user) {
      // Generate reset token
      const { token } = await generateResetToken(email);
      
      // In production, send email with reset link
      // For now, we'll log it and return it for testing
      console.log(`Password reset token for ${email}: ${token}`);
      console.log(`Reset URL: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${token}`);
      
      // In development, return the token for testing
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({
          success: true,
          message: 'Instruções de recuperação enviadas para seu email',
          // Only in development
          _dev_token: token,
          _dev_url: `/reset-password?token=${token}`,
        });
      }
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({
      success: true,
      message: 'Se o email existir em nossa base, você receberá instruções para redefinir sua senha.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao processar solicitação. Tente novamente.' },
      { status: 500 }
    );
  }
}
