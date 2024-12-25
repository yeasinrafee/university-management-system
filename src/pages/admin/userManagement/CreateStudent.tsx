import { Controller, FieldValues, SubmitHandler } from 'react-hook-form';
import UniForm from '../../../components/form/UniForm';
import UniInput from '../../../components/form/UniInput';
import { Button, Col, Divider, Form, Input, Row } from 'antd';
import { bloodGroupOptions, genderOptions } from '../../../constants/global';
import UniSelect from '../../../components/form/UniSelect';
import UniDatePicker from '../../../components/form/UniDatePicker';
import { useGetAllSemestersQuery } from '../../../redux/features/admin/academicManagement.api';
import { useAddStudentMutation } from '../../../redux/features/admin/userManagement.api';

const studentDefaultValues = {
  name: {
    firstName: 'I am ',
    middleName: 'Student',
    lastName: 'Number 1',
  },

  gender: 'male',
  bloogGroup: 'A+',

  email: 'student23455@gmail.com',
  contactNo: '1235678',
  emergencyContactNo: '987-654-3210',
  presentAddress: '123 Main St, Cityville',
  permanentAddress: '456 Oak St, Townsville',

  guardian: {
    fatherName: 'James Doe',
    fatherOccupation: 'Engineer',
    fatherContactNo: '111-222-3333',
    motherName: 'Mary Doe',
    motherOccupation: 'Teacher',
    motherContactNo: '444-555-6666',
  },

  localGuardian: {
    name: 'Alice Johnson',
    occupation: 'Doctor',
    contactNo: '777-888-9999',
    address: '789 Pine St, Villageton',
  },

  admissionSemester: '65b0104110b74fcbd7a25d92',
  academicDepartment: '676bd24f8944588c2db65d38',
};

const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation();

  console.log({ data, error });

  const { data: sData, isLoading: sIsLoading } =
    useGetAllSemestersQuery(undefined);

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const studentData = {
      password: 'student123',
      student: data,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(studentData));
    formData.append('file', data.image);
    addStudent(formData);
  };

  return (
    <Row>
      <Col span={24}>
        <UniForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type='text' name='name.firstName' label='First Name' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='name.middleName'
                label='Middle Name'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type='text' name='name.lastName' label='Last Name' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniSelect options={genderOptions} name='gender' label='Gender' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniDatePicker name='dateOfBirth' label='Date of Birth' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniSelect
                options={bloodGroupOptions}
                name='bloogGroup'
                label='Blood Group'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name='image'
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item>
                    <label htmlFor='image'>Picture</label>
                    <Input
                      type='file'
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type='text' name='email' label='Email' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type='text' name='contactNo' label='Contact No.' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='emergencyContactNo'
                label='Emergency Contact No.'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='presentAddress'
                label='Present Address'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='permanentAddress'
                label='Permanent Address'
              />
            </Col>
          </Row>
          <Divider>Guardian Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='guardian.fatherName'
                label='Father Name'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='guardian.fatherOccupation'
                label='Father Occupation'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='guardian.fatherContactNo'
                label='Father Contact No.'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='guardian.motherName'
                label='Mother Name'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='guardian.motherOccupation'
                label='Mother Occupation'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='guardian.motherContactNo'
                label='Mother Contact No.'
              />
            </Col>
          </Row>
          <Divider>Local Guardian Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type='text' name='localGuardian.name' label='Name' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='localGuardian.occupation'
                label='Occupation'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='localGuardian.contactNo'
                label='Contact No.'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='localGuardian.address'
                label='Address'
              />
            </Col>
          </Row>
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniSelect
                options={semesterOptions}
                disabled={sIsLoading}
                name='admissionSemester'
                label='Admission Semester'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='academicDepartment'
                label='Academic Department'
              />
            </Col>
          </Row>
          <Button htmlType='submit'>Submit</Button>
        </UniForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
