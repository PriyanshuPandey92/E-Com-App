import { Button } from "@/components/ui/button";
import { FcGoogle } from 'react-icons/fc'; // Import the Google icon
import { signInWithGoogle } from "../services/firebase";

const Login = () => {
   const doLogin = async ()=>{
    try {
      await signInWithGoogle();
      
    } catch (error) {
      console.error('Google sign-in failed', error);
    }
   } 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 shadow rounded bg-white">
        <h2 className="text-xl font-bold mb-4">Sign in to Your Account</h2>
        <Button className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition duration-150" onClick={doLogin}>
          <FcGoogle size={24} />
          <span>Sign in with Google</span></Button>
      </div>
    </div>
  )
}
export default Login;
