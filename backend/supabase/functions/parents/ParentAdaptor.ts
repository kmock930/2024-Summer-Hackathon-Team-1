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
            param_parent_name: url.searchParams.get('name')
        }
    }

    //getter
    public getQueryParams = () => this.queryParams;

    //database calling function
    public insertParents = async (reqBody: object): object => {
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
            .from('parents')
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
        // fields to display
        const fieldDisp = ['id', 'name', 'email', 'address', 'tel', 'is_active', 'created_dt', 'created_by'];
        data.map((record) => {
            for (var key in record) {
                if (fieldDisp.indexOf(key) < 0) {
                    delete record[key];
                }
            }
        });
        return data;
    };

    public getParents = async (reqBody: object): object => {
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

    public deleteParents = async (): objecr => {
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
    }
}