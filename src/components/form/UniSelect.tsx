import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';

type TUniSelectProps = {
  label: string;
  name: string;
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
};

const UniSelect = ({ label, name, options }: TUniSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: '100%' }}
            size='large'
            {...field}
            options={options}
          />
        </Form.Item>
      )}
    />
  );
};

export default UniSelect;
