import Auth_Global from "../../core/firebase/auth_global";
import { useAuth } from "../Common/Hooks/useAuth";

const Home = () => {
    const { currentUser } = useAuth();

    return (
        <div>
            <div>Home</div>

            <div>Hello, {currentUser!.displayName ? currentUser!.displayName : currentUser!.email}</div>

            <button onClick={() => Auth_Global.signOut()}>Sign out</button>
        </div>
    );
}

export default Home;