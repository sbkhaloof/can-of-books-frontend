import React from 'react';
class UpdateForm extends React.Component {
    render() {
        return (
            <>
                <form onSubmit={this.props.updateBook}>
                    <input style={{width:'400px',backgroundColor:'burlywood'}} type="text" name='bookName' defaultValue={this.props.bookName} />
                    <br/>
                    <input style={{width:'400px',backgroundColor:'burlywood'}} type="text" name='description' defaultValue={this.props.description} />
                    <br/>
                    <input style={{width:'400px',backgroundColor:'burlywood'}} type="text" name='status' defaultValue={this.props.status} />
                    <br/>
                    <input style={{width:'400px',backgroundColor:'burlywood'}}  type="text" name='img' defaultValue={this.props.img} />
                    <br/>
                    <input style={{width:'150px',backgroundColor:'bisque',marginLeft:'250px'}} type="submit" value="Update Book Data" />
                </form>
            </>
        )
    }
}
export default UpdateForm;