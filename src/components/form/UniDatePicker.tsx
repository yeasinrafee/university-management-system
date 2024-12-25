import { DatePicker, Form } from 'antd';
import { Controller } from 'react-hook-form';

type TDatePickerProps = {
  name: string;
  label?: string;
};

const UniDatePicker = ({ name, label }: TDatePickerProps) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker {...field} size='large' style={{ width: '100%' }} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default UniDatePicker;
