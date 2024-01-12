import SignUpForm from "@/components/SignUpForm";
import "@/app/(auth)/auth.scss";

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

//////////////////////////////////

///// to do
/// sign out component
/// css
/// 3 quiz pages - flow
