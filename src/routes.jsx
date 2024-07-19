import { AuthPage } from "./Pages/Auth/AuthPage.jsx";
import { NotFoundPage} from "./Pages/NotFoundPage/NotFoundPage.jsx"
import { RoomContent } from "./components/Room/RoomsContent.jsx";
import { EventContent } from "./components/Event/EventContent.jsx";
import { HotelContent } from "./components/Hotel/HotelContent.jsx";
import { CategoryContent } from "./components/Category/CategoryContent.jsx";
import { ServiceContent } from "./components/Service/ServiceContent.jsx"
import { ReservationContent } from "./components/Reservation/ReservationContent.jsx";
import { CartContent } from "./components/Reservation/Cart/CartContent.jsx";
import { ProfileContent } from "./components/Profile/ProfileContent.jsx";

export const routes = [
    {path: '/', element: <AuthPage />},
    {path: '/rooms/*', element: <RoomContent/>},
    {path: '/hotels/*', element: <HotelContent/>},
    {path: '/events/*', element: <EventContent/>},
    {path: '/profile/*', element: <ProfileContent/>},
    {path: '/category/*', element: <CategoryContent/>},
    {path: '/services/*', element: <ServiceContent/>},
    {path: '/reservation/*', element: <ReservationContent/>},
    {path: '/cart/*', element: <CartContent/>},
    {path: '*', element: <NotFoundPage />}

]
