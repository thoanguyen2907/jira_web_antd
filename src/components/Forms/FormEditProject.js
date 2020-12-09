import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup'; 
import { connect, useSelector, useDispatch } from 'react-redux'; 

 function FormEditProject(props) {
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    const dispatch = useDispatch();
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue
    } = props;


    useEffect(() => {
        //Gọi api để lấy dữ liệu thẻ select
        handleEditorChange(); 
        dispatch({ type: 'GET_ALL_PROJECT_CATEGORY_SAGA' })
        dispatch({
            type: "SET_SUBMIT_EDIT_PROJECT", 
            submitFunction: handleSubmit
        })
    }, []);
 
    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }
    const {arrayProjectCategory} = useSelector(state => state.ProjectCategoryReducer); 

    return (
        <form onSubmit={handleSubmit}>
        <div className="row">
            <div className="col-12">
            <div className="form-group">
                        <h5>Project ID</h5>
                        <input type="text" name="id" 
                        className="form-control"
                        onChange={handleChange}
                        value = {values.id}
                        />
                    </div>
            </div>
        </div>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <h5>Project Name</h5>
                        <input type="text" name="projectName" 
                        className="form-control"
                        onChange={handleChange}
                        value = {values.projectName}
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <h5>Category ID</h5>
                        <select name="categoryId" className="form-control" onChange={handleChange}>
                        {arrProjectCategory.map((item, index) => {
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                    </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                    <h5>Description</h5>
                    <Editor
                        name="description"
               
                        value = {values.description} 
                        init={{
                            selector: 'textarea#myTextArea',

                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                    </div>
                </div>
            </div>
        </form>
    )
}
const editProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const {projectEdit} = props; 
        return {
            id: projectEdit.id,
            projectName: projectEdit.projectName,
            description: projectEdit.description,
            categoryId: projectEdit.categoryId
        }
    },
    validationSchema: Yup.object().shape({
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
       console.log("values", values);
            //khi ng dùng submit đưa dữ liệu về backend thông qua api 
        props.dispatch({
            type: "UPDATE_PROJECT_SAGA", 
            projectUpdate: values
        })
    },
})(FormEditProject);

const mapStateToProps = (state) => ({
    projectEdit: state.ProjectReducer.projectEdit,
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
})


export default connect(mapStateToProps)(editProjectForm);
