
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type AuthError
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn, UserPlus, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});
type LoginFormData = z.infer<typeof loginSchema>;

const registerSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ['confirmPassword'],
});
type RegisterFormData = z.infer<typeof registerSchema>;


export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegister,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({ title: "Login Successful", description: "Welcome back!" });
      router.push('/schedule'); 
    } catch (e) {
      const authError = e as AuthError;
      setError(authError.message || 'Failed to login. Please check your credentials.');
      toast({ variant: "destructive", title: "Login Failed", description: authError.message || 'Please check your credentials.' });
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister: SubmitHandler<RegisterFormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      // Optionally update profile with fullName here if needed
      toast({ title: "Registration Successful", description: "Your account has been created." });
      router.push('/schedule'); 
    } catch (e) {
      const authError = e as AuthError;
      setError(authError.message || 'Failed to register. Please try again.');
      toast({ variant: "destructive", title: "Registration Failed", description: authError.message || 'An error occurred during registration.' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as 'login' | 'register');
    setError(null); // Clear errors when switching tabs
    resetLogin();
    resetRegister();
  };


  return (
    <SectionContainer>
      <SectionTitle subtitle="Access Your Account or Get Started">
        Login or Register
      </SectionTitle>
      <div className="flex justify-center">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </TabsTrigger>
            <TabsTrigger value="register">
              <UserPlus className="mr-2 h-4 w-4" /> Register
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary">Welcome Back!</CardTitle>
                <CardDescription>Enter your credentials to access your account.</CardDescription>
              </CardHeader>
              <form onSubmit={handleLoginSubmit(onLogin)}>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="email-login">Email</Label>
                    <Input id="email-login" type="email" placeholder="you@example.com" {...registerLogin('email')} />
                    {loginErrors.email && <p className="text-sm text-destructive">{loginErrors.email.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password-login">Password</Label>
                    <Input id="password-login" type="password" placeholder="••••••••" {...registerLogin('password')} />
                    {loginErrors.password && <p className="text-sm text-destructive">{loginErrors.password.message}</p>}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  {error && activeTab === 'login' && (
                    <Alert variant="destructive" className="w-full">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Login Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
                    Login
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary">Create Account</CardTitle>
                <CardDescription>Join Dropbox Draughtsman to access exclusive content and services.</CardDescription>
              </CardHeader>
              <form onSubmit={handleRegisterSubmit(onRegister)}>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="name-register">Full Name</Label>
                    <Input id="name-register" placeholder="John Doe" {...registerRegister('fullName')} />
                    {registerErrors.fullName && <p className="text-sm text-destructive">{registerErrors.fullName.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email-register">Email</Label>
                    <Input id="email-register" type="email" placeholder="you@example.com" {...registerRegister('email')} />
                    {registerErrors.email && <p className="text-sm text-destructive">{registerErrors.email.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password-register">Password</Label>
                    <Input id="password-register" type="password" placeholder="Choose a strong password" {...registerRegister('password')} />
                    {registerErrors.password && <p className="text-sm text-destructive">{registerErrors.password.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirm-password-register">Confirm Password</Label>
                    <Input id="confirm-password-register" type="password" placeholder="Re-enter your password" {...registerRegister('confirmPassword')} />
                    {registerErrors.confirmPassword && <p className="text-sm text-destructive">{registerErrors.confirmPassword.message}</p>}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                   {error && activeTab === 'register' && (
                    <Alert variant="destructive" className="w-full">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Registration Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                    Register
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SectionContainer>
  );
}
