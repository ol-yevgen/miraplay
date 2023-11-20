
import { useNavigate } from 'react-router-dom';
import './notFound.scss'

export default function NotFoundPage() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1); // Перейти на предыдущую страницу
    };
    return (
        <section className="not__found">
            <h1>Page not found</h1>
            <button
                className='btn btn__back'
                onClick={goBack}
            >
                Back page
            </button>
        </section>
    )
};
