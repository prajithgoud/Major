import _ from 'lodash';
import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchEvents } from "../../actions/index"
import Reload from "../Reload";
import axios from 'axios';
import "../posts/stylecontent.css";
import Header from "../header";
import "../welcome.css";


class EventList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      verified : ''
    }
    this.decide = this.decide.bind(this);
  }
  componentDidMount() {
    this.decide();
    this.props.fetchEvents();
  }

  decide() {

    setTimeout(() => {
        axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
          .then((res) => {
            if (res.data.isverified === "true") {
              this.setState({
                verified: true
              })
            }
          })
    }, 200);
  }


//   renderEventSummary(event) {
//       return (
//         <div key={event._id} class="bg-white px-10 pt-4 pb-10 rounded shadow-xl hover:shadow-2xl">
  
//           <h2 class="text-2xl font-bold mb-2 text-gray-700 flex justify-center">{event.title}</h2>        
          
//           <div class="absolute">
//             <button type="button" class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-expanded="false">
//                 <img class="h-6 w-6 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
//             </button>  
//           </div>

//           <span className="ml-7 font-bold text-sm text-gray-700">{event.authorName}</span>
//           <br></br>

//           <span className="text-sm text-gray-900">{new Date(event.time).toLocaleString()}</span>
//           <br></br><br></br>
          
//           <h3>
//             <div className="text-justify pb-1" dangerouslySetInnerHTML={{ __html: event.content }} />
//           </h3>
//           <hr />
//         </div>
//       );
//   }

 
//   render() {
//     return (
//       <div class="bg-gray-200 h-screen">
//         <Header/>
//         <Reload />
        
//         <div className="event">

//           <div class="flex justify-center pt-3">
//             { <Link className="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" to={'/eventnew'}>Create a new Event</Link>}
//           </div>

//           <div class="style_event grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 space-y-3">
//               {_.map(this.props.events, event => {
//                 return this.renderEventSummary(event);
//               })}
//           </div>

//         </div>
//       </div>
//     );
//   }
// }

renderEventSummary(event) {
  return (
    <div key={event._id} >
        <div class="portfolio-item">
                            <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal1">
                                <div class="portfolio-hover">
                                    <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                                </div>
                                <img class="img-fluid" src={`http://localhost:5000/public/img/users/${event.Photo}`} alt="..." />
                            </a>
                            <div class="portfolio-caption">
                                <div class="portfolio-caption-heading">{event.title}</div>
                                <div class="portfolio-caption-subheading text-muted"></div>
                            </div>
          </div>

      <div>
      <head>
          <script src="https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=fetch" />
          <script src="https://js.stripe.com/v3/" />
        </head>
          <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-bs-dismiss="modal"><img src={`http://localhost:5000/public/img/assets/img/close-icon.svg`} alt="Close modal" /></div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="modal-body">
                                    
                                    <h2 class="text-uppercase">{event.title}</h2>
                                    <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                                    <img class="img-fluid d-block mx-auto" src={`http://localhost:5000/public/img/users/${event.Photo}`} alt="..." />
                                    <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                                    
                                    <form action="http://localhost:5000/create-checkout-session" method="POST">
                                        <input type="text" name="eventname" value={event.title} type="hidden" />
                                        <input type="text" name="eventcost" value="75000"  type="hidden"/>
                                        <button class="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" type="submit">Checkout</button>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
  );
}


render() {
return (
  <div class="bg-light h-screen">
    <Header/>
    <Reload />
    
    <div className="event">

      <div class="flex justify-center pt-3">
        { <Link className="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" to={'/eventnew'}>Create a new Event</Link>}
      </div>

      <section class="page-section bg-light pt-6" id="portfolio">
                  <div class="container">
                      <div class="row">
                          <div class="grid grid-cols-3 gap-6">
                              {_.map(this.props.events, event => {
                              return this.renderEventSummary(event);
                              })}
                          </div>
                      </div>                 
                  </div>
      </section>

    </div>
  </div>
);
}
}

function mapStateToProps(state) {
  console.log(state)
  return {
    authenticated: state.auth.authenticated,
    events : state.events
  };
}

export default connect(mapStateToProps, { fetchEvents })(EventList);