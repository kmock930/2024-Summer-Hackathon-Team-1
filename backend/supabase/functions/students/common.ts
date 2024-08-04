export const parseQueryCondition = (url: URL): object => {
    return {
        param_student_id: url.searchParams.get('id'),
        param_firstname: url.searchParams.get('firstname'),
        param_lastname: url.searchParams.get('lastname'),
        param_gender: url.searchParams.get('gender'),
        param_dob: url.searchParams.get('dob')
    };
};