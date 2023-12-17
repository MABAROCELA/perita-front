import '../css/NoAutorizado.css'

const NoAutorizado = () => {
    return (
        <div className="auth-page">
            <div className="container-auth">
                <h1 className="word-auth">401</h1>
                <h2 className="frase-auth">ACCESO NO AUTORIZADO</h2>
                <a href="/" className="back-home-link">HOME</a>
            </div>
        </div>
    );
};

export default NoAutorizado;