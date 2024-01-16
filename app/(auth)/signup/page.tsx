import SignUpForm from "@/components/SignUpForm";
import "@/styles/auth.scss";

export default async function SignUpPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Sign Up</h1>
        <SignUpForm />
      </div>
    </div>
  );
}
