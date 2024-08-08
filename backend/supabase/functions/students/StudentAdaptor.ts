import "jsr:@supabase/functions-js/edge-runtime.d.ts"; //Deno
import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import { errorMessages } from "../_shared/constants.ts";
import { getCurrentTimestampWithTimezone } from "../_shared/timestamp.ts";
import { ParentAdaptor } from "../parents/ParentAdaptor.ts";
import { calculateAge } from "../_shared/common.ts";

export class StudentAdaptor {
    private queryParams: object;
    private supabase: any; //db client
    private url: URL;
    private studentIDMapping: Map<string | bigint, object> = new Map(); // create mapping to map student record with student id

    public constructor(url: URL) {
        //initialize db client
        this.supabase = createClient(
            Deno.env.get("API_URL"),
            Deno.env.get("API_ANON")
        );

        this.url = url;

        // Parse parameters from URL
        this.queryParams = {
            param_student_id: url.searchParams.get('student_id'),
            param_firstname: url.searchParams.get('firstname'),
            param_lastname: url.searchParams.get('lastname'),
            param_gender: url.searchParams.get('gender'),
            param_age_lowlimit: url.searchParams.get('age_lowlimit'),
            param_age_highlimit: url.searchParams.get('age_highlimit'),
            param_pronounce: url.searchParams.get('pronounce'),
            param_is_active: url.searchParams.get('is_active'),
            // for parent table
            param_parent_id: url.searchParams.get('id'),
            param_parent_email: url.searchParams.get('email'),
            param_parent_tel: url.searchParams.get('tel'),
            param_parent_address: url.searchParams.get('address'),
            param_parent_city: url.searchParams.get('city'),
            param_parent_postcode: url.searchParams.get('postcode'),
            param_parent_name: url.searchParams.get('name'),
            // for parent-student relationship
            param_parent_rel: url.searchParams.get('parent_rel'),
            paran_student_rel: url.searchParams.get('student_rel'),
            // no parent option
            param_no_parent: url.searchParams.get('no_parent')
        };
    }

    //getter
    public getQueryParams = () => this.queryParams;
    public getURL = () => this.url;
    public getStudentIDMapping = () => this.studentIDMapping;
    
    //database calling function
    public getStudents = async (): Array<object> | object => {
        let errorResponse: object;
        // Construct the query first
        let query = this.supabase
            .from('students')
            .select()
            .is('is_active', this.queryParams.param_is_active ? this.queryParams.param_is_active === 'true' : true)
            .is('deleted_dt', null);
        // Conditional chaining (for filtering)
        if (this.queryParams.param_student_id) {
            query.eq('id', this.queryParams.param_student_id);
        }
        if (this.queryParams.param_firstname) {
            query.eq('firstname', this.queryParams.param_firstname);
        }
        if (this.queryParams.param_lastname) {
            query.eq('lastname', this.queryParams.param_lastname);
        }
        if (this.queryParams.param_gender) {
            query.eq('gender', this.queryParams.param_gender)
        }
        if (this.queryParams.param_pronounce) {
            query.eq('pronounce', this.queryParams.param_pronounce);
        }

        // Execute the query
        const { data: studentData, error: studentError } = await query;
        // Error handling
        if (studentError) {
            console.error(`student table error: ${studentError}`);
            errorResponse = {
                type: 'ERROR',
                message: errorMessages.dbError,
                reason: `student table error: ${studentError}`
            };
            return errorResponse;
        }
        // further filtering 
        let studentres: Array<object> = studentData;
        // age ranges
        if (this.queryParams.param_age_lowlimit) {
            studentres = studentres.filter((record) => calculateAge(record.dob) >= Number.parseInt(this.queryParams.param_age_lowlimit));
        }
        if (this.queryParams.param_age_highlimit) {
            studentres = studentres.filter((record) => calculateAge(record.dob) <= Number.parseInt(this.queryParams.param_age_highlimit));
        }
        // fields to display
        const student_fieldDisp = ['student_id', 'gender', 'name', 'age', 'pronounce', 'is_active', 'created_dt', 'created_by'];
        studentres.map((record) => {
            var fullname: string = '';
            for (var key in record) {
                switch (key) {
                    case 'id':
                        // rename the field 'id; to 'student_id' for output
                        record['student_id'] = record[key];
                        this.studentIDMapping.set(record[key], record) // record the current student id in mappings
                        delete record[key];
                        break;
                    case 'dob':
                        // derive an age field based on dob
                        record['age'] = calculateAge(record[key]);
                        break;
                    case 'firstname':
                        fullname += `${record[key]} `;
                        break;
                    case 'lastname':
                        fullname += `${record[key]}`;
                        break;
                }
                if (student_fieldDisp.indexOf(key) < 0) {
                    // delete non relevant fields for output
                    delete record[key];
                }
            }
            record['name'] = fullname;
        });
        return studentres;
    };

    public getStudentParentRel = async (): Array<object> => {
        let errorResponse: object;
        const { data: relationships, error: relationshipsError } = await this.supabase
            .from('rel_parent_student')
            .select(`
                parent_id,
                student_id,
                parent_rel,
                address,
                city,
                postcode
            `);
        if (relationshipsError) {
            console.error('Failed to fetch relationships record.');
            errorResponse = {
                type: 'ERROR',
                message: `${errorMessages.dbError} - Failed to fetch relationships record.`,
                reason: relationshipsError
            };
            return errorResponse;
        }
        return relationships;
    };

    public getStudents_Parents_Courses= async (): Array<object> | object => {
        var res: Array<any> = [];
        const parent_fieldDisp = ['parent_name', 'parent_email', 'parent_tel', 'created_dt', 'created_by'];

        // Step 1: GET student records first.
        var studentres: Array<object> | object = await this.getStudents(); //add student records to final response
        
        // Step 2: GET student-parent relationship data for EACH student id
        var relData: Array<object> | object = await this.getStudentParentRel();

        if (relData?.type != 'ERROR') {
            for (var [studentID, studentRecord] of this.studentIDMapping) {
                const parents: Array<object> = [];
                for (var relRecord of relData) {
                    if (relRecord['student_id'] === studentID) {
                        // Adjust fields within parents object
                        // parent_rel field
                        studentRecord = {
                            ...studentRecord, 
                            parent_rel: relRecord['parent_rel'], 
                            address: {
                                address: relRecord['address'],
                                city: relRecord['city'],
                                postcode: relRecord['postcode']
                            }
                        };
                        //not showing those fields in parents object
                        delete relRecord['parent_rel'];
                        delete relRecord['address']
                        delete relRecord['city']
                        delete relRecord['postcode'];

                        // get parents list / object based on parent id
                        const { data: parentData, error: parentError } = await this.supabase
                            .from('parents')
                            .select()
                            .is('deleted_dt', null)
                            .eq('id', relRecord['parent_id']);
                        if (parentError) {
                            console.error('Failed to fetch parents record.');
                            var errorResponse = {
                                type: 'ERROR',
                                message: `${errorMessages.dbError} - Failed to fetch parents record.`,
                                reason: parentError
                            };
                            return errorResponse;
                        }

                        // Copy parent details data into relRecord
                        relRecord = {...relRecord, ...parentData[0]};
                       
                        for (var key in relRecord) {
                            //Change appropriate field names
                            switch (key) {
                                case 'firstname':
                                    relRecord['parent_name'] = relRecord[key];
                                    break;
                                case 'lastname':
                                    relRecord['parent_name'] += ` ${relRecord[key]}`;
                                    break;
                                case 'email':
                                    relRecord['parent_email'] = relRecord[key];
                                    break;
                                case 'tel':
                                    relRecord['parent_tel'] = relRecord[key];
                                    break;
                            }

                            // Drop irrelevant fields
                            if (parent_fieldDisp.indexOf(key) < 0) {
                                delete relRecord[key];
                            }
                        }

                        // Move parent_rel property inside parents object
                        relRecord['parent_rel'] = studentRecord['parent_rel'];
                        delete studentRecord['parent_rel'];
                        
                        // Add parents object to current student's record
                        parents.push(relRecord);
                    }
                }

                // get list of registered courses
                const regCoursesRes: Array<object> | object = await this.getCourseRegByStudent(studentID);
                if (regCoursesRes?.type != 'ERROR') {
                    relRecord = {...relRecord, registered_courses: regCoursesRes};
                } else {
                    return regCoursesRes;
                }

                res.push({...studentRecord, parent: parents, registered_courses: regCoursesRes});
            }
        }
        
        return res;
    };

    public getCourseRegByStudent = async (studentID: string | bigint) => {
        // Query registered-course table
        const { data: regCourseData, error: regCourseError } = await this.supabase
            .from('registered_courses')
            .select(`
                special_needs,
                pickup_arrangements,
                is_active,
                created_dt,
                created_by,
                course_attendance,
                status,
                courses (
                    course_name,
                    course_language,
                    admin_in_charge,
                    age_group,
                    time,
                    is_active,
                    quota,
                    created_dt,
                    created_by,
                    modified_dt,
                    modified_by
                ),
                emergency_contact (
                    name,
                    relationship,
                    tel
                )
            `)
            .eq('student_id', studentID);
        if (regCourseError) {
            console.error('Failed to fetch registered_courses relationship record.');
            errorResponse = {
                type: 'ERROR',
                message: `${errorMessages.dbError} - Failed to fetch registered_courses relationship record.`,
                reason: regCourseRelError
            };
            return errorResponse;
        }
        return regCourseData;
    }

    public insertStudents = async (reqBody: object | Array<object>): object => {
        let errorResponse: object;
        if (!reqBody) {
            console.error(`${errorMessages.noRecordsToAdd} - students table`);
            errorResponse = {
                type: 'ERROR',
                message: `${errorMessages.noRecordsToAdd} - students table`,
                reason: errorMessages.noRecordsToAdd_reason
            };
            return errorResponse;
        }

        // not overwriting request body during querying
        const studentQueryFields: Array<object> = [];
        if (Array.isArray(reqBody)) {
            reqBody.map((record) => {
                let currStudentQueryField: object = {};
                if (typeof(record) === 'object' && !Array.isArray(record)) {
                    currStudentQueryField['created_by'] = 'cics'; //add audit fields to request body object
                    for (var key in record) {
                        if (key.startsWith('student_')) {
                            // remove prefix for querying database
                            currStudentQueryField[key.substring(8)] = record[key];
                        }
                    }
                }
                studentQueryFields.push(currStudentQueryField)
            });
        } else if (typeof(reqBody) === 'object') {
            let currStudentQueryField: object = {};
            // not overwriting request body during querying
            currStudentQueryField['created_by'] = 'cics'; //add audit fields to request body object
            for (var key in reqBody) {
                if (key.startsWith('student_')) {
                    // remove prefix for querying database
                    currStudentQueryField[key.substring(8)] = reqBody[key];
                }
            }
            studentQueryFields.push(currStudentQueryField);
        }

        // Construct the query
        const query = this.supabase
            .from('students')
            .insert(studentQueryFields, {return: 'representation', defaultToNull: true})
            .select();
        // Execute the query
        const { data, error } = await query;
        // Error handling
        if (error) {
            console.error(`students table - ${error}`);
            errorResponse = {
                type: 'ERROR',
                message: `${errorMessages.dbError} - students table`,
                reason: error
            };
            return errorResponse;
        }
        // fields to display
        const student_fieldDisp = ['id', 'name', 'age', 'pronounce', 'is_active', 'created_dt', 'created_by'];
        // format field names from students database table query
        var studentres = data;
        studentres.map((record) => {
            for (var key in record) {
                if (student_fieldDisp.indexOf(key) < 0) {
                    // i.e. not a field to display
                    delete record[key];
                } else {
                    // i.e. is a field to display
                    record[`student_${key}`] = record[key]; //add back the prefix for display
                    delete record[key];
                }
            }
        });

        if (this.queryParams.param_no_parent === 'true') {
            return studentres;
        } else {
            // call insert parents to add the corresponding parent's record and association
            const parentAdaptor = new ParentAdaptor(this.url);
            const parentData = await parentAdaptor.insertParents(reqBody, data /* student data */);

            // format final response
            var res: Array<object> = [];
            studentres.map((studentRecord: Object, ind: Number) => {
                res.push({...studentRecord, ...parentData[ind]});
            });

            return res;
        }
    };

    public updateStudents = async (): object => {
        let errorResponse: object;
        if (!this.queryParams.param_student_id || !(this.queryParams.param_name || this.queryParams.param_gender || this.queryParams.param_age || this.queryParams.param_pronounce || this.queryParams.param_is_active)) {
            console.error(`${errorMessages.noRecordsToUpdate} - students table`);
            errorResponse = {
                type: 'ERROR',
                message: `${errorMessages.noRecordsToUpdate} - students table`,
                reason: errorMessages.noRecordsToUpdate_reason
            };
            return errorResponse;
        }
        // Construct the query
        let query = this.supabase
            .from('students');
        // Conditional Chaining (for updating based on provided parameters)
        const updateCond: Record<string, any> = {};
        if (this.queryParams.param_name) {
            updateCond['name'] = this.queryParams.param_name;
        }
        if (this.queryParams.param_gender) {
            updateCond['gender'] = this.queryParams.param_gender;
        }
        if (this.queryParams.param_age) {
            updateCond['age'] = this.queryParams.param_age;
        }
        if (this.queryParams.param_pronounce) {
            updateCond['pronounce'] = this.queryParams.param_pronounce;
        }
        if (this.queryParams.param_is_active) {
            updateCond['is_active'] = this.queryParams.param_is_active;
        }
        // Set modified_dt and modified_by for auditing purpose in database
        updateCond['modified_dt'] = getCurrentTimestampWithTimezone(); //UTC time
        updateCond['modified_by'] = 'cics';
        // Execute the query
        const { data, error } = await query.update(updateCond).eq('id', this.queryParams.param_student_id).select();
        // Error handling
        if (error) {
            console.error(error);
            errorResponse = {
                type: 'ERROR',
                message: errorMessages.dbError,
                reason: error
            };
            return errorResponse;
        }
        // fields to display
        const fieldDisp = ['id', 'name', 'age', 'pronounce', 'is_active', 'modified_dt', 'modified_by'];
        if (this.queryParams.param_gender) {
            fieldDisp.push('gender');
        }
        data.map((record) => {
            for (var key in record) {
                if (fieldDisp.indexOf(key) < 0) {
                    delete record[key];
                }
            }
        });
        return data;
    };

    public deleteStudents = async (): object => {
        let errorResponse: object;
        if (!this.queryParams?.param_student_id) {
            console.error(errorMessages.noRecordsToAdd);
            errorResponse = {
                type: 'ERROR',
                message: errorMessages.noRecordsToDelete,
                reason: errorMessages.noRecordsToDelete_reason
            };
            return errorResponse;
        }

        // Step 1: Mark student record to be deleted
        // Construct the query
        let query = this.supabase
            .from('students');
        // Construct fields to perform UPDATE
        const updateCond: Record<string, any> = {};
        // Set is_active to False
        updateCond['is_active'] = false;
        // Set deleted_dt and deleted_by
        updateCond['deleted_dt'] = getCurrentTimestampWithTimezone(); //UTC time
        updateCond['deleted_by'] = 'cics';
        // Set modified_dt and modified_by for auditing purpose in database
        updateCond['modified_dt'] = getCurrentTimestampWithTimezone(); //UTC time
        updateCond['modified_by'] = 'cics';
        // Execute the query
        const { data, error } = await query.update(updateCond).eq('id', this.queryParams.param_student_id).select();
        // Error handling
        if (error) {
            console.error(error);
            errorResponse = {
                type: 'ERROR',
                message: errorMessages.dbError,
                reason: error
            };
            return errorResponse;
        }
        let studentres: Array<object> = data;
        // fields to display
        const fieldDisp = ['id', 'name', 'age', 'pronounce', 'is_active', 'modified_dt', 'modified_by', 'deleted_dt', 'deleted_by'];
        studentres.map((studentRecord) => {
            for (var key in studentRecord) {
                if (fieldDisp.indexOf(key) < 0) {
                    delete studentRecord[key];
                }
            }
        });

        // Step 2: Mark student-parent relationship record to be deleted
        // Construct the query
        query = this.supabase
            .from('rel_parent_student');
        // Update the fields accordingly
        delete updateCond['is_active'];
        query.update(updateCond).eq('student_id', this.queryParams.param_student_id).select();
        // Execute the query 
        const { data: relationship, error: relationshipsError} = await query;
        if (relationshipsError) {
            console.error('Error fetching rel_parent_student relationships:', relationshipsError);
            return studentres.map((studentRecord) => ({...studentRecord, parent: []}));
        }

        // Step 3: Update the corresponding parent's record (if any)
        // Fetch the parent id
        // Construct the query
        query = this.supabase
            .from('rel_parent_student')
            .select(`parent_id`)
            .eq('student_id', this.queryParams.param_student_id); //should be 1 record only
        // Execute the query
        const {data: relationship_parentid, error: relationshipsError_parentid } = await query;
        // Error handling
        if (relationshipsError_parentid) {
            console.error('Error fetching parent_id from rel_parent_student relationship: ', relationshipsError_parentid);
            return studentres.map((studentRecord) => ({...studentRecord, parent: []}));
        }
        // Extract the parent id from response
        const parent_id = relationship_parentid[0]['parent_id'];

        // Perform the UPDATE
        query = this.supabase
            .from('parents')
            .update(updateCond).eq('id', parent_id)
            .select();
        // Execute the query
        const { data: parent, error: parentError } = await query;
        if (parentError) {
            console.error('Error fetching parent record: ', parentError);
            return studentres.map((studentRecord) => ({...studentRecord, parent: {parent_id: parent_id}}));
        }
        // Step 4: Extract the parent information and merge it into student record
        return studentres.map((studentRecord, ind) => ({...studentRecord, parent: parent[ind]}));
    };
}