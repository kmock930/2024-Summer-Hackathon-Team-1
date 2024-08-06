import "jsr:@supabase/functions-js/edge-runtime.d.ts"; //Deno
import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import { errorMessages } from "../_shared/constants.ts";
import { getCurrentTimestampWithTimezone } from "../_shared/timestamp.ts";

export class StudentAdaptor {
    private queryParams: object;
    private supabase: any; //db client

    public constructor(url: URL) {
        //initialize db client
        this.supabase = createClient(
            Deno.env.get("API_URL"),
            Deno.env.get("API_ANON")
        );

        // Parse parameters from URL
        this.queryParams = {
            //for GET method
            param_student_id: url.searchParams.get('id'),
            param_firstname: url.searchParams.get('firstname'),
            param_lastname: url.searchParams.get('lastname'),
            param_gender: url.searchParams.get('gender'),
            param_age_lowlimit: url.searchParams.get('age_lowlimit'),
            param_age_highlimit: url.searchParams.get('age_highlimit'),
            param_pronounce: url.searchParams.get('pronounce'),
            param_is_active: url.searchParams.get('is_active'),
            param_age:url.searchParams.get('age')
        };
    }

    //getter
    public getQueryParams = () => this.queryParams;
    
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
        return res;
    };

    public insertStudents = async (reqBody: object): object => {
        let errorResponse: object;
        if (!reqBody) {
            console.error(errorMessages.noRecordsToAdd);
            errorResponse = {
                type: 'ERROR',
                message: errorMessages.noRecordsToAdd,
                reason: errorMessages.noRecordsToAdd_reason
            };
            return errorResponse;
        }
        //add audit fields to request body object
        if (Array.isArray(reqBody)) {
            reqBody.map((record) => {
                if (typeof(record) === 'object' && !Array.isArray(record)) {
                    record['created_by'] = 'cics';
                }
            });
        } else if (typeof(reqBody) === 'object') {
            reqBody['created_by'] = 'cics';
        }
        // Construct the query
        const query = this.supabase
            .from('students')
            .insert(reqBody, {return: 'representation', defaultToNull: true})
            .select();
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
        return data;
    };

    public updateStudents = async (): object => {
        let errorResponse: object;
        if (!this.queryParams.param_student_id || !(this.queryParams.param_firstname || this.queryParams.param_lastname || this.queryParams.param_gender || this.queryParams.param_age || this.queryParams.param_pronounce || this.queryParams.param_is_active)) {
            console.error(errorMessages.noRecordsToAdd);
            errorResponse = {
                type: 'ERROR',
                message: errorMessages.noRecordsToUpdate,
                reason: errorMessages.noRecordsToUpdate_reason
            };
            return errorResponse;
        }
        // Construct the query
        let query = this.supabase
            .from('students');
        // Conditional Chaining (for updating based on provided parameters)
        const updateCond: Record<string, any> = {};
        if (this.queryParams.param_firstname) {
            updateCond['firstname'] = this.queryParams.param_firstname;
        }
        if (this.queryParams.param_lastname) {
            updateCond['lastname'] = this.queryParams.param_lastname;
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
        console.log(updateCond)
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
        return data;
    }
}