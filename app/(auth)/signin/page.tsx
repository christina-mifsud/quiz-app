import SignInForm from "@/components/SignInForm";

export default async function SignInPage() {
  return (
    <div className="card-container">
      <div className="card">
        <h1 className="text-white text-2xl mb-5">Sign In</h1>
        <SignInForm />
      </div>
    </div>
  );
}
