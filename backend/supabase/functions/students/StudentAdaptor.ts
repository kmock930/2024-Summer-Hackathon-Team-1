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
            param_dob: url.searchParams.get('dob'),
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
            .is('is_active', true)
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
        if (this.queryParams.param_dob) {
            query.eq('dob', this.queryParams.param_dob);
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
        return data;
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
        if (!this.queryParams.param_student_id || !(this.queryParams.param_firstname || this.queryParams.param_lastname || this.queryParams.param_gender || this.queryParams.param_dob)) {
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
        if (this.queryParams.param_dob) {
            updateCond['dob'] = this.queryParams.param_dob;
        }
        // Set modified_dt and modified_by for auditing purpose in database
        updateCond['modified_dt'] = getCurrentTimestampWithTimezone(); //UTC time
        updateCond['modified_by'] = 'cics';
        console.log(updateCond)
        // Execute the query
        const { data, error } = await query.update(updateCond).eq('id', this.queryParams.param_student_id).select();;
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