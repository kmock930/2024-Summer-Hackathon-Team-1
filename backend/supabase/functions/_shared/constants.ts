export const errorMessages = {
    dbError: 'Failed to access data from database',
    invalidOp: 'ERROR: Operation Not Found',
    invalidOp_reason: 'No such API operation.',
    noRecordsToAdd: 'No records have been specified to add.',
    noRecordsToAdd_reason: 'Please specify at least 1 record to add to database.',
    noRecordsToUpdate: 'No records have been specified to update.',
    noRecordsToUpdate_reason: 'Please specify at least 1 record and the new values in order to update the record on database.',
    noRecordsToDelete: 'No records have been specified to delete.',
    noRecordsToDelete_reason: 'Please specify at least 1 record to delete the corresponding record from the database. The API will not bulk delete all records from the database due to security and management reasons.'
};

export const warningMessages = {
    opNotOK: `Please try creating a parent's record by creating a student's profile record.`,
    opNotOK_reason: `POST call is unavilable in parents API endpoint. Please try using student's API.`
}