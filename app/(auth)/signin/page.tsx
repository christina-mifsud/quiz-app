import SignInForm from "@/components/SignInForm";
import "@/styles/auth.scss";
export default async function SignInPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Sign In</h1>
        <SignInForm />
      </div>
    </div>
  );
}
