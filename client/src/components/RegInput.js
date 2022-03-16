import "./RegInput.css";

const RegInput = ({ label, type, value, handleInput }) => {
  return (
    <div>
      <label>
        <span>{label}:</span>
        <input
          type={type}
          required
          value={value}
          onChange={(e) => {
            handleInput(e.target.value);
          }}
        />
      </label>
    </div>
  );
};

export default RegInput;
