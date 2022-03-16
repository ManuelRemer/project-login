// styles
import "./SubmitButton.css";

const SubmitButton = ({ isPending, error, label }) => {
  return (
    <div>
      {!isPending && <button className="submit-button">{label}</button>}
      {isPending && (
        <button className="submit-button" disabled>
          Loading
        </button>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SubmitButton;
