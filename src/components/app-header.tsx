import { FC } from "react";
import { useNavigate } from 'react-router-dom';

export const AppHeader: FC = () => {

    const navigate = useNavigate()
    return (
        <header className="app-haeder full">
            <h1 onClick={() => navigate('/')}><span>C</span>ode<span>C</span>oach</h1>
        </header>
    )
}

