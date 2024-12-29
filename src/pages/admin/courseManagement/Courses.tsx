import { Button, Modal, Table, TableColumnsType } from 'antd';
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from '../../../redux/features/admin/courseManagement.api';
import { TCourse } from '../../../types';
import { useState } from 'react';
import UniForm from '../../../components/form/UniForm';
import UniSelect from '../../../components/form/UniSelect';
import { useGetAllFacultiesQuery } from '../../../redux/features/admin/userManagement.api';

export type TTableData = Pick<TCourse, 'title' | 'prefix' | 'code'>;

const Courses = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix}-${code}`,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Code',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: 'Action',
      key: 'action',
      render: (item) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  // const onChange: TableProps<TTableData>['onChange'] = (
  //   _pagination,
  //   _filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === 'filter') {
  //     const queryParams: TQueryParam[] = [];
  //     setParams(queryParams);
  //   }
  // };

  return (
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  );
};

const AddFacultyModal = ({ facultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [addFaculties] = useAddFacultiesMutation();

  const facultiesOption = facultiesData?.data?.map((item) => ({
    value: item.id,
    label: item.fullName,
  }));

  const handleSubmit = (data) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data: data,
    };
    addFaculties(facultyData);
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
          <UniSelect
            mode='multiple'
            options={facultiesOption}
            name='faculties'
            label='Faculty'
          />
          <Button htmlType='submit'>Submit</Button>
        </UniForm>
      </Modal>
    </>
  );
};

export default Courses;
