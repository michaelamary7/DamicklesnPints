const FormInput = ({ label, error, ...props }) => (
    <div>
      <label>{label}</label>
      <input {...props} />
      {error && <span>{error}</span>}
    </div>
  );
  export default FormInput;
  