import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from 'antd';
import { useState } from 'react';
import { TQueryParam, TStudent } from '../../../types';
import { useGetAllStudentsQuery } from '../../../redux/features/admin/userManagement.api';
import { Link } from 'react-router-dom';

export type TTableData = Pick<
  TStudent,
  'fullName' | 'id' | 'email' | 'contactNo'
>;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: studentData, isFetching } = useGetAllStudentsQuery([
    { name: 'sort', value: 'id' },
    { name: 'page', value: page },
    ...params,
  ]);

  const metaData = studentData?.meta;

  const tableData = studentData?.data?.map(
    ({ _id, fullName, id, email, contactNo }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'name',
    },
    {
      title: 'Id No.',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact No.',
      dataIndex: 'contactNo',
      key: 'contactNo',
    },
    {
      title: 'Action',
      key: 'action',
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Link to={`/admin/student-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: '1%',
    },
  ];

  const onChange: TableProps<TTableData>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === 'filter') {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: 'name', value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: 'year', value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table<TTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        total={metaData?.total}
        pageSize={metaData?.limit}
      />
    </>
  );
};

export default StudentData;
