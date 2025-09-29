import { LoadingIcon } from "../../icons";

const Button = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  loading = false,
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "h-8 text-sm px-3",
    md: "h-10 text-base px-4",
    lg: "h-12 text-base px-5",
  };

  // Variant Classes
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    warning: "bg-yellow-500 text-black hover:bg-yellow-600",
    info: "bg-cyan-500 text-black hover:bg-cyan-600",
    light: "bg-gray-100 text-black hover:bg-gray-200",
    dark: "bg-gray-900 text-white hover:bg-black",

    // Outline variants
    "outline-primary":
      "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    "outline-secondary":
      "bg-transparent border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white",
    "outline-success":
      "bg-transparent border border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
    "outline-danger":
      "bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
    "outline-warning":
      "bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black",
    "outline-info":
      "bg-transparent border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black",
    "outline-light":
      "bg-transparent border border-gray-100 text-gray-700 hover:bg-gray-100 hover:text-black",
    "outline-dark":
      "bg-transparent border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white",

    // NEW Variant: Neutral (matches provided style)
    neutral:
      "rounded-full border border-gray-300 bg-white text-gray-700 shadow-theme-xs " +
      "hover:bg-gray-50 hover:text-gray-800 " +
      "dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 " +
      "dark:hover:bg-white/[0.03] dark:hover:text-gray-200",
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 transition font-medium focus:outline-none 
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled || loading ? "cursor-not-allowed opacity-50" : ""}
        ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
      {loading && <span className="flex items-center"><LoadingIcon height={30} width={30} /></span>}
    </button>
  );
};

export default Button;