import SignUpForm from "@/components/SignUpForm";

export default async function SignUpPage() {
  return (
    <div className="card-container">
      <div className="card">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <SignUpForm />
      </div>
    </div>
  );
}
