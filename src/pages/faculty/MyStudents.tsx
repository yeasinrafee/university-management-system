import { useParams } from 'react-router-dom';
import {
  useAddMarkMutation,
  useGetAllFacultyCoursesQuery,
} from '../../redux/features/faculty/facultyCourses.api';
import { Button, Modal, Table } from 'antd';
import { useState } from 'react';
import UniForm from '../../components/form/UniForm';
import UniInput from '../../components/form/UniInput';

const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();

  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery([
    { name: 'semesterRegistration', value: registerSemesterId },
    { name: 'course', value: courseId },
  ]);

  const tableData = facultyCoursesData?.data?.map(
    ({ _id, student, semesterRegistration, offeredCourse }) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
    })
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Roll',
      key: 'roll',
      dataIndex: 'roll',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => {
        return <AddMarksModal studentInfo={item} />;
      },
    },
  ];

  return <Table columns={columns} dataSource={tableData} />;
};

const AddMarksModal = ({ studentInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();

  const handleSubmit = async (data) => {
    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };
    const res = await addMark(studentMark);
    console.log(res);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type='primary' onClick={showModal}>
        Add Faculty
      </Button>
      <Modal
        title='Basic Modal'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <UniForm onSubmit={handleSubmit}>
          <UniInput type='text' name='classTest1' label='Class Test 1' />
          <UniInput type='text' name='classTest2' label='Class Test 2' />
          <UniInput type='text' name='midTerm' label='Mid Term' />
          <UniInput type='text' name='finalTerm' label='Final' />
          <Button htmlType='submit'>Submit</Button>
        </UniForm>
      </Modal>
    </>
  );
};

export default MyStudents;
