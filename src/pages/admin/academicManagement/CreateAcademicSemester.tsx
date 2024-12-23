import { FieldValues, SubmitHandler } from 'react-hook-form';
import UniForm from '../../../components/form/UniForm';
import { Button, Col, Flex } from 'antd';
import UniSelect from '../../../components/form/UniSelect';
import { semesterOptions } from '../../../constants/semester';
import { monthOptions } from '../../../constants/global';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicSemesterSchema } from '../../../schemas/academicManagement.schema';
import { useAddAcademicSemesterMutation } from '../../../redux/features/admin/academicManagement.api';
import { toast } from 'sonner';
import { TResponse } from '../../../types/global';

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating semester....');

    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = (await addAcademicSemester(semesterData)) as TResponse;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success('Semester created successfully', { id: toastId });
      }
    } catch (err) {
      toast.error('Something went wrong..!', { id: toastId });
    }
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
  }));

  return (
    <Flex justify='center' align='center'>
      <Col span={6}>
        <UniForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <UniSelect label='Name' name='name' options={semesterOptions} />
          <UniSelect label='Year' name='year' options={yearOptions} />
          <UniSelect
            label='Start Month'
            name='startMonth'
            options={monthOptions}
          />
          <UniSelect label='End Month' name='endMonth' options={monthOptions} />
          <Button htmlType='submit'>Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
