import { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    if(e.target.type === "file"){
      setValues({ ...values, [e.target.name]: e.target.files });
    }
    else{
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    setValues,
    handleChange,
    resetForm
  };
};

export default useForm;
