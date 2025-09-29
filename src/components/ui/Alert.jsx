import { useState } from "react";
import { CloseIcon } from "../../icons";
import Button from "./Button";

const variantStyles = {
    success: "bg-green-100 border-green-400 text-green-800",
    error: "bg-red-100 border-red-400 text-red-800",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-800",
    info: "bg-blue-100 border-blue-400 text-blue-800",
};

export default function Alert({ variant = "info", message, onClose, className, onClick, loading = false }) {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const handleClose = () => {
        setVisible(false);
        onClose?.();
    };

    return (
        <div
            className={`relative p-4 mb-4 border rounded-lg ${className} ${variantStyles[variant]} shadow`}
            role="alert"
        >
            {message && <div className="flex items-center justify-center h-64 rounded-lg">
                <div className="text-center">
                    <p className="text-red-600 font-medium">Error!!!</p>
                    <p className="text-red-500 text-sm mt-1">{message}</p>
                    <Button loading={loading} onClick={() => onClick()} variant="outline-danger" className="rounded px-5 my-2">Retry</Button>
                </div>
            </div>}
            <button
                type="button"
                className="absolute top-2 right-2 text-lg leading-none"
                onClick={handleClose}
            >
                <CloseIcon className="w-5 h-5" />
            </button>
        </div>
    );
}
