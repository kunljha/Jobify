import React from 'react'
import { FormRowSelect, FromRow} from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link, useNavigation } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {

  //important debouncing feature
  const debounce = (callback) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback(form);
      } , 1200)
    }
  }

  const navigation = useNavigation();
  const isSubmitting = navigation === 'submitting';
  const submit = useSubmit();
  const {searchValues} = useAllJobsContext();
  const {search , jobStatus , jobType , sort} = searchValues;

  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>Search form</h5>
        <div className="form-center">
          <FromRow type='search' name='search' defaultValue={search} onChange = {debounce((form) => submit(form))} />
          <FormRowSelect
            labelText='Job Status'
            name='jobStatus'
            list={['all' , ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange = {(e) => {submit(e.currentTarget.form)}}
          />
          <FormRowSelect
            labelText='Job Type'
            name='jobType'
            list={['all' , ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange = {(e) => {submit(e.currentTarget.form)}}
          />
          <FormRowSelect
          name='sort'
          defaultValue={sort}
          list= {[...Object.values(JOB_SORT_BY)]}
          onChange = {(e) => {submit(e.currentTarget.form)}}
          />
          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>Reset search values</Link>
          
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer
