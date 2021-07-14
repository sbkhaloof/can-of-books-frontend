import React from 'react';
import axios from 'axios';
import { withAuth0, useAuth0 } from '@auth0/auth0-react';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Image, Button } from 'react-bootstrap/';
import Jumbotron from 'react-bootstrap/Jumbotron';
import BookFormModal from './componentes/BookFormModal';
import './BestBooks.css';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bookData: [],
      showBook: false,
      userEmail: '',
      showModel: false
    }
  }
  componentDidMount = async () => {
    let server = process.env.REACT_APP_LOCALHOST;
    const { user } = this.props.auth0;
    console.log(user);
    await this.setState({
      userEmail: `${user.email}`
    })

    // http://localhost:3003/books?userName=razan
    let url = `${server}/books?userEmail=${this.state.userEmail}`;
    console.log(url)
    let responseData = await axios.get(url);
    console.log(responseData.data)
    await this.setState({
      bookData: responseData.data,
      showBook: true
    })
    console.log(this.state.bookData)
  }

  //lab13
  // http://localhost:3003/addBooks?userEmail=sehammalkawi92@gmail.com&bookName=The Momnt of Lift&description=Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation&status=RECOMMENDED TO ME&img=https://m.media-amazon.com/images/I/71LESEKiazL._AC_UY436_QL65_.jpg

  showHandler = async () => {
    await this.setState({
      showModel: true
    })
  }
  handelClose = async () => {
    await this.setState({
      showModel: false
    })
  }

  // --------------------------------------function to add data-----------------

  addBook = async (event) => {
    event.preventDefault();
    console.log('add book function')

    console.log(event.target, 'eeeeeeeeee')
    const bookModuleData = {
      userEmail: this.state.userEmail,
      bookName: event.target.name.value,
      description: event.target.description.value,
      status: event.target.status.value,
      img: event.target.img.value
    }
    //http://localhost:3003/addbook
    let server = process.env.REACT_APP_LOCALHOST;
    let url = `${server}/addbook`;
    console.log(url, 'from addbook fun')
    let addBookResponse = await axios.post(url, bookModuleData);
    await this.setState({
      bookData: addBookResponse.data,
      showModel: false

    })
  }


  //--------------------------------------function for delete data-------------------------
  //http://localhost:3003/deletebook/1?userEmail


  deleteBook = async (index) => {
    console.log(index);
    let paramsObj = {
      email: this.state.userEmail
    }
    let server = process.env.REACT_APP_LOCALHOST;
    let url = `${server}/deletebook/${index}`
    let deleteBookRes = await axios.delete(url, { params: paramsObj })
    this.setState({
      bookData: deleteBookRes.data
    })
  }


  render() {
    return (

      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <p>
          to add new book
        </p>
        <Button onClick={this.showHandler} variant="warning">Add Book</Button>

        <BookFormModal addBook={this.addBook} show={this.state.showModel} handelClose={this.handelClose} />


        <div>
          {this.state.showBook &&
            this.state.bookData.map((item, index) => {
              return (
                <Card key={index} style={{ width: '20rem', backgroundColor: 'burlywood', boxShadow: '2px 2px 2px black', margin: '100px' }} >

                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>

                    <Image src={item.img} alt={item.name} style={{ width: '17rem' }} />
                    <Card.Text>
                      description: {item.description}
                    </Card.Text>
                    <Card.Text>
                      status: {item.status}
                    </Card.Text>
                    <Button onClick={() => this.deleteBook(index)} variant="danger">Delete </Button>
                  </Card.Body>
                </Card>
              )
            })
          }

        </div>
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
;
