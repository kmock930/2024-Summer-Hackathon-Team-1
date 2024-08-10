import { FormizSelectProps, SelectOptionProps } from '@/types';
import { useField } from '@formiz/core';
import * as React from 'react';
import Select from '../Select';
import Dashboard from '../Dashboard';
import StudentForm from '../StudentForm';
import useSWR from 'swr';
import { fetcher } from '@/utils';
import Input from '../Input';

const styles = {
  table: {
    width: '100%',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  tr: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    fontWeight: 'bold',
  },
  button: {
    padding: '10%',
    marginTop: '7%',
    backgroundColor: '#135395',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  }
};

function StudentDetails({ id }: { id?: string }) {
  const { data: studentData, isLoading: isStudentDataLoading } =
    useSWR<any>(`students?student_id=${id}`, fetcher);

  return (
    <>
      {!isStudentDataLoading && (
        <div>
          <h2 style={{color: '#135395'}}>Account Credit</h2>
          <Input 
            label='Account Credit Remaining'
            type='text'
            name='payment_credit'
            defaultValue={studentData?.[0]?.payment_credit}
            disabled={true}
          />
          <h2 style={{color: '#135395', marginTop: '5%'}}>Account Record</h2>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tr}>
                <td style={styles.header}>Amount</td>
                <td style={styles.header}>Action</td>
                <td style={styles.header}>Payment Time</td>
                <td style={styles.header}>PayPal Form</td>
              </tr>
            </thead>
            <tbody>
              <tr style={styles.tr}>
                <td>-50</td>
                <td>Payment</td>
                <td>2023-07-08</td>
                <td>PayPal 012314235415534</td>
              </tr>
              <tr style={styles.tr}>
                <td>-50</td>
                <td>Payment</td>
                <td>2023-07-09</td>
                <td>PayPal 012314235415534</td>
              </tr>
              <tr style={styles.tr}>
                <td>150</td>
                <td>Refund</td>
                <td>2023-09-03</td>
                <td>N/A</td>
              </tr>
            </tbody>
            <button style={styles.button}>Add record</button>
          </table>
          <h2 style={{color: '#135395', marginTop: '5%'}}>Course In Progress</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <td style={styles.header}>Course Name</td>
                <td style={styles.header}>Attendance</td>
              </tr>
            </thead>
            <tbody>
              {studentData?.[0]?.registered_courses.map((course: any, i: number) => (
                <tr key={i} style={styles.tr}>
                  <td>{course.course.course_name}</td>
                  <td>{course.course_attendance}</td>
                </tr>
              ))}
            </tbody>
          </table>          
        </div> 
      )}
    </>
  );
}

export default StudentDetails;
