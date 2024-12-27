import { Button, Table, TableColumnsType, TableProps } from 'antd';
import { TAcademicSemester } from '../../../types/academicManagement.type';
import { useGetAllRegisteredSemestersQuery } from '../../../redux/features/admin/courseManagement.api';
import moment from 'moment';

export type TTableData = Pick<
  TAcademicSemester,
  'name' | 'year' | 'startMonth' | 'endMonth'
>;

const RegisteredSemesters = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemestersQuery(undefined);

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format('MMMM'),
      endDate: moment(new Date(endDate)).format('MMMM'),
      status,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Start Date',
      key: 'startDate',
      dataIndex: 'startDate',
    },
    {
      title: 'End Date',
      key: 'endDate',
      dataIndex: 'endDate',
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

export default RegisteredSemesters;
