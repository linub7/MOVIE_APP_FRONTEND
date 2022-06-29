const FormContainer = ({ children }) => {
  return (
    <div className="fixed inset-0 dark:bg-primary bg-white -z-10 flex items-center justify-center">
      {children}
    </div>
  );
};

export default FormContainer;
