import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageSwitcher } from "@/components/language-switcher";
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
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas p-4">
      <div className="absolute top-4 left-4 right-4 flex justify-between">
        <Link to="/" className="text-xs font-medium text-muted-foreground hover:text-primary">← {t.actions.home}</Link>
        <LanguageSwitcher />
      </div>
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
                autoFocus
                disabled={loading}
                id="email"
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{t.auth.password}</Label>
              <Input
                disabled={loading}
                id="password"
                minLength={6}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button disabled={loading} type="submit">
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
