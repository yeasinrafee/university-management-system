import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

const UniInput = ({ type, name, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input size='large' {...field} type={type} id={name} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default UniInput;
