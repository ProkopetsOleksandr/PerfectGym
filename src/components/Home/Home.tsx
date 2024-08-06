import AuthApi from "../../core/firebase/authApi";
import { useAuth } from "../Common/Hooks/useAuth";

const Home = () => {
    const { currentUser } = useAuth();

    return (
        <div>
            <div>Home</div>

            <div>Hello, {currentUser!.displayName ? currentUser!.displayName : currentUser!.email}</div>

            <button onClick={() => AuthApi.signOut()}>Sign out</button>
        </div>
    );
}

export default Home;