import { Input } from 'antd';
import { Controller } from 'react-hook-form';

const UniInput = ({ type, name, label }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => <Input {...field} type={type} id={name} />}
      />
    </div>
  );
};

export default UniInput;
