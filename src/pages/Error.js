import '../css/Error.css'

const Error = () => {
    return (
        <div className="error-page">
            <div className="container-error">
                <h1 className="word-error">404</h1>
                <h2 className="frase-error">Página no encontrada</h2>
                <a href="/" className="back-home-link">HOME</a>
            </div>
        </div>
    );
};

export default Error;