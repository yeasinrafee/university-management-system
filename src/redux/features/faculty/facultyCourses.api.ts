import { TQueryParam, TResponseRedux } from '../../../types';
import { baseApi } from '../../api/baseApi';

const facultyCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacultyCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/enrolled-courses',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['offeredCourse'],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    enrolCourse: builder.mutation({
      query: (data) => ({
        url: '/enrolled-courses/create-enrolled-course',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['offeredCourse'],
    }),
  }),
});

export const { useGetAllFacultyCoursesQuery } = facultyCourseApi;
