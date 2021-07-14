import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class BookFormModal extends React.Component {
    render() {
        return (
            <div>

                <Modal  show={this.props.show} onHide={this.props.handelClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Your Book Information</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.props.addBook}>
                        <input style={{marginLeft:'50px',width:'400px'}} placeholder='Enter Book name' type="text" name="name"/>
                        <br/>
                        <br/>
                        <input style={{marginLeft:'50px',width:'400px'}} placeholder='Enter Book Description' type="text" name="description" />
                        <br/>
                        <br/>
                        <input style={{marginLeft:'50px',width:'400px'}} placeholder='Enter Book Status' type="text" name="status" />
                        <br/>
                        <br/>
                        <input style={{marginLeft:'50px',width:'400px'}} placeholder='Enter Image Url' type="text" name="img" />
                  
                   <button type="submit">add book</button>
                    </form>
                    <Modal.Footer>
                        <Button onClick={this.props.handelClose} variant="secondary">Close</Button>
                        {/* <Button type="submit" variant="success">Add Book</Button> */}
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

export default BookFormModal;