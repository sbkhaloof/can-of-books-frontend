import React from 'react';
import axios from 'axios';
import { withAuth0, useAuth0 } from '@auth0/auth0-react';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Image } from 'react-bootstrap/';
import Jumbotron from 'react-bootstrap/Jumbotron';

import './BestBooks.css';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bookData: [],
      showBook: false,
      userEmail: ''
    }
  }
  componentDidMount = async () => {
    const { user } = this.props.auth0;
    console.log(user);
    await this.setState({
      userEmail: `${user.email}`
    })
    // http://localhost:3003/books?userName=razan
    let url = `http://localhost:3003/books?userEmail=${this.state.userEmail}`;
    console.log(url)
    let responseData = await axios.get(url);
    console.log(responseData.data)
    await this.setState({
      bookData: responseData.data,
      showBook: true
    })
    console.log(this.state.bookData)
  }



  render() {
    return (

      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <div>
          {this.state.showBook &&
            this.state.bookData.map((item,index) => {
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
