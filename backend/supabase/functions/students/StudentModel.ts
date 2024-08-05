import "jsr:@supabase/functions-js/edge-runtime.d.ts"; //Deno
import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import { errorMessages } from "../_shared/constants.ts";

export class StudentModel {
    private queryParams: object;
    private supabase: any; //db client

    public constructor(url: URL) {
        //initialize db client
        this.supabase = createClient(
            Deno.env.get("API_URL"),
            Deno.env.get("API_ANON")!
        );

        // Parse parameters from URL
        this.queryParams = {
            param_student_id: url.searchParams.get('id'),
            param_firstname: url.searchParams.get('firstname'),
            param_lastname: url.searchParams.get('lastname'),
            param_gender: url.searchParams.get('gender'),
            param_dob: url.searchParams.get('dob')
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
            .select();
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
                message: error,
                reason: errorMessages.dbError
            };
            return errorResponse;
        }
        return data;
    }
}