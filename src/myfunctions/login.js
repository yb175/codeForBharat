import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebse'; // ✅ this should be correct path

const provider = new GoogleAuthProvider();

export default function handleGoogleLogin() {
  const navigate = useNavigate();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      localStorage.setItem('campusUser', JSON.stringify(user));
    })
    .catch((error) => {
      console.error("Google login failed:", error.message);
    });
}
