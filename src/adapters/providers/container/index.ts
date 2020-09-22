import { UserProvider } from "../users/UserProvider";
import { PlacesProvider } from "../places/PlacesProvider";

const placesProvider = new PlacesProvider();
const userProvider = new UserProvider();

export { userProvider, placesProvider };
