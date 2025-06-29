
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  type AuthError,
  type ConfirmationResult,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, UserPlus, Loader2, AlertCircle, Smartphone, ShieldCheck, Mail, KeyRound, MessageSquare, User } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const emailLoginSchema = z.object({
  emailLogin: z.string().email({ message: 'Invalid email address.' }),
  passwordLogin: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});
type EmailLoginFormData = z.infer<typeof emailLoginSchema>;

const emailRegisterSchema = z.object({
  fullNameRegister: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  emailRegister: z.string().email({ message: 'Invalid email address.' }),
  passwordRegister: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPasswordRegister: z.string(),
}).refine((data) => data.passwordRegister === data.confirmPasswordRegister, {
  message: "Passwords don't match.",
  path: ['confirmPasswordRegister'],
});
type EmailRegisterFormData = z.infer<typeof emailRegisterSchema>;


export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Phone Auth State
  const [fullNamePhone, setFullNamePhone] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);

  // Email/Password Login Form
  const {
    register: registerEmailLogin,
    handleSubmit: handleEmailLoginSubmit,
    formState: { errors: emailLoginErrors },
  } = useForm<EmailLoginFormData>({
    resolver: zodResolver(emailLoginSchema),
  });

  // Email/Password Register Form
  const {
    register: registerEmailRegister,
    handleSubmit: handleEmailRegisterSubmit,
    formState: { errors: emailRegisterErrors },
  } = useForm<EmailRegisterFormData>({
    resolver: zodResolver(emailRegisterSchema),
  });
  
  // Setup reCAPTCHA verifier
  useEffect(() => {
    if (recaptchaContainerRef.current && !recaptchaVerifier && auth) {
      const verifier = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
        size: 'invisible', 
        callback: (response: any) => {
          console.log("reCAPTCHA solved:", response);
        },
        'expired-callback': () => {
          toast({ variant: "destructive", title: "reCAPTCHA Expired", description: "Please try sending the OTP again." });
          if (recaptchaVerifier && typeof grecaptcha !== 'undefined' && grecaptcha.reset) {
            recaptchaVerifier.render().then(widgetId => {
               if (widgetId !== undefined) grecaptcha.reset(widgetId);
            });
          }
        },
      });
      setRecaptchaVerifier(verifier);
    }
    
    return () => {
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recaptchaContainerRef, toast]); 


  const handleSendOtp = async () => {
    setIsLoading(true);
    setError(null);
    if (!recaptchaVerifier) {
      setError("reCAPTCHA not initialized. Please refresh the page or wait a moment.");
      setIsLoading(false);
      return;
    }
    if (!fullNamePhone.trim() && !isOtpSent) { // Only require full name if OTP is not yet sent (initial registration attempt)
        setError("Full name is required to send OTP for new users.");
        setIsLoading(false);
        return;
    }
    try {
      const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      if (!/^\+[1-9]\d{1,14}$/.test(formattedPhoneNumber)) {
        setError("Invalid phone number format. Please include country code e.g. +254712345678");
        setIsLoading(false);
        return;
      }

      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier);
      setConfirmationResult(confirmation);
      setIsOtpSent(true);
      toast({ title: "OTP Sent", description: `An OTP has been sent to ${formattedPhoneNumber}.` });
    } catch (e) {
      const authError = e as AuthError;
      console.error("Error sending OTP:", authError);
      setError(authError.message || 'Failed to send OTP. Please check the phone number and try again.');
      toast({ variant: "destructive", title: "OTP Send Failed", description: authError.message });
      if (recaptchaVerifier && typeof grecaptcha !== 'undefined' && grecaptcha.reset) {
         recaptchaVerifier.render().then(widgetId => {
           if (widgetId !== undefined) grecaptcha.reset(widgetId);
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    setError(null);
    if (!confirmationResult) {
      setError("No OTP confirmation to verify.");
      setIsLoading(false);
      return;
    }
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      
      // Update profile with full name if it's a new user or display name is not set
      if (user && (!user.displayName || user.displayName !== fullNamePhone) && fullNamePhone.trim()) {
        await updateProfile(user, { displayName: fullNamePhone });
        toast({ title: "Profile Updated", description: "Your full name has been set." });
      }

      toast({ title: "Sign In Successful", description: "Welcome!" });
      router.push('/schedule');
    } catch (e) {
      const authError = e as AuthError;
      setError(authError.message || 'Failed to verify OTP. Please check the code and try again.');
      toast({ variant: "destructive", title: "OTP Verification Failed", description: authError.message });
    } finally {
      setIsLoading(false);
    }
  };
  
  const onEmailLogin: SubmitHandler<EmailLoginFormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, data.emailLogin, data.passwordLogin);
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

  const onEmailRegister: SubmitHandler<EmailRegisterFormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.emailRegister, data.passwordRegister);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: data.fullNameRegister });
      }
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

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({ title: "Google Sign-In Successful", description: "Welcome!" });
      router.push('/schedule');
    } catch (e) {
      const authError = e as AuthError;
      setError(authError.message || 'Failed to sign in with Google. Please try again.');
      toast({ variant: "destructive", title: "Google Sign-In Failed", description: authError.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionContainer>
      <SectionTitle subtitle="Access Your Account or Get Started">
        Sign In / Register
      </SectionTitle>
      <div className="flex flex-col items-center gap-8">
        {/* Email/Password Card */}
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-primary flex items-center">
                <Mail className="mr-2 h-6 w-6" /> Sign In or Register with Email
            </CardTitle>
            <CardDescription>Use your email and password to login or create an account.</CardDescription>
          </CardHeader>
          <Tabs defaultValue="email-login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email-login"><LogIn className="mr-2 h-4 w-4" />Login</TabsTrigger>
              <TabsTrigger value="email-register"><UserPlus className="mr-2 h-4 w-4" />Register</TabsTrigger>
            </TabsList>
            <TabsContent value="email-login">
              <form onSubmit={handleEmailLoginSubmit(onEmailLogin)}>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-1">
                    <Label htmlFor="email-login">Email</Label>
                    <Input id="email-login" type="email" placeholder="you@example.com" {...registerEmailLogin('emailLogin')} />
                    {emailLoginErrors.emailLogin && <p className="text-sm text-destructive">{emailLoginErrors.emailLogin.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password-login">Password</Label>
                    <Input id="password-login" type="password" placeholder="••••••••" {...registerEmailLogin('passwordLogin')} />
                    {emailLoginErrors.passwordLogin && <p className="text-sm text-destructive">{emailLoginErrors.passwordLogin.message}</p>}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
                    Login with Email
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            <TabsContent value="email-register">
                <form onSubmit={handleEmailRegisterSubmit(onEmailRegister)}>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-1">
                      <Label htmlFor="name-register">Full Name</Label>
                      <Input id="name-register" placeholder="John Doe" {...registerEmailRegister('fullNameRegister')} />
                      {emailRegisterErrors.fullNameRegister && <p className="text-sm text-destructive">{emailRegisterErrors.fullNameRegister.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email-register">Email</Label>
                      <Input id="email-register" type="email" placeholder="you@example.com" {...registerEmailRegister('emailRegister')} />
                      {emailRegisterErrors.emailRegister && <p className="text-sm text-destructive">{emailRegisterErrors.emailRegister.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="password-register">Password</Label>
                      <Input id="password-register" type="password" placeholder="Choose a strong password" {...registerEmailRegister('passwordRegister')} />
                      {emailRegisterErrors.passwordRegister && <p className="text-sm text-destructive">{emailRegisterErrors.passwordRegister.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="confirm-password-register">Confirm Password</Label>
                      <Input id="confirm-password-register" type="password" placeholder="Re-enter your password" {...registerEmailRegister('confirmPasswordRegister')} />
                      {emailRegisterErrors.confirmPasswordRegister && <p className="text-sm text-destructive">{emailRegisterErrors.confirmPasswordRegister.message}</p>}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                      Register with Email
                    </Button>
                  </CardFooter>
                </form>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="w-full max-w-md text-center">
          <Separator className="my-4" />
          <p className="text-sm text-muted-foreground">Or use other methods</p>
        </div>

        {/* Google Sign-In Button */}
        <Button onClick={handleGoogleSignIn} variant="outline" className="w-full max-w-md" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
          }
          Sign in with Google
        </Button>

        {/* Phone Authentication Accordion */}
        <Accordion type="single" collapsible className="w-full max-w-md">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-base hover:no-underline">
                    <div className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-muted-foreground"/> Sign in or Register with Phone
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <Card className="border-none shadow-none">
                        <CardHeader>
                            <CardDescription>Enter your full name and phone number to receive an OTP.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            {!isOtpSent ? (
                            <>
                                <div className="space-y-1">
                                <Label htmlFor="fullNamePhone">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input 
                                    id="fullNamePhone" 
                                    type="text" 
                                    placeholder="e.g. Jane Doe" 
                                    value={fullNamePhone}
                                    onChange={(e) => setFullNamePhone(e.target.value)}
                                    disabled={isLoading}
                                    className="pl-10"
                                    />
                                </div>
                                </div>
                                <div className="space-y-1">
                                <Label htmlFor="phone">Phone Number (e.g. +254712345678)</Label>
                                <Input 
                                    id="phone" 
                                    type="tel" 
                                    placeholder="e.g. +254712345678" 
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    disabled={isLoading}
                                />
                                </div>
                            </>
                            ) : (
                            <div className="space-y-1">
                                <Label htmlFor="otp">Enter OTP</Label>
                                <Input 
                                id="otp" 
                                type="text" 
                                placeholder="Enter 6-digit OTP" 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                                disabled={isLoading}
                                />
                            </div>
                            )}
                            <div ref={recaptchaContainerRef} id="recaptcha-container"></div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            {!isOtpSent ? (
                            <Button onClick={handleSendOtp} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading || !phoneNumber.trim() || !fullNamePhone.trim()}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MessageSquare className="mr-2 h-4 w-4" />}
                                Send OTP
                            </Button>
                            ) : (
                            <Button onClick={handleVerifyOtp} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading || !otp.trim() || otp.length !== 6}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
                                Verify OTP & Sign In
                            </Button>
                            )}
                        </CardFooter>
                    </Card>
                </AccordionContent>
            </AccordionItem>
        </Accordion>


        {/* General Error Display */}
        {error && (
          <Alert variant="destructive" className="w-full max-w-md mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </SectionContainer>
  );
}
