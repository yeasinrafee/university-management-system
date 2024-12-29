import { Button, Col, Row } from 'antd';
import { useGetAllOfferedCoursesQuery } from '../../redux/features/student/studentCourseManagement.api';

const OfferedCourse = () => {
  const { data: offeredCourseData } = useGetAllOfferedCoursesQuery(undefined);

  const singleObject = offeredCourseData?.data?.reduce((acc, item) => {
    const key = item.course.title;

    acc[key] = acc[key] || { courseTitle: key, section: [] };
    acc[key].section.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });

    return acc;
  }, {});

  const modifiedData = Object.values(singleObject ? singleObject : {});

  return (
    <Row gutter={[0, 20]}>
      {modifiedData.map((item) => {
        return (
          <Col span={24} style={{ border: 'solid #d4d4d4 2px' }}>
            <div style={{ padding: '10px' }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item.section.map((section) => {
                return (
                  <Row
                    justify='space-between'
                    align='middle'
                    style={{ borderTop: 'solid #d4d4d4 2px', padding: '10px' }}
                  >
                    <Col span={5}>Section: {section.section}</Col>
                    <Col span={5}>
                      Days:{' '}
                      {section.days.map((day) => (
                        <span> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section.startTime}</Col>
                    <Col span={5}>End Time: {section.endTime}</Col>
                    <Button>Enroll</Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;
