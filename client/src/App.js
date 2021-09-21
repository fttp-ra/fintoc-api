import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import useScript from 'react-script-hook';

const widgetOptions = {
    holderType: 'individual',
    product: 'movements',
    publicKey: 'pk_live_NExsy9ngfSbYsH3WpyMEnkEYPAPZd7zh',
    webhookUrl: 'https://webhook.site/c628df92-d689-4237-9037-c1cc471c13c9',
}

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [linkId, setLinkId] = useState('');
    const [loadingScript, errorScript] = useScript({ src: 'https://js.fintoc.com/v1/' });

    const handleSuccess = (params) => {
        setLinkId(params.id);
    };
    const openWidget = () => setIsOpen(true);
    const closeWidget = () => setIsOpen(false);

    useEffect(() => {
        if (!isOpen) return;
        if (loadingScript) return;
        if (errorScript || !window.Fintoc) return;
        const params = {
            ...widgetOptions,
            onSuccess: handleSuccess,
            onExit: closeWidget,
        };
        const widget = window.Fintoc.create(params);
        widget.open();
    }, [loadingScript, errorScript, isOpen]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                {!linkId && <button
                    onClick={openWidget}
                    className="button"
                >
                    Conectar
                </button>}
            </header>
        </div>
    );
}

export default App;
