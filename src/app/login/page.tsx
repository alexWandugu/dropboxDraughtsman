
import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn, UserPlus } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login or Register - Dropbox Draughtsman',
  description: 'Access your Dropbox Draughtsman account or create a new one to schedule sessions and manage your profile.',
};

export default function LoginPage() {
  // In a real application, these would be interactive forms handled by client components
  // and would interact with an authentication backend (e.g., Firebase Auth).

  return (
    <SectionContainer>
      <SectionTitle subtitle="Access Your Account or Get Started">
        Login or Register
      </SectionTitle>
      <div className="flex justify-center">
        <Tabs defaultValue="login" className="w-full max-w-md">
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
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input id="email-login" type="email" placeholder="you@example.com" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login">Password</Label>
                  <Input id="password-login" type="password" placeholder="••••••••" disabled />
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled>
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Forgot your password? {/* Link to password reset page (to be created) */}
                  <Button variant="link" className="p-1" disabled>Reset here</Button>
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary">Create Account</CardTitle>
                <CardDescription>Join Dropbox Draughtsman to access exclusive content and services.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-register">Full Name</Label>
                  <Input id="name-register" placeholder="John Doe" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-register">Email</Label>
                  <Input id="email-register" type="email" placeholder="you@example.com" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-register">Password</Label>
                  <Input id="password-register" type="password" placeholder="Choose a strong password" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password-register">Confirm Password</Label>
                  <Input id="confirm-password-register" type="password" placeholder="Re-enter your password" disabled />
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled>
                  <UserPlus className="mr-2 h-4 w-4" /> Register
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Note: This is a placeholder page. Actual login/registration functionality with Firebase Auth needs to be implemented.
      </p>
    </SectionContainer>
  );
}
