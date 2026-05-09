function Hamburger({ open, setOpen }) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="flex flex-col justify-between w-6 h-5 relative z-50"
    >
      <span
        className={`h-0.5 bg-white transition-all duration-300 ${
          open ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`h-0.5 bg-white transition-all duration-300 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`h-0.5 bg-white transition-all duration-300 ${
          open ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </button>
  );
}
export default Hamburger;