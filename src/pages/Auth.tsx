import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigationWithLoading } from '@/hooks/useNavigationWithLoading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, UserPlus, LogIn, Mail, Lock, User } from 'lucide-react';
import PremiumLoadingScreen from '@/components/PremiumLoadingScreen';

const Auth = () => {
  const { signIn, signUp } = useAuth();
  const { navigateWithLoading, isNavigating, targetSection } = useNavigationWithLoading();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await signIn(signInData.email, signInData.password);
    
    if (error) {
      setError(error.message);
    } else {
      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully.",
      });
      navigateWithLoading('/dashboard', 'Dashboard');
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const { error } = await signUp(
      signUpData.email, 
      signUpData.password, 
      signUpData.firstName, 
      signUpData.lastName
    );
    
    if (error) {
      setError(error.message);
    } else {
      toast({
        title: "Welcome to O.A.S.I.S. MEDICALS!",
        description: "Your account has been created successfully. Redirecting to your dashboard...",
      });
      // Redirect to dashboard after successful signup
      setTimeout(() => {
        navigateWithLoading('/dashboard', 'Dashboard');
      }, 1000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-cyan/10 via-background to-medical-magenta/10 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-medical-cyan/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-medical-magenta/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigateWithLoading('/', 'Home')}
          className="mb-6 group hover:bg-medical-cyan/10 transition-all duration-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Website
        </Button>

        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="relative inline-block mb-6">
            <div className="relative overflow-hidden rounded-full p-2">
              <img 
                src="/lovable-uploads/fc70eb34-882e-4a20-9da3-39a20773fb7c.png" 
                alt="O.A.S.I.S MEDICALS" 
                className="h-20 mx-auto animate-premium-spin filter drop-shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent animate-premium-shimmer"></div>
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-medical-cyan/20 to-medical-magenta/20 rounded-full blur-xl opacity-60 animate-premium-glow"></div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2 bg-gradient-to-r from-medical-cyan to-medical-magenta bg-clip-text text-transparent">
            Patient Portal
          </h1>
          <p className="text-muted-foreground text-lg">Access your medical records securely</p>
        </div>

        {/* Main Card */}
        <Card className="backdrop-blur-sm bg-card/80 border-2 border-medical-cyan/20 shadow-2xl animate-scale-in">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold text-foreground">Welcome Back</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Sign in to your account or create a new one to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 backdrop-blur-sm">
                <TabsTrigger value="signin" className="flex items-center gap-2 data-[state=active]:bg-medical-cyan/10 data-[state=active]:text-medical-cyan">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="flex items-center gap-2 data-[state=active]:bg-medical-magenta/10 data-[state=active]:text-medical-magenta">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-6 animate-fade-in">
                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-medical-cyan" />
                      Email Address
                    </Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      className="h-12 bg-background/50 border-medical-cyan/30 focus:border-medical-cyan transition-colors duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-sm font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 text-medical-cyan" />
                      Password
                    </Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      className="h-12 bg-background/50 border-medical-cyan/30 focus:border-medical-cyan transition-colors duration-300"
                      required
                    />
                  </div>
                  {error && (
                    <Alert variant="destructive" className="animate-fade-in border-destructive/50 bg-destructive/10">
                      <AlertDescription className="text-sm">{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-medical-cyan to-medical-cyan/80 hover:from-medical-cyan/90 hover:to-medical-cyan/70 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]" 
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <img 
                          src="/lovable-uploads/fc70eb34-882e-4a20-9da3-39a20773fb7c.png" 
                          alt="Loading" 
                          className="w-4 h-4 animate-premium-spin"
                        />
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <LogIn className="h-4 w-4" />
                        Sign In to Portal
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-6 animate-fade-in">
                <form onSubmit={handleSignUp} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-firstname" className="text-sm font-medium flex items-center gap-2">
                        <User className="h-4 w-4 text-medical-magenta" />
                        First Name
                      </Label>
                      <Input
                        id="signup-firstname"
                        placeholder="John"
                        value={signUpData.firstName}
                        onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })}
                        className="h-12 bg-background/50 border-medical-magenta/30 focus:border-medical-magenta transition-colors duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-lastname" className="text-sm font-medium">
                        Last Name
                      </Label>
                      <Input
                        id="signup-lastname"
                        placeholder="Doe"
                        value={signUpData.lastName}
                        onChange={(e) => setSignUpData({ ...signUpData, lastName: e.target.value })}
                        className="h-12 bg-background/50 border-medical-magenta/30 focus:border-medical-magenta transition-colors duration-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-medical-magenta" />
                      Email Address
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      className="h-12 bg-background/50 border-medical-magenta/30 focus:border-medical-magenta transition-colors duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 text-medical-magenta" />
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a secure password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      className="h-12 bg-background/50 border-medical-magenta/30 focus:border-medical-magenta transition-colors duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm" className="text-sm font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 text-medical-magenta" />
                      Confirm Password
                    </Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="Confirm your password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                      className="h-12 bg-background/50 border-medical-magenta/30 focus:border-medical-magenta transition-colors duration-300"
                      required
                    />
                  </div>
                  {error && (
                    <Alert variant="destructive" className="animate-fade-in border-destructive/50 bg-destructive/10">
                      <AlertDescription className="text-sm">{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-medical-magenta to-medical-magenta/80 hover:from-medical-magenta/90 hover:to-medical-magenta/70 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]" 
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <img 
                          src="/lovable-uploads/fc70eb34-882e-4a20-9da3-39a20773fb7c.png" 
                          alt="Loading" 
                          className="w-4 h-4 animate-premium-spin"
                        />
                        Creating account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        Create Account
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <PremiumLoadingScreen 
        isVisible={isNavigating}
        message={`Navigating to ${targetSection}`}
      />
    </div>
  );
};

export default Auth;