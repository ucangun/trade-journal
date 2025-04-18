const LoadingButton = ({
  type = "button",
  className = "",
  disabled = false,
  isLoading = false,
  children,
  loadingText,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`relative ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="opacity-0">{children}</span>
          <span className="absolute inset-0 flex items-center justify-center">
            {loadingText ? (
              <span className="flex items-center">
                <div className="w-4 h-4 mr-2 border-2 border-current rounded-full border-t-transparent animate-spin"></div>
                {loadingText}
              </span>
            ) : (
              <div className="w-5 h-5 border-2 border-current rounded-full border-t-transparent animate-spin"></div>
            )}
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
