const SubmitButton = ({ isPending, error, label }) => {
  return (
    <div>
      {!isPending && <button className="button">{label}</button>}
      {isPending && (
        <button className="button" disabled>
          Loading
        </button>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SubmitButton;
