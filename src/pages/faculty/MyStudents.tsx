import { useParams } from 'react-router-dom';
import { useGetAllFacultyCoursesQuery } from '../../redux/features/faculty/facultyCourses.api';
import { Button, Table } from 'antd';

const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery([
    { name: 'semesterRegistration', value: registerSemesterId },
    { name: 'course', value: courseId },
  ]);

  const tableData = facultyCoursesData?.data?.map(({ _id, student }) => ({
    key: _id,
    name: student.fullName,
    roll: student.id,
  }));

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
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={tableData} />;
};

export default MyStudents;
