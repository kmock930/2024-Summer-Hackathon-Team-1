import "jsr:@supabase/functions-js/edge-runtime.d.ts"; //Deno
import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import { errorMessages } from "../_shared/constants.ts";
import { getCurrentTimestampWithTimezone } from "../_shared/timestamp.ts";

export class ParentAdaptor {
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
            param_parent_id: url.searchParams.get('id'),
            param_parent_email: url.searchParams.get('email'),
            param_parent_tel: url.searchParams.get('tel'),
            param_parent_address: url.searchParams.get('address'),
            param_parent_city: url.searchParams.get('city'),
            param_parent_postcode: url.searchParams.get('postcode'),
            param_parent_name: url.searchParams.get('name'),
            // for parent-student relationship
            param_student_id: url.searchParams.get('student_id'),
            param_parent_rel: url.searchParams.get('parent_rel'),
            paran_student_rel: url.searchParams.get('student_rel')
        }
    }

    // getter
    public getQueryParams = () => this.queryParams;

    // database calling function
    // trigger from insert student
    public insertParents = async (reqBody: object, studentData: Array<object>): object => {
        let errorResponse: object;
        if (!reqBody) {
            console.error(`${errorMessages.noRecordsToAdd} - parents table`);
            errorResponse = {
                type: 'ERROR',
                message: `${errorMessages.noRecordsToAdd} - parents table`,
                reason: errorMessages.noRecordsToAdd_reason
            };
            return errorResponse;
        }
        
        // not overwriting request body during querying
        const parentQueryFields: Array<object> = [];
        if (Array.isArray(reqBody)) {
            reqBody.map((record) => {
                let currParentQueryField: object = {};
                if (typeof(record) === 'object' && !Array.isArray(record)) {
                    currParentQueryField['created_by'] = 'cics'; //add audit fields to request body object
                    for (var key in record) {
                        console.log(key)
                        if (key.startsWith('parent_')) {
                            // remove prefix for querying database
                            currParentQueryField[key.substring(7)] = record[key];
                        }
                    }
                }
                parentQueryFields.push(currParentQueryField);
            });
        } else if (typeof(reqBody) === 'object') {
            let currParentQueryField: object = {};
            // not overwriting request body during querying
            currParentQueryField['created_by'] = 'cics'; //add audit fields to request body object
            for (var key in reqBody) {
                if (key.startsWith('parent_')) {
                    // remove prefix for querying database
                    currParentQueryField[key.substring(7)] = reqBody[key];
                }
            }
            parentQueryFields.push(currParentQueryField);
        }

        // Construct the query
        const query = this.supabase
            .from('parents')
            .insert(parentQueryFields, {return: 'representation', defaultToNull: true})
            .select();
        
        // Execute the query
        const { data, error } = await query;
        // Error handling
        if (error) {
            console.error(`parents table - ${error}`);
            errorResponse = {
                type: 'ERROR',
                message: `${errorMessages.dbError} - parents table`,
                reason: error
            };
            return errorResponse;
        }
        // fields to display
        const parent_fieldDisp = ['id', 'name', 'email', 'address', 'tel', 'created_dt', 'created_by'];
        // format field names from parents database table query
        var parentres = data;
        parentres.map((record) => {
            for (var key in record) {
                if (parent_fieldDisp.indexOf(key) < 0) {
                    // i.e. not a field to display
                    delete record[key];
                } else {
                    // i.e. is a field to display
                    record[`parent_${key}`] = record[key]; //add back the prefix for display
                    delete record[key];
                }
            }
        });

        //insert parent-student relationship
        const relData = await this.insertParentStudentRel(reqBody, studentData, data /* parent data */);
        // Error handling
        if (relData.type === 'ERROR') {
            console.error(`rel_parent_student table - ${error}`);
            errorResponse = {
                type: 'ERROR',
                message: `${errorMessages.dbError} - rel_parent_student table`,
                reason: error
            };
            return errorResponse;
        }

        // format final response
        var res: Array<object> = [];
        parentres.map((parentRecord: Object, ind: Number) => {
            res.push({...parentRecord, ...relData[ind]});
        });

        return res;
    };

    public getParents = async (): object => {
        let errorResponse: object;
        // Construct the query first
        let query = this.supabase
            .from('parents')
            .select()
            .is('deleted_dt', null);
        // Conditional chaining (for filtering)
        if (this.queryParams.param_parent_id) {
            query.eq('id', this.queryParams.param_parent_id);
        }
        if (this.queryParams.param_parent_name) {
            query.eq('name', this.queryParams.param_parent_name);
        }
        if (this.queryParams.param_parent_email) {
            query.eq('email', this.queryParams.param_parent_email);
        }
        if (this.queryParams.param_parent_tel) {
            query.eq('tel', this.queryParams.param_parent_tel);
        }
        if (this.queryParams.param_parent_address) {
            query.eq('address', this.queryParams.param_parent_address);
        }
        if (this.queryParams.param_parent_city) {
            query.eq('city', this.queryParams.param_parent_city);
        }
        if (this.queryParams.param_parent_postcode) {
            query.eq('postcode', this.queryParams.param_parent_postcode);
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
        // fields to display
        const fieldDisp = ['id', 'name', 'created_dt', 'created_by'];
        data.map((record) => {
            for (var key in record) {
                if (fieldDisp.indexOf(key) < 0) {
                    delete record[key];
                }
            }
        });
        return data;
    };

    public updateParents = async (): object => {
        let errorResponse: object;
        if (!this.queryParams.param_parent_id || !(this.queryParams.param_parent_name || this.queryParams.param_parent_email || this.queryParams.param_parent_tel || this.queryParams.param_parent_address || this.queryParams.param_parent_city || this.queryParams.param_parent_postcode)) {
            console.error(`${errorMessages.noRecordsToUpdate} - parent table`);
            errorResponse = {
                type: 'ERROR',
                message: `${errorMessages.noRecordsToUpdate} - parent table`,
                reason: errorMessages.noRecordsToUpdate_reason
            };
            return errorResponse;
        }
        // Construct the query
        let query = this.supabase
            .from('parents');
        // Conditional Chaining (for updating based on provided parameters)
        const updateCond: Record<string, any> = {};
        if (this.queryParams.param_parent_name) {
            updateCond['name'] = this.queryParams.param_parent_name;
        }
        if (this.queryParams.param_parent_email) {
            updateCond['email'] = this.queryParams.param_parent_email;
        }
        if (this.queryParams.param_parent_tel) {
            updateCond['tel'] = this.queryParams.param_parent_tel;
        }
        if (this.queryParams.param_parent_address) {
            updateCond['address'] = this.queryParams.param_parent_address;
        }
        if (this.queryParams.param_parent_city) {
            updateCond['city'] = this.queryParams.param_parent_city;
        }
        if (this.queryParams.param_parent_postcode) {
            updateCond['postcode'] = this.queryParams.param_parent_postcode;
        }
        // Set modified_dt and modified_by for auditing purpose in database
        updateCond['modified_dt'] = getCurrentTimestampWithTimezone(); //UTC time
        updateCond['modified_by'] = 'cics';
        // Execute the query
        const { data, error } = await query.update(updateCond).eq('id', this.queryParams.param_parent_id).select();
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
        const fieldDisp = ['id', 'name', 'tel', 'email', 'address', 'modified_dt', 'modified_by'];
        data.map((record) => {
            for (var key in record) {
                if (fieldDisp.indexOf(key) < 0) {
                    delete record[key];
                }
            }
        });
        return data;
    };

    public deleteParents = async (): object => {
        let errorResponse: object;
        if (!this.queryParams?.param_parent_id) {
            console.error(`${errorMessages.noRecordsToDelete} - parents table`);
            errorResponse = {
                type: 'ERROR',
                message: `${errorMessages.noRecordsToDelete} - parents table`,
                reason: errorMessages.noRecordsToDelete_reason
            };
            return errorResponse;
        }
        // Construct the query
        let query = this.supabase
            .from('parents');
        // Construct fields to perform UPDATE
        const updateCond: Record<string, any> = {};
        // Set deleted_dt and deleted_by
        updateCond['deleted_dt'] = getCurrentTimestampWithTimezone(); //UTC time
        updateCond['deleted_by'] = 'cics';
        // Set modified_dt and modified_by for auditing purpose in database
        updateCond['modified_dt'] = getCurrentTimestampWithTimezone(); //UTC time
        updateCond['modified_by'] = 'cics';
        // Execute the query
        const { data, error } = await query.update(updateCond).eq('id', this.queryParams.param_parent_id).select();
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
        const fieldDisp = ['id', 'name', 'modified_dt', 'modified_by', 'deleted_dt', 'deleted_by'];
        data.map((record) => {
            for (var key in record) {
                if (fieldDisp.indexOf(key) < 0) {
                    delete record[key];
                }
            }
        });
        return data;
    };

    // trigger from insert parent
    public insertParentStudentRel = async (reqBody: Request, studentData: Array<object>, parentData: Array<object>): object => {
        let errorResponse: object;
        if (!reqBody) {
            console.error(`${errorMessages.noRecordsToAdd} - rel_parent_student table`);
            errorResponse = {
                type: 'ERROR',
                message: `${errorMessages.noRecordsToAdd} - rel_parent_student table`,
                reason: errorMessages.noRecordsToAdd_reason
            };
            return errorResponse;
        }

        // not overwriting request body during querying
        const relQueryFields: Array<object> = [];
        var student_rel: string; 
        if (Array.isArray(reqBody)) {
            reqBody.map((record) => {
                let currRelQueryField: object = {};
                if (typeof(record) === 'object' && !Array.isArray(record)) {
                    currRelQueryField['created_by'] = 'cics'; //add audit fields to request body object
                    for (var key in record) {
                        if (key.substring(4) === 'student_rel') {
                            // make record because user supplies with student's relationship
                            // To be added to database
                            student_rel = record[key];
                        }
                        if (key.startsWith('rel_')) {
                            // remove prefix for querying database
                            currRelQueryField[key.substring(4)] = record[key];
                        }
                    }
                }
                relQueryFields.push(currRelQueryField);
            })
        } else if (typeof(reqBody) === 'object') {
            let currRelQueryField: object = {};
            // not overwriting request body during querying
            currRelQueryField['created_by'] = 'cics'; //add audit fields to request body object
            for (var key in reqBody) {
                if (key.startsWith('rel_')) {
                    // remove prefix for querying database
                    currRelQueryField[key.substring(4)] = reqBody[key];
                }
            }
            relQueryFields.push(currRelQueryField);
        }

        // extracting parent id
        var parent_ids: Array<string | Number> = [];
        if (parentData && Array.isArray(parentData)) {
            parentData.map((parentRecord) => {
                parent_ids.push(parentRecord['parent_id']);
            })
        }

        // extracting student id
        var student_ids: Array<any> = [];
        if (studentData && Array.isArray(studentData)) {
            studentData.map((studentRecord) => {
                student_ids.push(studentRecord['student_id']);
            })
        }

        // storing parent ids into current query
        for (var i=0; i<parent_ids.length; ++i) {
            relQueryFields[i]['parent_id'] = parent_ids[i];
        }
        student_ids.map((id, ind) => {
            relQueryFields[ind]['student_id'] = id;
        });


        // Construct the query
        const query = this.supabase
            .from('rel_parent_student')
            .insert(relQueryFields, {return: 'representation', defaultToNull: true})
            .select();
        // Execute the query
        const { data, error } = await query;
        // fields to display
        const rel_fieldDisp = ['parent_rel', 'created_dt', 'created_by'];
        if (student_rel) {
            // display student rel field ONLY IF user supplies with this info in request body
            rel_fieldDisp.push('student_rel');
        }
        // Error handling
        if (error) {
            console.error(error);
            errorResponse = {
                type: 'ERROR',
                message: `${errorMessages.dbError} - rel_parent_student table`,
                reason: error
            };
            return errorResponse;
        }
        var res = data;
        // format field names from rel_parent_student database table query
        res.map((record) => {
            for (var key in record) {
                if (rel_fieldDisp.indexOf(key) < 0) {
                    // i.e. not a field to display
                    delete record[key];
                } else {
                    // i.e. is a field to display
                    record[`rel_${key}`] = record[key]; //add back the prefix for display
                    delete record[key];
                }
            }
        });

        return res;
    };

    // trigger from get parent
    public getParentStudentRel = async (student_ids: Array<string | bigint>): Array<object> => {
        var res: Array<object> = [];
        student_ids.map(async (student_id) => {
            // Construct the query
            const query = this.supabase
                .from('rel_parent_student')
                .select(`
                    parent_rel,
                    student_rel    
                `)
                .eq('student_id', student_id);
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
            res.push(data);
        });
        return res;
    }
}