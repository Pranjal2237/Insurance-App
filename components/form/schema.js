import * as yup from 'yup'

export const FormSchema=yup.object({
    firstName:yup.string().min(2).required('Please enter your firstName'),
    email:yup.string().email().required('Please enter your email'),
    message:yup.string().required('Please enter some message'),
    lastName:yup.string().required('Please enter lastName'),
    subject:yup.string().required('Please enter the subject of message')
})