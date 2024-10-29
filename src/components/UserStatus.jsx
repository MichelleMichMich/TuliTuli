import { AuthProvider } from "../context/AuthProvider";

export function UserStatus() {

    const {user, isAuth} = useAuth()

    return(
        <div className="user-status">
            {isAuth 
            ? <p>Přihlášený: {user.user_metadata.firstName} {user.user_metadata.lastName}</p> 
            : <p>Nejste Přihlášen</p>}
        </div>
    )
}