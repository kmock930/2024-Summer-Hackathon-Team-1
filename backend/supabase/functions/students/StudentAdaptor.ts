import "jsr:@supabase/functions-js/edge-runtime.d.ts"; //Deno
import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import { errorMessages } from "../_shared/constants.ts";
import { getCurrentTimestampWithTimezone } from "../_shared/timestamp.ts";
import { ParentAdaptor } from "../parents/ParentAdaptor.ts";

export class StudentAdaptor {
    private queryParams: object;
    private supabase: any; //db client
    private url: URL;

    public constructor(url: URL) {
        //initialize db client
        this.supabase = createClient(
            Deno.env.get("API_URL"),
            Deno.env.get("API_ANON")
        );

        this.url = url;

        // Parse parameters from URL
        this.queryParams = {
            param_student_id: url.searchParams.get('id'),
            param_name: url.searchParams.get('name'),
            param_gender: url.searchParams.get('gender'),
            param_age_lowlimit: url.searchParams.get('age_lowlimit'),
            param_age_highlimit: url.searchParams.get('age_highlimit'),
            param_pronounce: url.searchParams.get('pronounce'),
            param_is_active: url.searchParams.get('is_active'),
            param_age:url.searchParams.get('age'),
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
            paran_student_rel: url.searchParams.get('student_rel')
        };
    }

    //getter
    public getQueryParams = () => this.queryParams;
    public getURL = () => this.url;
    
    //database calling function
    public getStudents = async (): object => {
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
        if (this.queryParams.param_name) {
            query.eq('name', this.queryParams.param_name);
        }
        if (this.queryParams.param_gender) {
            query.eq('gender', this.queryParams.param_gender)
        }
        if (this.queryParams.param_pronounce) {
            query.eq('pronounce', this.queryParams.param_pronounce);
        }

        // Execute the query
        const { data, error } = await query;
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
        // further filtering 
        let res: Array<object> = data;
        // age ranges
        if (this.queryParams.param_age_lowlimit) {
            res = res.filter((record) => Number.parseInt(record.age) >= Number.parseInt(this.queryParams.param_age_lowlimit));
        }
        if (this.queryParams.param_age_highlimit) {
            res = res.filter((record) => Number.parseInt(record.age) <= Number.parseInt(this.queryParams.param_age_highlimit));
        }
        // fields to display
        const fieldDisp = ['id', 'name', 'age', 'pronounce', 'is_active', 'created_dt', 'created_by'];
        res.map((record) => {
            for (var key in record) {
                if (fieldDisp.indexOf(key) < 0) {
                    delete record[key];
                }
            }
        });
        return res;
    };

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
        // call insert parents to add the corresponding parent's record and association
        const parentAdaptor = new ParentAdaptor(this.url);
        const parentData = await parentAdaptor.insertParents(reqBody, data /* student data */);

        // format final response
        var res: Array<object> = [];
        studentres.map((studentRecord: Object, ind: Number) => {
            res.push({...studentRecord, ...parentData[ind]});
        });

        return res;
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
        // fields to display
        const fieldDisp = ['id', 'name', 'age', 'pronounce', 'is_active', 'modified_dt', 'modified_by', 'deleted_dt', 'deleted_by'];
        data.map((record) => {
            for (var key in record) {
                if (fieldDisp.indexOf(key) < 0) {
                    delete record[key];
                }
            }
        });
        return data;
    }
}