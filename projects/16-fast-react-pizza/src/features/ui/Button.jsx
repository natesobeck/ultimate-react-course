import { Link } from "react-router-dom";

const Button = ({ children, disabled, to, type }) => {
  const baseStyles =
    "focus:bg-yellow-300 inline-block rounded-full bg-yellow-400 font-semibold uppercase text-stone-800 transition-colors hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed text-sm ";
  const styles = {
    primary: baseStyles + "px-4 py-3 md:px-6 md:py-4",
    small: baseStyles + "px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      "border-2 border-stone-300 focus:bg-stone-300 inline-block rounded-full font-semibold uppercase text-stone-400 transition-colors hover:bg-stone-300 hover:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]} type={type}>
      {children}
    </button>
  );
};

export default Button;
