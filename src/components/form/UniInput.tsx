import { Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

const UniInput = ({ type, name, label }: TInputProps) => {
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
