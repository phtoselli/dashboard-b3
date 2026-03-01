import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUser, getUserByEmail, validateEmail, validatePassword } from '@/lib/auth/utils';

const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Dados inválidos',
          details: validationResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const { name, email, password } = validationResult.data;

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Email inválido' },
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

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Este email já está cadastrado' },
        { status: 400 }
      );
    }

    // Create user
    const user = await createUser({
      name,
      email,
      password,
    });

    return NextResponse.json({
      success: true,
      message: 'Conta criada com sucesso!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao criar conta. Tente novamente.' },
      { status: 500 }
    );
  }
}
