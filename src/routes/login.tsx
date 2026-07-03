import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthActions } from "@convex-dev/auth/react";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageSwitcher } from "@/components/language-switcher";
import { WeddingLogo } from "@/components/wedding-logo";
import { useI18n } from "@/i18n";

export function LoginPage() {
  const { t } = useI18n();
  const { signIn } = useAuthActions();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn("password", {
        email,
        password,
        flow: isSignUp ? "signUp" : "signIn",
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.auth.authFailed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-canvas p-4 pt-16 sm:pt-4">
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-3" />
          {t.actions.home}
        </Link>
        <LanguageSwitcher />
      </div>

      <Link to="/" className="mb-2" aria-label="Wedding Table">
        <WeddingLogo className="size-10" />
      </Link>

      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">
            {isSignUp ? t.auth.signupTitle : t.auth.loginTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">{t.auth.email}</Label>
              <Input
                autoComplete="email"
                autoFocus
                disabled={loading}
                id="email"
                placeholder={t.auth.emailPlaceholder}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{t.auth.password}</Label>
              <div className="relative">
                <Input
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  className="pr-9"
                  disabled={loading}
                  id="password"
                  minLength={6}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? t.aria.hidePassword : t.aria.showPassword}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button disabled={loading} type="submit">
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
              {isSignUp ? t.auth.signup : t.auth.login}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button
              variant="link"
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
            >
              {isSignUp ? t.auth.hasAccount : t.auth.noAccount}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
